/**
 * Easy Task
 */
function clearKeys() {
	KEYS.length = 0;
}

function createAndPlayback() {
	console.log("2.5 seconds passed. Playing and clearing keys");

	playback();
	clearKeys();
	console.log(KEYS);

	isTimeoutEnabled = false;
}

function playback() {
	KEYS.forEach(function(key, i) {
		setTimeout(notes[key].play.bind(null, key), i * 500);
	});
}

var timeoutRef;
var isTimeoutEnabled = false;
clearKeys();