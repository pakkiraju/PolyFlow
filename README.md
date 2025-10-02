# Polymarket Trade Flow Scanner

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)

A real-time web application that scans Polymarket using their public API to track money flow across all trades. Monitor live trading activity with detailed buyer/seller information, market insights, and real-time statistics.

![Polymarket Trade Flow Scanner](https://via.placeholder.com/800x400/1f2937/ffffff?text=Polymarket+Trade+Flow+Scanner)

## ✨ Features

- **📊 Real-time Trade Scanning**: Continuously fetches the latest trades from Polymarket's data API
- **🔍 Comprehensive Trade Data**: Displays buyer, seller, market name, outcome, shares transacted, and price
- **📈 Live Statistics Dashboard**: Shows trading volume, buy/sell ratios, and active markets
- **⚙️ Customizable Refresh Rate**: Adjustable auto-refresh intervals (1s to 30s)
- **🎨 Modern Dark UI**: Clean, responsive design built with React and Tailwind CSS
- **🔗 Direct Market Links**: Click any market to view it on Polymarket
- **👤 User Profile Links**: Click usernames to view trader profiles
- **💰 Smart Filtering**: Filter trades by minimum bet amount
- **📱 Responsive Design**: Works perfectly on desktop and mobile

## 🚀 Demo

[View Live Demo](https://your-netlify-link-here.netlify.app) *(Replace with your actual Netlify URL)*

### Screenshots

#### Main Dashboard
![Dashboard Screenshot](https://via.placeholder.com/600x300/374151/ffffff?text=Dashboard+Screenshot)

#### Trade Table
![Trade Table](https://via.placeholder.com/600x300/374151/ffffff?text=Trade+Table+Screenshot)

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend** | React | 19.2.0 |
| **Language** | TypeScript | 5.9.3 |
| **Styling** | Tailwind CSS | 3.4.0 |
| **Icons** | Lucide React | 0.544.0 |
| **HTTP Client** | Axios | 1.12.2 |
| **Build Tool** | Vite | 7.1.7 |
| **API** | Polymarket Data API | - |

## Data Displayed

For each trade, the app shows:
- **Trader**: Pseudonym and wallet address (shortened)
- **Action**: BUY or SELL with color-coded indicators
- **Market**: Full market title and question
- **Outcome**: What the trader is betting on (Yes/No, specific outcomes)
- **Shares**: Number of shares transacted
- **Price**: Price per share in USD
- **Timestamp**: When the trade occurred

## Statistics Dashboard

The app provides real-time statistics based on the most recent 100 trades:
- **Total Volume**: Sum of all trade values
- **Buy/Sell Ratio**: Percentage breakdown of buy vs sell orders
- **Active Markets**: Number of unique markets with recent activity
- **Trade Count**: Total number of trades displayed

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/polymarket-trade-flow-scanner.git
   cd polymarket-trade-flow-scanner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically load with live trade data

### Build for Production

```bash
npm run build
npm run preview
```

## API Usage

The app uses Polymarket's public data API endpoint:
- **Endpoint**: `https://data-api.polymarket.com/trades`
- **Method**: GET
- **No Authentication Required**: Public endpoint
- **Rate Limits**: None specified, but reasonable polling intervals are recommended

## Controls

- **Auto-refresh Toggle**: Pause/resume automatic data fetching
- **Refresh Interval**: Choose from 1s, 2s, 5s, 10s, or 30s intervals
- **Manual Refresh**: Force immediate data update

## Data Privacy

- No user data is stored or transmitted
- All data comes directly from Polymarket's public API
- No personal information is collected or processed

## Architecture

```
src/
├── components/
│   ├── TradeTable.tsx     # Main trade data display
│   └── TradeStats.tsx     # Statistics dashboard
├── hooks/
│   └── useTrades.ts       # Custom hook for data fetching
├── api.ts                 # API client configuration
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main application component
└── main.tsx               # React application entry point
├── netlify.toml           # Netlify deployment configuration
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # Project documentation
```

## Future Enhancements

Potential improvements for future versions:
- Market-specific filtering
- Historical trade analysis
- Price change indicators
- Export functionality
- Dark mode support
- Mobile app version

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your GitHub repository** to Netlify
2. **The `netlify.toml` file is already configured** with the correct build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables** for Rollup compatibility
3. **Deploy!** Your app will be live in minutes

The `netlify.toml` file includes special configuration to handle Rollup's native binary dependencies on Netlify's build environment.

### Other Platforms

The app can also be deployed to:
- **Vercel**: Similar setup to Netlify
- **GitHub Pages**: Use `vite build --mode production`
- **AWS S3 + CloudFront**: For maximum performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⚠️ Disclaimer

This application uses Polymarket's public API and is not affiliated with Polymarket. All data is fetched from their public endpoints and displayed as-is. Users should verify trade data independently for critical decisions.

---

**Built with ❤️ for the Polymarket community**
