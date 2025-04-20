import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// API route for drawing winners for a specific Pick Me pool
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
    
    // Get the pool and verify ownership
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
    
    if (pool.creator_id !== user.id) {
      return NextResponse.json(
        { message: 'Unauthorized access to this pool' }, 
        { status: 403 }
      );
    }
    
    // Make sure the pool is active
    if (pool.status !== 'active') {
      return NextResponse.json(
        { message: 'Cannot draw winners for a non-active pool' }, 
        { status: 400 }
      );
    }
    
    // Get participants for this pool
    const { data: participants, error: participantsError } = await supabase
      .from('pick_me_participants')
      .select('*')
      .eq('pool_id', poolId);
    
    if (participantsError) {
      console.error('Error fetching participants:', participantsError);
      return NextResponse.json(
        { message: 'Failed to fetch participants' }, 
        { status: 500 }
      );
    }
    
    // Check if there are enough participants
    if (!participants || participants.length === 0) {
      return NextResponse.json(
        { message: 'No participants in the pool' }, 
        { status: 400 }
      );
    }
    
    const totalNeeded = pool.num_winners + pool.num_backup_winners;
    if (participants.length < totalNeeded) {
      return NextResponse.json(
        { message: `Not enough participants (${participants.length}) for the requested number of winners (${totalNeeded})` }, 
        { status: 400 }
      );
    }
    
    // Randomly select winners and backup winners
    const shuffled = [...participants].sort(() => 0.5 - Math.random());
    const primaryWinners = shuffled.slice(0, pool.num_winners);
    const backupWinners = shuffled.slice(pool.num_winners, totalNeeded);
    
    // Update the pool status
    const { error: updateError } = await supabase
      .from('pick_me_pools')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', poolId);
    
    if (updateError) {
      console.error('Error updating pool status:', updateError);
      return NextResponse.json(
        { message: 'Failed to update pool status' }, 
        { status: 500 }
      );
    }
    
    // Store the winners in the database
    for (let i = 0; i < primaryWinners.length; i++) {
      const { error: winnerError } = await supabase
        .from('pick_me_winners')
        .insert({
          pool_id: poolId,
          participant_id: primaryWinners[i].id,
          is_backup: false,
          position: i + 1,
        });
      
      if (winnerError) {
        console.error('Error storing primary winner:', winnerError);
      }
    }
    
    for (let i = 0; i < backupWinners.length; i++) {
      const { error: backupError } = await supabase
        .from('pick_me_winners')
        .insert({
          pool_id: poolId,
          participant_id: backupWinners[i].id,
          is_backup: true,
          position: i + 1,
        });
      
      if (backupError) {
        console.error('Error storing backup winner:', backupError);
      }
    }
    
    // Format response with winner details
    const formattedPrimaryWinners = primaryWinners.map((winner, index) => ({
      position: index + 1,
      participantId: winner.id,
      userId: winner.user_id,
      displayName: winner.display_name || winner.user_id,
      isBackup: false,
    }));
    
    const formattedBackupWinners = backupWinners.map((winner, index) => ({
      position: index + 1,
      participantId: winner.id,
      userId: winner.user_id,
      displayName: winner.display_name || winner.user_id,
      isBackup: true,
    }));
    
    return NextResponse.json({
      message: 'Winners drawn successfully',
      primaryWinners: formattedPrimaryWinners,
      backupWinners: formattedBackupWinners,
    });
  } catch (error) {
    console.error('Unexpected error drawing winners:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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
    
    // Get the pool and verify ownership or public access
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
    
    // If user is not the creator and results aren't published, deny access
    if (pool.creator_id !== user.id && !pool.auto_publish_results && pool.status === 'completed') {
      return NextResponse.json(
        { message: 'Results not available' }, 
        { status: 403 }
      );
    }
    
    // Get winners for this pool
    const { data: winners, error: winnersError } = await supabase
      .from('pick_me_winners')
      .select(`
        *,
        participant:participant_id(
          id,
          user_id,
          display_name
        )
      `)
      .eq('pool_id', poolId)
      .order('is_backup', { ascending: true })
      .order('position', { ascending: true });
    
    if (winnersError) {
      console.error('Error fetching winners:', winnersError);
      return NextResponse.json(
        { message: 'Failed to fetch winners' }, 
        { status: 500 }
      );
    }
    
    // Format the response
    const primaryWinners = winners
      .filter(w => !w.is_backup)
      .map(w => ({
        position: w.position,
        participantId: w.participant_id,
        userId: w.participant.user_id,
        displayName: w.participant.display_name || w.participant.user_id,
        isBackup: false,
        verified: w.verified || false,
      }));
    
    const backupWinners = winners
      .filter(w => w.is_backup)
      .map(w => ({
        position: w.position,
        participantId: w.participant_id,
        userId: w.participant.user_id,
        displayName: w.participant.display_name || w.participant.user_id,
        isBackup: true,
        verified: w.verified || false,
      }));
    
    return NextResponse.json({
      poolId,
      status: pool.status,
      primaryWinners,
      backupWinners,
    });
  } catch (error) {
    console.error('Unexpected error fetching winners:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}