import { NextResponse } from 'next/server';
import { getPortfolioData } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    const data = getPortfolioData();
    const validPasscode = data.personalInfo.adminPasscode || 'admin123';

    if (passcode === validPasscode) {
      // In production/local demo, returning a session token
      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
        token: 'admin-session-active-token'
      });
      
      response.cookies.set('admin_session', 'active', {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid passcode' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Authentication error' },
      { status: 500 }
    );
  }
}
