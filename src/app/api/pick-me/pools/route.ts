import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Get request body data
    const requestData = await request.json();
    
    // Validate the request data
    const {
      title,
      description,
      endTime,
      maxParticipants,
      subscribersOnly,
      numWinners,
      numBackupWinners,
      notificationEnabled,
      autoPublishResults,
      requireVerification,
      prizes,
    } = requestData;
    
    if (!title || !endTime || !numWinners) {
      return NextResponse.json(
        { message: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Create the pool in the database
    const { data: pool, error: insertError } = await supabase
      .from('pick_me_pools')
      .insert({
        creator_id: user.id,
        title,
        description,
        end_time: endTime,
        max_participants: maxParticipants,
        subscribers_only: subscribersOnly,
        num_winners: numWinners,
        num_backup_winners: numBackupWinners,
        notification_enabled: notificationEnabled,
        auto_publish_results: autoPublishResults,
        require_verification: requireVerification,
        status: 'active', // Initial status
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('Error creating pick me pool:', insertError);
      return NextResponse.json(
        { message: 'Failed to create pool' }, 
        { status: 500 }
      );
    }
    
    // Add prizes if provided
    if (prizes && prizes.length > 0) {
      // Define proper interface for prize type
      interface Prize {
        type: 'text' | 'image' | 'link';
        description: string;
        imageUrl?: string;
        linkUrl?: string;
      }
      
      const validPrizes = prizes.filter((prize: Prize) => prize.description && prize.description.trim() !== '');
      
      if (validPrizes.length > 0) {
        const prizeEntries = validPrizes.map((prize: Prize, index: number) => ({
          pool_id: pool.id,
          type: prize.type || 'text',
          description: prize.description,
          image_url: prize.imageUrl || null,
          link_url: prize.linkUrl || null,
          position: index + 1,
        }));
        
        const { error: prizesError } = await supabase
          .from('pick_me_prizes')
          .insert(prizeEntries);
        
        if (prizesError) {
          console.error('Error adding prizes:', prizesError);
          // Continue anyway, since the pool was created successfully
        }
      }
    }
    
    return NextResponse.json(
      { 
        id: pool.id,
        message: 'Pool created successfully',
        accessUrl: `/pick-me/pools/${pool.id}`
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error creating pick me pool:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    // Build the query
    let query = supabase
      .from('pick_me_pools')
      .select(`
        *,
        prizes:pick_me_prizes(*)
      `)
      .eq('creator_id', user.id)
      .order('created_at', { ascending: false });
    
    // Apply status filter if provided
    if (status) {
      query = query.eq('status', status);
    }
    
    // Execute the query
    const { data: pools, error } = await query;
    
    if (error) {
      console.error('Error fetching pick me pools:', error);
      return NextResponse.json(
        { message: 'Failed to fetch pools' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({ pools });
  } catch (error) {
    console.error('Unexpected error fetching pick me pools:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}