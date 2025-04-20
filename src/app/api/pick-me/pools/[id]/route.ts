import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const idOrAccessId = params.id;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    let poolQuery = supabase.from('pick_me_pools').select('*');
    
    // Try to find the pool by either ID or access_id
    // First, check if the provided ID is a UUID (access_id)
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidPattern.test(idOrAccessId)) {
      poolQuery = poolQuery.or(`id.eq.${idOrAccessId},access_id.eq.${idOrAccessId}`);
    } else {
      // Regular ID
      poolQuery = poolQuery.eq('id', idOrAccessId);
    }
    
    const { data: pool, error: poolError } = await poolQuery.single();
    
    if (poolError || !pool) {
      return NextResponse.json(
        { message: 'Pool not found' }, 
        { status: 404 }
      );
    }
    
    // If the pool is private and the user is not the creator, check access
    if (pool.is_private && pool.creator_id !== user.id && pool.access_id !== idOrAccessId) {
      return NextResponse.json(
        { message: 'Unauthorized access to this pool' }, 
        { status: 403 }
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
      isPrivate: pool.is_private,
      accessId: pool.access_id,
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