import fs from 'fs';
import path from 'path';
import { PortfolioData, initialPortfolioData } from '@/data/portfolioData';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'store.json');

export function getPortfolioData(): PortfolioData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileContent);
      return {
        ...initialPortfolioData,
        ...parsed,
        personalInfo: {
          ...initialPortfolioData.personalInfo,
          ...(parsed.personalInfo || {})
        }
      };
    }
  } catch (error) {
    console.error("Error reading portfolio store file:", error);
  }
  return initialPortfolioData;
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error saving portfolio store file:", error);
    return false;
  }
}
