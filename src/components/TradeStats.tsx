import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity } from 'lucide-react';

interface TradeStatsProps {
  stats: {
    totalVolume: number;
    buyTrades: number;
    sellTrades: number;
    uniqueMarkets: number;
    tradeCount: number;
  };
}

export const TradeStats: React.FC<TradeStatsProps> = ({ stats }) => {
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  const buyPercentage = stats.tradeCount > 0 ? (stats.buyTrades / stats.tradeCount) * 100 : 0;
  const sellPercentage = stats.tradeCount > 0 ? (stats.sellTrades / stats.tradeCount) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gray-700 p-6 rounded-lg shadow border border-gray-600">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-green-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Volume (Last 100)</p>
            <p className="text-2xl font-semibold text-white">
              {formatVolume(stats.totalVolume)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-6 rounded-lg shadow border border-gray-600">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-blue-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Total Trades</p>
            <p className="text-2xl font-semibold text-white">{stats.tradeCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-6 rounded-lg shadow border border-gray-600">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-green-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Buy Orders</p>
            <p className="text-2xl font-semibold text-white">
              {stats.buyTrades} ({buyPercentage.toFixed(1)}%)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-6 rounded-lg shadow border border-gray-600">
        <div className="flex items-center">
          <TrendingDown className="h-8 w-8 text-red-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Sell Orders</p>
            <p className="text-2xl font-semibold text-white">
              {stats.sellTrades} ({sellPercentage.toFixed(1)}%)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-6 rounded-lg shadow border border-gray-600 md:col-span-2 lg:col-span-4">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-purple-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Active Markets</p>
            <p className="text-2xl font-semibold text-white">{stats.uniqueMarkets}</p>
            <p className="text-sm text-gray-400 mt-1">
              Markets with recent trading activity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
