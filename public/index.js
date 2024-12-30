$(document).ready(() => {
	let time = 30 * 60;
	const timer = $("#timer");

	function updateTimer() {
		let hours = Math.floor(time / 3600);
		let minutes = Math.floor((time % 3600) / 60);
		let seconds = time % 60;

		hours = hours < 10 ? `0${hours}` : hours;
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		seconds = seconds < 10 ? `0${seconds}` : seconds;

		timer.text(`${hours}:${minutes}:${seconds}`);

		if (time > 0) {
			time--;
		} else {
			clearInterval(interval);
			timer.text("00:00:00");
		}
	}

	const interval = setInterval(updateTimer, 1000);
});
