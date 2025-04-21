import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get the user from the session
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Return the user data
    return NextResponse.json({
      id: user.id,
      email: user.email,
      displayName: user.user_metadata?.display_name || user.email?.split('@')[0],
      createdAt: user.created_at,
      lastSignIn: user.last_sign_in_at,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}