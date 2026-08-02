import { NextResponse } from 'next/server';
import { getPortfolioDataAsync, savePortfolioDataAsync } from '@/lib/storage';
import { PortfolioData } from '@/data/portfolioData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const data = await getPortfolioDataAsync();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

export async function POST(request: Request) {
  try {
    const updatedData: PortfolioData = await request.json();
    await savePortfolioDataAsync(updatedData);

    const response = NextResponse.json({ success: true, data: updatedData });

    if (updatedData.personalInfo?.adminPasscode) {
      response.cookies.set('custom_admin_passcode', updatedData.personalInfo.adminPasscode, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 365 // 1 year
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error processing update' },
      { status: 500 }
    );
  }
}
