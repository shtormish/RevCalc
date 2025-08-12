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

The calculator's internal engine performs a granular day-by-day simulation for higher accuracy, especially with complex contribution schedules. This iterative approach is reflected in the monthly plan. However, the main calculated metrics are based on the following standard financial formulas.

### Calculation Formulas

#### 1. Final Amount (Future Value)
The final amount is the future value of the initial principal combined with the future value of a series of regular contributions (an annuity).

$$ A = P \left(1 + \frac{r}{n}\right)^{nt} + C \times \frac{\left(1 + \frac{r}{n}\right)^{nt} - 1}{\frac{r}{n}} $$

-   $A$: The future value of the investment.
-   $P$: The initial principal amount.
-   $C$: The periodic contribution amount.
-   $r$: The nominal annual interest rate (as a decimal).
-   $n$: The number of times that interest is compounded per year.
-   $t$: The number of years the money is invested for.

> **Note:** This formula is a standard financial model. The calculator's day-by-day simulation may yield slightly different results depending on the timing of contributions relative to compounding dates.

*Source: [Investopedia: Compound Interest](https://www.investopedia.com/terms/c/compoundinterest.asp)*

#### 2. Total Profit
Total profit is the final amount minus the initial principal. Note that in this calculator's implementation, this value also includes the sum of all additional contributions made over the term.

$$ \Pi_{total} = A - P $$

-   $\Pi_{total}$: Total profit.
-   $A$: Final amount.
-   $P$: Initial principal.

#### 3. Effective Annual Rate (CAGR)
The Effective Annual Rate is calculated using the Compound Annual Growth Rate (CAGR) formula, which measures the mean annual growth rate of an investment over a specified period of time longer than one year.

$$ R_{eff} = \left(\frac{A}{P}\right)^{\frac{1}{t}} - 1 $$

-   $R_{eff}$: The Effective Annual Rate.
-   $A$: The final amount (ending value).
-   $P$: The initial principal (beginning value).
-   $t$: The total number of years.

> **Note:** This standard CAGR formula is most accurate for lump-sum investments without intermediate contributions. The calculator uses this as an estimate of the effective rate.

*Source: [Investopedia: CAGR](https://www.investopedia.com/terms/c/cagr.asp)*

#### 4. Theoretical Monthly Income
This is a simple projection of the monthly income you could generate if you were to withdraw only the interest earned on the final accumulated amount, based on the nominal annual rate.

$$ I_{monthly} = A \times \frac{r}{12} $$

-   $I_{monthly}$: The theoretical monthly income.
-   $A$: The final amount.
-   $r$: The nominal annual interest rate (as a decimal).

#### 5. Average Annual and Monthly Profit
These metrics show the average profit generated per year or per month over the entire investment term.

**Average Annual Profit:**
$$ \bar{\Pi}_{annual} = \frac{A - P}{t} $$

**Average Monthly Profit:**
$$ \bar{\Pi}_{monthly} = \frac{A - P}{t \times 12} $$

-   $\bar{\Pi}$: The average profit (annual or monthly).
-   $A$: The final amount.
-   $P$: The initial principal.
-   $t$: The total number of years.

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