import { createClient } from '@/utils/supabase/server';

/**
 * Utility function to draw winners for a Pick Me pool
 * This would typically be called by a scheduled job
 */
export async function drawPoolWinners(poolId: string) {
  try {
    const supabase = await createClient();
    
    // Get the pool details
    const { data: pool, error: poolError } = await supabase
      .from('pick_me_pools')
      .select('*')
      .eq('id', poolId)
      .single();
    
    if (poolError || !pool) {
      console.error('Error fetching pool:', poolError);
      return { success: false, error: 'Pool not found' };
    }
    
    // Check if pool is already complete
    if (pool.status !== 'active') {
      return { success: false, error: 'Pool is not active' };
    }
    
    // Get participants for this pool
    const { data: participants, error: participantsError } = await supabase
      .from('pick_me_participants')
      .select('*')
      .eq('pool_id', poolId);
    
    if (participantsError) {
      console.error('Error fetching participants:', participantsError);
      return { success: false, error: 'Failed to fetch participants' };
    }
    
    // Check if there are enough participants
    if (!participants || participants.length === 0) {
      return { success: false, error: 'No participants in the pool' };
    }
    
    const totalNeeded = pool.num_winners + pool.num_backup_winners;
    if (participants.length < totalNeeded) {
      // If not enough participants, adjust the number of winners
      const availableWinners = Math.min(participants.length, pool.num_winners);
      const availableBackups = Math.max(0, participants.length - availableWinners);
      
      console.log(`Not enough participants (${participants.length}) for requested winners (${totalNeeded}). Adjusting to ${availableWinners} winners and ${availableBackups} backups.`);
      
      // Random selection with fewer winners
      const shuffled = [...participants].sort(() => 0.5 - Math.random());
      const primaryWinners = shuffled.slice(0, availableWinners);
      const backupWinners = shuffled.slice(availableWinners, availableWinners + availableBackups);
      
      // Update pool status
      await supabase
        .from('pick_me_pools')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          num_winners: availableWinners,
          num_backup_winners: availableBackups
        })
        .eq('id', poolId);
      
      // Store winners
      for (let i = 0; i < primaryWinners.length; i++) {
        await supabase
          .from('pick_me_winners')
          .insert({
            pool_id: poolId,
            participant_id: primaryWinners[i].id,
            is_backup: false,
            position: i + 1,
          });
      }
      
      for (let i = 0; i < backupWinners.length; i++) {
        await supabase
          .from('pick_me_winners')
          .insert({
            pool_id: poolId,
            participant_id: backupWinners[i].id,
            is_backup: true,
            position: i + 1,
          });
      }
      
      return { 
        success: true, 
        message: 'Winners drawn with adjusted counts',
        primaryWinners: primaryWinners.length,
        backupWinners: backupWinners.length
      };
    }
    
    // Standard draw process with sufficient participants
    const shuffled = [...participants].sort(() => 0.5 - Math.random());
    const primaryWinners = shuffled.slice(0, pool.num_winners);
    const backupWinners = shuffled.slice(pool.num_winners, totalNeeded);
    
    // Update pool status
    await supabase
      .from('pick_me_pools')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', poolId);
    
    // Store winners
    for (let i = 0; i < primaryWinners.length; i++) {
      await supabase
        .from('pick_me_winners')
        .insert({
          pool_id: poolId,
          participant_id: primaryWinners[i].id,
          is_backup: false,
          position: i + 1,
        });
    }
    
    for (let i = 0; i < backupWinners.length; i++) {
      await supabase
        .from('pick_me_winners')
        .insert({
          pool_id: poolId,
          participant_id: backupWinners[i].id,
          is_backup: true,
          position: i + 1,
        });
    }
    
    return { 
      success: true, 
      message: 'Winners drawn successfully',
      primaryWinners: primaryWinners.length,
      backupWinners: backupWinners.length  
    };
  } catch (error) {
    console.error('Unexpected error drawing winners:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Utility function to check if pools are due for drawing
 * This would be called by a scheduled job or middleware
 */
export async function checkPoolsForDrawing() {
  try {
    const supabase = await createClient();
    
    // Get active pools that have passed their end time
    const now = new Date().toISOString();
    const { data: pools, error } = await supabase
      .from('pick_me_pools')
      .select('id')
      .eq('status', 'active')
      .lt('end_time', now);
    
    if (error) {
      console.error('Error checking pools for drawing:', error);
      return { success: false, error: 'Failed to check pools' };
    }
    
    if (!pools || pools.length === 0) {
      return { success: true, drawnPools: 0 };
    }
    
    // Draw winners for each expired pool
    const results = [];
    for (const pool of pools) {
      const result = await drawPoolWinners(pool.id);
      results.push({ poolId: pool.id, ...result });
    }
    
    return { success: true, drawnPools: pools.length, results };
  } catch (error) {
    console.error('Unexpected error checking pools for drawing:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}