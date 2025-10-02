import axios from 'axios';
import { Trade } from './types';

const POLYMARKET_API_BASE = 'https://data-api.polymarket.com';

export class PolymarketAPI {
  private static instance: PolymarketAPI;

  public static getInstance(): PolymarketAPI {
    if (!PolymarketAPI.instance) {
      PolymarketAPI.instance = new PolymarketAPI();
    }
    return PolymarketAPI.instance;
  }

  async getRecentTrades(limit: number = 50): Promise<Trade[]> {
    try {
      const response = await axios.get(`${POLYMARKET_API_BASE}/trades`, {
        params: {
          limit,
          sort: 'desc', // Most recent first
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching trades:', error);
      throw new Error('Failed to fetch trade data from Polymarket');
    }
  }

  async getTradesByMarket(marketSlug: string, limit: number = 50): Promise<Trade[]> {
    try {
      const response = await axios.get(`${POLYMARKET_API_BASE}/trades`, {
        params: {
          market: marketSlug,
          limit,
          sort: 'desc',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching trades for market:', error);
      throw new Error(`Failed to fetch trades for market: ${marketSlug}`);
    }
  }
}
