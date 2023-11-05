export function formatSecondsToHoursAndMinutes(seconds: number | undefined) {
	if (seconds) {
		const hours = Math.floor(seconds / 3600);
		const remainingSeconds = seconds % 3600;
		const minutes = Math.floor(remainingSeconds / 60);

		if (hours > 0) {
			return `${hours}:${minutes}`;
		} else {
			return `${minutes} Minutes`;
		}
	}
}
