import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const {id: idOrAccessId } = await params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    let poolQuery = supabase.from('pick_me_pools').select('*');
    
    // Find the pool by ID
    poolQuery = poolQuery.eq('id', idOrAccessId);
    
    const { data: pool, error: poolError } = await poolQuery.single();
    
    if (poolError || !pool) {
      return NextResponse.json(
        { message: 'Pool not found' }, 
        { status: 404 }
      );
    }
    
    // Get participants for this pool
    const { data: participants, error: participantsError } = await supabase
      .from('pick_me_participants')
      .select('*')
      .eq('pool_id', pool.id);
    
    if (participantsError) {
      console.error('Error fetching participants:', participantsError);
      return NextResponse.json(
        { message: 'Failed to fetch participants' }, 
        { status: 500 }
      );
    }
    
    // Get prizes for this pool
    const { data: prizes, error: prizesError } = await supabase
      .from('pick_me_prizes')
      .select('*')
      .eq('pool_id', pool.id)
      .order('position', { ascending: true });
    
    if (prizesError) {
      console.error('Error fetching prizes:', prizesError);
      // Continue anyway as prizes are optional
    }
    
    // Format the response
    const formattedPool = {
      id: pool.id,
      title: pool.title,
      description: pool.description,
      status: pool.status,
      endTime: pool.end_time,
      subscribersOnly: pool.subscribers_only,
      maxParticipants: pool.max_participants,
      numWinners: pool.num_winners,
      numBackupWinners: pool.num_backup_winners,
      notificationEnabled: pool.notification_enabled,
      autoPublishResults: pool.auto_publish_results,
      requireVerification: pool.require_verification,
      createdAt: pool.created_at,
      completedAt: pool.completed_at,
      participantCount: participants ? participants.length : 0,
      isCreator: pool.creator_id === user.id,
    };
    
    const formattedParticipants = participants ? participants.map(p => ({
      id: p.id,
      userId: p.user_id,
      displayName: p.display_name || p.user_id,
      joinedAt: p.joined_at,
    })) : [];
    
    const formattedPrizes = prizes ? prizes.map(p => ({
      id: p.id,
      type: p.type,
      description: p.description,
      imageUrl: p.image_url,
      linkUrl: p.link_url,
      position: p.position,
    })) : [];
    
    return NextResponse.json({
      pool: formattedPool,
      participants: formattedParticipants,
      prizes: formattedPrizes,
    });
  } catch (error) {
    console.error('Unexpected error fetching pool details:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

// API endpoint to join a pool
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const {id: poolId } = await params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Get the pool to check status
    const { data: pool, error: poolError } = await supabase
      .from('pick_me_pools')
      .select('*')
      .eq('id', poolId)
      .single();
    
    if (poolError || !pool) {
      return NextResponse.json(
        { message: 'Pool not found' }, 
        { status: 404 }
      );
    }
    
    // Check if the pool is active
    if (pool.status !== 'active') {
      return NextResponse.json(
        { message: 'Cannot join a pool that is not active' }, 
        { status: 400 }
      );
    }
    
    // Check if the creator is trying to join their own pool
    if (pool.creator_id === user.id) {
      return NextResponse.json(
        { message: 'You cannot join your own pool' }, 
        { status: 400 }
      );
    }
    
    // Check if the pool has a maximum number of participants and if it's reached
    if (pool.max_participants) {
      const { count, error: countError } = await supabase
        .from('pick_me_participants')
        .select('*', { count: 'exact', head: true })
        .eq('pool_id', poolId);
      
      if (countError) {
        console.error('Error counting participants:', countError);
        return NextResponse.json(
          { message: 'Failed to check participant count' }, 
          { status: 500 }
        );
      }
      
      if (count >= pool.max_participants) {
        return NextResponse.json(
          { message: 'This pool has reached the maximum number of participants' }, 
          { status: 400 }
        );
      }
    }
    
    // Check if the user has already joined
    const { data: existingParticipant, error: participantError } = await supabase
      .from('pick_me_participants')
      .select('*')
      .eq('pool_id', poolId)
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (participantError) {
      console.error('Error checking existing participant:', participantError);
      return NextResponse.json(
        { message: 'Failed to check if you are already a participant' }, 
        { status: 500 }
      );
    }
    
    if (existingParticipant) {
      return NextResponse.json(
        { message: 'You have already joined this pool', alreadyJoined: true }, 
        { status: 400 }
      );
    }
    
    // Get user display name
    const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || user.id;
    
    // Add the user as a participant
    const { data: participant, error: insertError } = await supabase
      .from('pick_me_participants')
      .insert({
        pool_id: poolId,
        user_id: user.id,
        display_name: displayName,
        joined_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('Error joining pool:', insertError);
      return NextResponse.json(
        { message: 'Failed to join pool' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Successfully joined the pool',
      participant: {
        id: participant.id,
        userId: participant.user_id,
        displayName: participant.display_name,
        joinedAt: participant.joined_at
      }
    });
  } catch (error) {
    console.error('Unexpected error joining pool:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}