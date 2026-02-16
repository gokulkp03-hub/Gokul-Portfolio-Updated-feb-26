/**
 * Currency and metric formatting utilities
 * All monetary values should use AED (United Arab Emirates Dirham)
 */

/**
 * Formats a number as AED currency
 * @param value - The amount to format, or null for unknown values
 * @returns Formatted string like "AED 15,000" or "—" for null
 */
export function formatCurrencyAED(value: number | null | undefined): string {
    if (value === null || value === undefined) {
        return '—';
    }

    return `AED ${value.toLocaleString('en-US')}`;
}

/**
 * Formats ROAS (Return on Ad Spend) value
 * @param value - The ROAS multiplier
 * @returns Formatted string like "4.2x"
 */
export function formatROAS(value: number): string {
    return `${value.toFixed(1)}x`;
}

/**
 * Formats percentage values
 * @param value - The percentage value (e.g., 62 for 62%)
 * @returns Formatted string like "62%"
 */
export function formatPercentage(value: number): string {
    return `${value}%`;
}

/**
 * Formats metric values with appropriate suffix
 * @param value - The metric value
 * @param suffix - Optional suffix like "+" or "k"
 * @returns Formatted string
 */
export function formatMetric(value: number | string, suffix?: string): string {
    if (typeof value === 'string') {
        return suffix ? `${value}${suffix}` : value;
    }

    return suffix ? `${value.toLocaleString('en-US')}${suffix}` : value.toLocaleString('en-US');
}

/**
 * Converts USD to AED using standard exchange rate
 * @param usdAmount - Amount in USD
 * @param rate - Exchange rate (default: 3.67)
 * @returns Amount in AED
 */
export function convertUSDtoAED(usdAmount: number, rate: number = 3.67): number {
    return Math.round(usdAmount * rate);
}
