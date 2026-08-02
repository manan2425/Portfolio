import fs from 'fs';
import path from 'path';
import { PortfolioData, initialPortfolioData } from '@/data/portfolioData';
import clientPromise from '@/lib/mongodb';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'store.json');
const DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio_db';
const COLLECTION_NAME = 'portfolio_data';

export async function getPortfolioDataAsync(): Promise<PortfolioData> {
  // 1. Try MongoDB Atlas if configured
  if (process.env.MONGODB_URI && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);
      const doc = await collection.findOne({ _id: 'main_portfolio' as any });

      if (doc && doc.personalInfo) {
        const { _id, ...cleanData } = doc;
        return cleanData as PortfolioData;
      }
    } catch (error) {
      console.error("Error reading from MongoDB Atlas:", error);
    }
  }

  // 2. Fallback to store.json
  return getPortfolioData();
}

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

export async function savePortfolioDataAsync(data: PortfolioData): Promise<boolean> {
  // Always save to store.json locally
  savePortfolioData(data);

  // Save to MongoDB Atlas if configured
  if (process.env.MONGODB_URI && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);
      await collection.updateOne(
        { _id: 'main_portfolio' as any },
        { $set: data },
        { upsert: true }
      );
      return true;
    } catch (error) {
      console.error("Error saving to MongoDB Atlas:", error);
      return false;
    }
  }

  return true;
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
