import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPortfolioData } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    const cookieStore = cookies();
    const customPasscodeFromCookie = cookieStore.get('custom_admin_passcode')?.value;

    const data = getPortfolioData();
    const validPasscode =
      customPasscodeFromCookie ||
      process.env.ADMIN_PASSCODE ||
      data.personalInfo.adminPasscode ||
      'admin123';

    if (passcode && passcode.trim() === validPasscode.trim()) {
      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
        token: 'admin-session-active-token'
      });
      
      response.cookies.set('admin_session', 'active', {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });

      if (validPasscode) {
        response.cookies.set('custom_admin_passcode', validPasscode, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 365 // 1 year
        });
      }

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
