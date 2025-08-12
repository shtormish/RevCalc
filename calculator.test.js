import {
    calculateCompoundInterest,
    calculateEffectiveRate,
    calculateMonthlyPlan,
    calculateAverageProfits,
    calculateMilestones,
    formatNumber,
    formatTimePeriod
} from './calculator.js';

describe('formatNumber', () => {
    test('should format numbers less than 1000 with 2 decimal places', () => {
        expect(formatNumber(123.456)).toBe('123.46');
    });

    test('should format numbers in thousands with "K"', () => {
        expect(formatNumber(12345)).toBe('12.3K');
    });

    test('should format numbers in millions with "M"', () => {
        expect(formatNumber(1234567)).toBe('1.23M');
    });
});

describe('formatTimePeriod', () => {
    test('should return "Never" for 0 days in English', () => {
        expect(formatTimePeriod(0, 'en')).toBe('Never');
    });

    test('should format years, months, and days correctly in English', () => {
        expect(formatTimePeriod(398, 'en')).toBe('1 year 1 month 3 days');
    });

    test('should handle pluralization correctly in English', () => {
        expect(formatTimePeriod(731, 'en')).toBe('2 years 1 day');
    });

    test('should format years, months, and days correctly in Russian', () => {
        expect(formatTimePeriod(398, 'ru')).toBe('1 год 1 месяц 3 дня');
    });

    test('should handle pluralization correctly in Russian', () => {
        expect(formatTimePeriod(731, 'ru')).toBe('2 года 1 день');
        expect(formatTimePeriod(1825, 'ru')).toBe('5 лет');
    });

    test('should return "Никогда" for 0 days in Russian', () => {
        expect(formatTimePeriod(0, 'ru')).toBe('Никогда');
    });

    test('should return "0 дней" for a very short period in Russian', () => {
        expect(formatTimePeriod(0.2, 'ru')).toBe('0 дней');
    });

    test('should handle Russian pluralization for 11-14 days', () => {
        expect(formatTimePeriod(13, 'ru')).toBe('13 дней');
    });

    test('should handle single units correctly', () => {
        expect(formatTimePeriod(365, 'en')).toBe('1 year');
        expect(formatTimePeriod(30, 'en')).toBe('1 month');
        expect(formatTimePeriod(1, 'ru')).toBe('1 день');
    });
});

describe('calculateCompoundInterest', () => {
    const principal = 10000;
    const rate = 8;
    const termDays = 365 * 10; // 10 years

    test('should calculate correctly with annual compounding', () => {
        const finalAmount = calculateCompoundInterest(principal, rate, 365, termDays, 0, 0);
        expect(finalAmount).toBeCloseTo(21589.25);
    });

    test('should calculate correctly with monthly compounding', () => {
        const finalAmount = calculateCompoundInterest(principal, rate, 30, termDays, 0, 0);
        // Note: The custom daily simulation gives a slightly different result than standard formulas
        expect(finalAmount).toBeCloseTo(22100.43);
    });

    test('should handle additional monthly investments', () => {
        const finalAmount = calculateCompoundInterest(principal, rate, 30, termDays, 100, 30);
        expect(finalAmount).toBeCloseTo(40624.18);
    });

    test('should calculate simple interest for no compounding', () => {
        const finalAmount = calculateCompoundInterest(principal, rate, 0, termDays, 0, 0);
        expect(finalAmount).toBe(18000);
    });

    test('should calculate simple interest with additional monthly investments', () => {
        // Simple interest: 10000 * 0.08 * 10 = 8000
        // Additional investments: 100 * floor(3650 / 30) = 100 * 121 = 12100
        // Total = 10000 + 8000 + 12100 = 30100
        const finalAmount = calculateCompoundInterest(10000, 8, 0, 3650, 100, 30);
        expect(finalAmount).toBe(30100);
    });

    test('should return principal plus additions if rate is 0', () => {
        const principal = 10000;
        const termDays = 365 * 2; // 2 years
        const additionalAmount = 100;
        const additionalFrequency = 30; // monthly
        const numberOfAdditions = Math.floor(termDays / additionalFrequency);
        const expectedAmount = principal + (additionalAmount * numberOfAdditions);
        const finalAmount = calculateCompoundInterest(principal, 0, 365, termDays, additionalAmount, additionalFrequency);
        expect(finalAmount).toBe(expectedAmount);
    });

    test('should not add anything if additionalAmount is 0', () => {
        const finalAmountWithZeroAddition = calculateCompoundInterest(10000, 8, 30, 365, 0, 30);
        const finalAmountWithoutAddition = calculateCompoundInterest(10000, 8, 30, 365, 0, 0);
        expect(finalAmountWithZeroAddition).toBeCloseTo(finalAmountWithoutAddition);
    });

    test('should return principal if rate is 0', () => {
        const finalAmount = calculateCompoundInterest(principal, 0, 365, termDays, 0, 0);
        expect(finalAmount).toBe(principal);
    });
});

describe('calculateEffectiveRate', () => {
    test('should calculate the correct effective rate (CAGR)', () => {
        const principal = 10000;
        const finalAmount = 21589.25; // From 8% nominal compounded annually for 10 years
        const termDays = 3650;
        const effectiveRate = calculateEffectiveRate(principal, finalAmount, termDays);
        expect(effectiveRate).toBeCloseTo(8.00);
    });

    test('should return 0 for no growth', () => {
        expect(calculateEffectiveRate(10000, 10000, 365)).toBe(0);
    });
});

describe('calculateAverageProfits', () => {
    test('should calculate average monthly and annual profits', () => {
        const principal = 10000;
        const finalAmount = 18000; // 8k profit
        const termDays = 3650; // 10 years
        const profits = calculateAverageProfits(principal, finalAmount, termDays);

        expect(profits.annual).toBeCloseTo(800);
        expect(profits.monthly).toBeCloseTo(66.67);
        expect(profits.annualPercent).toBeCloseTo(8);
        expect(profits.monthlyPercent).toBeCloseTo(0.67);
    });

    test('should return all zeros if term is zero', () => {
        expect(calculateAverageProfits(1000, 2000, 0)).toEqual({
            monthly: 0,
            annual: 0,
            monthlyPercent: 0,
            annualPercent: 0,
        });
    });

    test('should handle zero principal correctly', () => {
        const profits = calculateAverageProfits(0, 1000, 365);
        expect(profits.annual).toBeCloseTo(1000);
        expect(profits.monthly).toBeCloseTo(83.33);
        expect(profits.annualPercent).toBe(0);
        expect(profits.monthlyPercent).toBe(0);
    });
});

describe('calculateMonthlyPlan', () => {
    test('should generate a correct monthly plan for a simple case', () => {
        const principal = 1000;
        const rate = 12; // ~1% per month
        const compoundingDays = 30; // monthly
        const termDays = 90; // 3 months
        const plan = calculateMonthlyPlan(principal, rate, compoundingDays, termDays, 0, 0);

        expect(plan).toHaveLength(3);

        // Month 1
        expect(plan[0].month).toBe(1);
        expect(plan[0].cumulativeAmount).toBeCloseTo(1009.86);

        // Month 2
        expect(plan[1].month).toBe(2);
        expect(plan[1].cumulativeAmount).toBeCloseTo(1019.82);

        // Month 3
        expect(plan[2].month).toBe(3);
        expect(plan[2].cumulativeAmount).toBeCloseTo(1029.88);
    });

    test('should generate a correct monthly plan with additional investments', () => {
        const plan = calculateMonthlyPlan(1000, 10, 30, 60, 50, 30);
        expect(plan).toHaveLength(2);
        // Month 1: (1000 + 50) * (1 + 0.1/365*30) = 1058.63
        expect(plan[0].cumulativeAmount).toBeCloseTo(1058.63);
        // Month 2: (1058.6301... + 50) * (1 + 0.1/365*30) = 1117.74
        expect(plan[1].cumulativeAmount).toBeCloseTo(1117.74);
    });

    test('should handle a term not perfectly divisible by 30', () => {
        const plan = calculateMonthlyPlan(1000, 10, 30, 75, 0, 0);
        expect(plan).toHaveLength(3); // 3 months, last one is partial
        expect(plan[2].cumulativeAmount).toBeCloseTo(1016.51);
    });

    test('should handle zero principal', () => {
        const plan = calculateMonthlyPlan(0, 10, 30, 90, 100, 30);
        expect(plan).toHaveLength(3);
        // Month 1: (0+100) * (1 + 0.1/365*30) = 100.82
        expect(plan[0].cumulativeAmount).toBeCloseTo(100.82);
        expect(plan[0].percentageOfInitial).toBe(0);
        // Month 2: (100.82... + 100) * (1 + 0.1/365*30) = 202.47
        expect(plan[1].cumulativeAmount).toBeCloseTo(202.47);
    });
});

describe('calculateMilestones', () => {
    const principal = 1000;
    const rate = 10;
    const compoundingDays = 365; // annual

    test('should find the time to double the investment', () => {
        const milestones = calculateMilestones(principal, rate, compoundingDays, 0, 0, 0);
        // Rule of 72 approximation: 72/10 = 7.2 years. Actual is slightly different.
        // With annual compounding, it will be exactly 8 years (day 2920)
        expect(milestones.double).toBe(2920); // 8 years * 365
    });

    test('should find the time to tenfold the investment', () => {
        const milestones = calculateMilestones(principal, rate, compoundingDays, 0, 0, 0);
        expect(milestones.tenfold).toBe(9125); // 25 years * 365
    });

    test('should return 0 if a milestone is not reached within 100 years', () => {
        // With 1% rate, 100x is not reached in 100 years
        const milestones = calculateMilestones(1000, 1, 365, 0, 0, 0);
        expect(milestones.hundredfold).toBe(0);
    });

    test('should find the time to reach target monthly income', () => {
        // Target income of $100/month from a 10% annual rate requires $12,000 capital.
        // (12000 * 0.10 / 12 = 100)
        const milestones = calculateMilestones(1000, 10, 365, 100, 30, 100);
        // With $100/mo additions, it should be reached much faster.
        // Let's test the day.
        expect(milestones.targetIncome).toBe(2190); // Exactly 6 years
    });

    test('should find time to double with simple interest', () => {
        const principal = 1000;
        const rate = 10; // 10%
        const compoundingDays = 0; // simple interest
        // With simple interest, profit is 1000 * 0.10 = 100 per year.
        // To double (make 1000 profit), it takes 10 years = 3650 days.
        const milestones = calculateMilestones(principal, rate, compoundingDays, 0, 0, 0);
        expect(milestones.double).toBe(3650);
    });

    test('should handle a target income of zero', () => {
        const milestones = calculateMilestones(1000, 10, 1, 0, 0, 0);
        expect(milestones.double).toBeGreaterThan(0);
        expect(milestones.targetIncome).toBe(0);
    });

    test('should not reach milestones with zero principal and no additions', () => {
        const milestones = calculateMilestones(0, 10, 30, 0, 0, 100);
        expect(milestones).toEqual({ double: 0, tenfold: 0, hundredfold: 0, targetIncome: 0 });
    });

    test('should reach target income with zero principal but with additions', () => {
        // To get $100/mo income at 10% rate, we need 12k capital.
        // With $1k/mo additions, this takes 12 months = 360 days.
        const milestones = calculateMilestones(0, 10, 30, 1000, 30, 100);
        expect(milestones.targetIncome).toBe(360);
    });
});