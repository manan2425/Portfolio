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
    const success = savePortfolioData(updatedData);

    if (success) {
      return NextResponse.json({ success: true, data: updatedData });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save data' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error processing update' },
      { status: 500 }
    );
  }
}
