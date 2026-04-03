export function formatTime(ms: number, style: 'clock' | 'seconds' = 'seconds'): string {
	if (style === 'clock') {
		const totalSec = Math.floor(ms / 1000);
		const min = Math.floor(totalSec / 60);
		const sec = totalSec % 60;
		return `${min}:${sec.toString().padStart(2, '0')}`;
	}
	return (ms / 1000).toFixed(1) + 's';
}

export function formatStat(value: number | null | undefined, suffix?: string, fallback = '\u2014'): string {
	if (value == null) return fallback;
	return suffix ? `${value}${suffix}` : String(value);
}
