import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/storage';
import { PortfolioData } from '@/data/portfolioData';

export async function GET() {
  const data = getPortfolioData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const updatedData: PortfolioData = await request.json();
    savePortfolioData(updatedData);

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
