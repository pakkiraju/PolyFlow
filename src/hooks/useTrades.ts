import { useState, useEffect, useCallback } from 'react';
import { PolymarketAPI } from '../api';
import type { Trade } from '../types';

export const useTrades = (autoRefresh: boolean = true, refreshInterval: number = 5000) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const api = PolymarketAPI.getInstance();

  const fetchTrades = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const newTrades = await api.getRecentTrades(100);
      console.log('Fetched new trades:', newTrades.length);

      setTrades(prevTrades => {
        // Create a map of existing trades by transaction hash for quick lookup
        const existingTradesMap = new Map(prevTrades.map(trade => [trade.transactionHash, trade]));

        // Add new trades (they should be new since API returns recent ones)
        newTrades.forEach(trade => {
          existingTradesMap.set(trade.transactionHash, trade);
        });

        // Convert back to array and sort by timestamp (most recent first)
        const allTrades = Array.from(existingTradesMap.values());
        allTrades.sort((a, b) => b.timestamp - a.timestamp);

        // Keep only the most recent 1000 trades to prevent memory issues
        const finalTrades = allTrades.slice(0, 1000);
        console.log('Total accumulated trades:', finalTrades.length);
        return finalTrades;
      });

      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [api]);

  const refreshTrades = useCallback(() => {
    fetchTrades();
  }, [fetchTrades]);

  useEffect(() => {
    // Initial fetch
    fetchTrades();

    // Set up auto-refresh if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchTrades, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchTrades, autoRefresh, refreshInterval]);

  return {
    trades,
    loading,
    error,
    lastUpdate,
    refreshTrades,
  };
};
