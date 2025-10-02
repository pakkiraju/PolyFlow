import { useState, useMemo } from 'react';
import { TradeTable } from './components/TradeTable';
import { TradeStats } from './components/TradeStats';
import { useTrades } from './hooks/useTrades';
import { RefreshCw, TrendingUp, Play, Pause } from 'lucide-react';

function App() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [minBetAmount, setMinBetAmount] = useState(1);

  const { trades, loading, error, lastUpdate, refreshTrades } = useTrades(autoRefresh, refreshInterval);

  const filteredTrades = useMemo(() => {
    return trades.filter(trade => (trade.size * trade.price) >= minBetAmount);
  }, [trades, minBetAmount]);

  const stats = useMemo(() => {
    if (filteredTrades.length === 0) return null;

    const recentTrades = filteredTrades.slice(0, 100); // Last 100 filtered trades for stats
    const totalVolume = recentTrades.reduce((sum, trade) => sum + (trade.size * trade.price), 0);
    const buyTrades = recentTrades.filter(trade => trade.side === 'BUY').length;
    const sellTrades = recentTrades.filter(trade => trade.side === 'SELL').length;
    const uniqueMarkets = new Set(recentTrades.map(trade => trade.eventSlug)).size;

    return {
      totalVolume,
      buyTrades,
      sellTrades,
      uniqueMarkets,
      tradeCount: recentTrades.length,
    };
  }, [filteredTrades]);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Polymarket Trade Flow
                </h1>
                <p className="text-gray-300 mt-1">
                  Real-time tracking of money flowing through Polymarket trades
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="refresh-interval" className="text-sm text-gray-300">
                  Refresh every:
                </label>
                <select
                  id="refresh-interval"
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-600 rounded text-sm bg-gray-700 text-white"
                >
                  <option value={1000}>1s</option>
                  <option value={2000}>2s</option>
                  <option value={5000}>5s</option>
                  <option value={10000}>10s</option>
                  <option value={30000}>30s</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="min-bet-amount" className="text-sm text-gray-300">
                  Min bet: $
                </label>
                <select
                  id="min-bet-amount"
                  value={minBetAmount}
                  onChange={(e) => setMinBetAmount(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-600 rounded text-sm bg-gray-700 text-white"
                >
                  <option value={1}>$1</option>
                  <option value={5}>$5</option>
                  <option value={10}>$10</option>
                  <option value={25}>$25</option>
                  <option value={50}>$50</option>
                  <option value={100}>$100</option>
                  <option value={250}>$250</option>
                  <option value={500}>$500</option>
                  <option value={1000}>$1000</option>
                </select>
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  autoRefresh
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                {autoRefresh ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Resume</span>
                  </>
                )}
              </button>
              <button
                onClick={refreshTrades}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            {lastUpdate && (
              <p className="text-sm text-gray-400">
                Last updated: {lastUpdate.toLocaleTimeString()} | Total trades: {trades.length} | Filtered: {filteredTrades.length} | Min bet: ${minBetAmount}
              </p>
            )}
            {autoRefresh && (
              <p className="text-sm text-green-400">
                Auto-refreshing every {refreshInterval / 1000}s
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {stats && <TradeStats stats={stats} />}

        <TradeTable trades={filteredTrades} loading={loading} />
      </div>
    </div>
  );
}

export default App;
