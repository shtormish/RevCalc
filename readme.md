# Investment Calculator with Compound Interest

A modern, responsive single-page investment calculator that calculates compound interest with various compounding periods, additional investments, and detailed financial metrics. Built with pure HTML, CSS, and JavaScript - no external dependencies.

<div align="center">
  <a href="https://shtormish.github.io/RevCalc/"><strong>🚀 Live Demo</strong></a>
</div>

![Investment Calculator Screenshot](Screenshot%202025-08-12%20154036.png)

## Table of Contents
* [Features](#-features)
* [Quick Start](#-quick-start)
* [Responsive Design](#-responsive-design)
* [Calculation Details](#-calculation-details)
* [Internationalization](#-internationalization)
* [Technical Implementation](#-technical-implementation)
* [Customization](#-customization)
* [Privacy & Security](#-privacy--security)
* [Disclaimer](#-disclaimer)
* [License](#-license)

## 📊 Features

### Core Functionality
- **Compound Interest Calculation**: Accurate calculation with daily compounding precision
- **Multiple Compounding Options**: No compounding, daily, monthly, quarterly, semi-annually, and annually
- **Additional Investments**: Regular additional investments with flexible frequency
- **Effective Annual Rate**: Calculates true annualized return considering compounding effects
- **Real-time Calculations**: Instant updates on every parameter change

### Detailed Financial Analysis
- **Final Amount**: Total investment value at the end of the term
- **Total Profit**: Absolute profit and percentage gain
- **Effective Rate**: Actual annualized return (CAGR)
- **Theoretical Monthly Income**: Potential monthly income from final amount
- **Average Monthly/Annual Profit**: Real average capital growth rates
- **Key Milestones**: Time to double, tenfold, and hundredfold investments
- **Target Income Timeline**: When monthly income reaches target level
- **Monthly Income Plan**: Detailed month-by-month growth breakdown

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Language Support**: English and Russian localization
- **Modern UI**: Clean, minimalist design with neobrutalism aesthetics
- **Real-time Updates**: All calculations update instantly
- **Comprehensive Tooltips**: Detailed explanations for all parameters

## 🚀 Quick Start

Simply open `index.html` in any modern web browser. No installation or build process required.

## 📱 Responsive Design

The calculator is fully responsive and uses a flexible single-column layout to adapt to all screen sizes, from mobile phones to desktops.

## 🧮 Calculation Details

### Compound Interest Formula
The calculator uses precise daily compounding calculations:
```
For each day:
  If additional investment day: Add investment
  If compounding day: Apply interest
  Amount = Amount × (1 + daily_rate × compounding_days)
```

### Effective Annual Rate
Calculated using the CAGR (Compound Annual Growth Rate) formula:
```
EAR = (Final_Amount/Initial_Amount)^(365/term_days) - 1
```

### Average Profits
- **Monthly Profit**: Total profit ÷ number of months
- **Annual Profit**: Total profit ÷ number of years

## 🌍 Internationalization

The calculator supports two languages:
- **English** (default)
- **Russian**

Click the language toggle button in the header to switch between languages.

## 🔧 Technical Implementation

### Architecture
- **Single HTML File**: Self-contained application with no external dependencies
- **Pure JavaScript**: No frameworks or libraries
- **CSS Variables**: Consistent theming and easy customization
- **Event-driven Updates**: Real-time calculations on input changes

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome for Android
- **No Polyfills Required**: Uses standard ES6+ JavaScript

## 🛠️ Customization

### Theme Colors
Modify CSS variables in the `:root` selector to change the color scheme:
```css
:root {
  --primary: #2563eb;        /* Main brand color */
  --primary-dark: #1d4ed8;   /* Darker variant */
  --secondary: #f8fafc;      /* Background/card color */
  --text: #0f172a;          /* Primary text */
  --text-secondary: #64748b; /* Secondary text */
  --border: #e2e8f0;        /* Border colors */
  --success: #10b981;       /* Positive values */
  --warning: #f59e0b;       /* Warning states */
  --danger: #ef4444;        /* Negative values */
}
```

### Layout Adjustments
- Grid layouts can be modified in the `.calculator` and `.results-grid` classes
- Spacing can be adjusted with padding/margin properties
- Breakpoints are defined in media queries

## 🔒 Privacy & Security

### Client-side Processing
- **No Data Collection**: All calculations happen in the browser
- **No External Requests**: No network calls or data transmission
- **Local Processing**: 100% client-side computation
- **No Tracking**: No analytics or user monitoring

### Data Safety
- **Input Validation**: Sanitized numeric inputs
- **Error Handling**: Graceful handling of edge cases
- **No Storage**: No cookies or local storage usage

## ⚖️ Disclaimer

This calculator is provided for informational and educational purposes only. It is not intended to be financial advice. The results are based on the data you provide and may not reflect actual investment returns. Always consult with a qualified financial professional before making any investment decisions.

## 📄 License

This project is open source and available under the MIT License.