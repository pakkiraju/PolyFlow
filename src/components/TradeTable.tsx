import React from 'react';
import { Trade } from '../types';
import { TrendingUp, TrendingDown, Clock, User } from 'lucide-react';

interface TradeTableProps {
  trades: Trade[];
  loading: boolean;
}

export const TradeTable: React.FC<TradeTableProps> = ({ trades, loading }) => {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const formatWallet = (wallet: string) => {
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(4)}`;
  };

  const formatSize = (size: number) => {
    return size.toLocaleString();
  };

  const formatBetAmount = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading && trades.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-300">Loading trades...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-700">
      <div className="px-6 py-4 border-b border-gray-600">
        <h2 className="text-lg font-semibold text-white">Recent Trades</h2>
        <p className="text-sm text-gray-300 mt-1">
          Showing {trades.length} trades (filtered by minimum bet amount)
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Trader
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Market
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Outcome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Shares
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Bet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                To Win
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-600">
            {trades.map((trade, index) => (
              <tr key={`${trade.transactionHash}-${index}`} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                      <a
                        href={`https://polymarket.com/profile/${trade.proxyWallet}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-white hover:text-gray-300 hover:underline"
                        title={`View ${trade.pseudonym || trade.name || 'User'}'s profile on Polymarket`}
                      >
                        {trade.pseudonym || trade.name || 'Anonymous'}
                      </a>
                      <div className="text-xs text-gray-400">
                        {formatWallet(trade.proxyWallet)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {trade.side === 'BUY' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      trade.side === 'BUY'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {trade.side}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://polymarket.com/market/${trade.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-gray-300 hover:underline max-w-xs truncate block"
                    title={trade.title}
                  >
                    {trade.title}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-white">{trade.outcome}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-white">
                    {formatSize(trade.size)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-white">{formatPrice(trade.price)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-white">{formatBetAmount(trade.size * trade.price)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {trade.side === 'BUY' ? (
                    <span className="text-sm text-green-600 font-medium">{formatBetAmount(trade.size)}</span>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-white">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTimestamp(trade.timestamp)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {trades.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">No trades found</p>
        </div>
      )}
    </div>
  );
};
