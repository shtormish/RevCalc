// Format number with K/M suffixes for brevity.
export function formatNumber(num) {
    if (Math.abs(num) > 999999) {
        return (num / 1000000).toFixed(2) + 'M';
    }
    if (Math.abs(num) > 999) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(2);
}

// Format a period of days into a human-readable string (e.g., "1 year 2 months 3 days").
// This version includes improved pluralization for both English and Russian.
export function formatTimePeriod(days, lang = 'en') {
    if (!days || days <= 0) {
        return lang === 'en' ? 'Never' : 'Никогда';
    }

    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = Math.round(days - (years * 365) - (months * 30));

    const parts = [];

    if (lang === 'en') {
        if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
        if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
        if (remainingDays > 0) parts.push(`${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`);
    } else { // ru
        const pluralize = (count, forms) => { // [one, few, many] e.g. ['год', 'года', 'лет']
            const n = Math.abs(count) % 100;
            const n1 = n % 10;
            if (n > 10 && n < 20) return forms[2];
            if (n1 > 1 && n1 < 5) return forms[1];
            if (n1 === 1) return forms[0];
            return forms[2];
        };
        if (years > 0) parts.push(`${years} ${pluralize(years, ['год', 'года', 'лет'])}`);
        if (months > 0) parts.push(`${months} ${pluralize(months, ['месяц', 'месяца', 'месяцев'])}`);
        if (remainingDays > 0) parts.push(`${remainingDays} ${pluralize(remainingDays, ['день', 'дня', 'дней'])}`);
    }

    return parts.length > 0 ? parts.join(' ') : (lang === 'en' ? '0 days' : '0 дней');
}

// Calculate compound interest using a daily simulation model.
export function calculateCompoundInterest(principal, rate, compoundingDays, termDays, additionalAmount, additionalFrequency) {
    const annualRate = rate / 100;

    // No compounding - simple interest
    if (compoundingDays === 0) {
        const simpleInterest = principal * annualRate * (termDays / 365);
        let amount = principal + simpleInterest;

        if (additionalFrequency > 0 && additionalAmount > 0) {
            const numberOfAdditionalInvestments = Math.floor(termDays / additionalFrequency);
            amount += additionalAmount * numberOfAdditionalInvestments;
        }
        return amount;
    }

    // With compounding
    let amount = principal;
    const dailyRate = annualRate / 365;

    for (let day = 1; day <= termDays; day++) {
        if (additionalFrequency > 0 && day % additionalFrequency === 0) {
            amount += additionalAmount;
        }
        if (day % compoundingDays === 0) {
            const periodRate = dailyRate * compoundingDays;
            amount *= (1 + periodRate);
        }
    }
    return amount;
}

// Calculate a month-by-month breakdown of the investment growth.
export function calculateMonthlyPlan(principal, rate, compoundingDays, termDays, additionalAmount, additionalFrequency) {
    const annualRate = rate / 100;
    const dailyRate = annualRate / 365;
    let amount = principal;
    const monthlyData = [];
    let previousMonthAmount = principal;

    for (let month = 1; month <= Math.ceil(termDays / 30); month++) {
        const startDay = (month - 1) * 30 + 1;
        const endDay = Math.min(month * 30, termDays);

        for (let day = startDay; day <= endDay; day++) {
            if (additionalFrequency > 0 && day % additionalFrequency === 0) {
                amount += additionalAmount;
            }
            if (compoundingDays > 0 && day % compoundingDays === 0) {
                const periodRate = dailyRate * compoundingDays;
                amount *= (1 + periodRate);
            }
        }

        const monthlyIncome = amount - previousMonthAmount;
        monthlyData.push({
            month: month,
            cumulativeAmount: amount,
            monthlyIncome: monthlyIncome,
            percentageOfInitial: principal > 0 ? (monthlyIncome / principal) * 100 : 0
        });
        previousMonthAmount = amount;
    }
    return monthlyData;
}

// Calculate the effective annual rate (CAGR).
export function calculateEffectiveRate(principal, finalAmount, termDays) {
    if (termDays <= 0 || principal <= 0 || finalAmount <= principal) return 0;
    const totalGrowthFactor = finalAmount / principal;
    const effectiveRate = (Math.pow(totalGrowthFactor, 365 / termDays) - 1) * 100;
    return effectiveRate;
}

// Calculate average monthly and annual profits.
export function calculateAverageProfits(principal, finalAmount, termDays) {
    if (termDays <= 0) return { monthly: 0, annual: 0, monthlyPercent: 0, annualPercent: 0 };

    const totalProfit = finalAmount - principal;
    const years = termDays / 365;
    const months = years * 12;

    const averageMonthlyProfit = months > 0 ? totalProfit / months : 0;
    const averageAnnualProfit = years > 0 ? totalProfit / years : 0;
    const averageMonthlyPercent = principal > 0 && months > 0 ? (totalProfit / principal) * 100 / months : 0;
    const averageAnnualPercent = principal > 0 && years > 0 ? (totalProfit / principal) * 100 / years : 0;

    return {
        monthly: averageMonthlyProfit,
        annual: averageAnnualProfit,
        monthlyPercent: averageMonthlyPercent,
        annualPercent: averageAnnualPercent
    };
}

// Calculate key investment milestones.
export function calculateMilestones(principal, rate, compoundingDays, additionalAmount, additionalFrequency, targetIncome) {
    const annualRate = rate / 100;
    const dailyRate = annualRate / 365;
    let amount = principal;
    let daysToDouble = 0, daysToTenfold = 0, daysToHundredfold = 0, daysToTargetIncome = 0;

    // Limit search to 100 years to prevent infinite loops
    for (let day = 1; day <= 365 * 100; day++) {
        if (additionalFrequency > 0 && day % additionalFrequency === 0) amount += additionalAmount;

        if (compoundingDays > 0 && day % compoundingDays === 0) {
            amount *= (1 + dailyRate * compoundingDays);
        } else if (compoundingDays === 0) {
            amount += principal * dailyRate; // Simple interest
        }

        if (daysToDouble === 0 && principal > 0 && amount >= principal * 2) daysToDouble = day;
        if (daysToTenfold === 0 && principal > 0 && amount >= principal * 10) daysToTenfold = day;
        if (daysToHundredfold === 0 && principal > 0 && amount >= principal * 100) daysToHundredfold = day;
        if (daysToTargetIncome === 0 && targetIncome > 0 && (amount * annualRate / 12) >= targetIncome) daysToTargetIncome = day;

        if (daysToDouble && daysToTenfold && daysToHundredfold && (daysToTargetIncome || targetIncome <= 0)) break;
    }

    return { double: daysToDouble, tenfold: daysToTenfold, hundredfold: daysToHundredfold, targetIncome: daysToTargetIncome };
}