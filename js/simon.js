var KEYS = ['c', 'd', 'e', 'f'];
var NOTE_DURATION = 1000;

// NoteBox
//
// Acts as an interface to the coloured note boxes on the page, exposing methods
// for playing audio, handling clicks,and enabling/disabling the note box.
function NoteBox(key, onClick) {
	// Create references to box element and audio element.
	var boxEl = document.getElementById(key);
	var audioEl = document.getElementById(key + '-audio');
	if (!boxEl) throw new Error('No NoteBox element with id' + key);
	if (!audioEl) throw new Error('No audio element with id' + key + '-audio');

	// When enabled, will call this.play() and this.onClick() when clicked.
	// Otherwise, clicking has no effect.
	var enabled = true;
	// Counter of how many play calls have been made without completing.
	// Ensures that consequent plays won't prematurely remove the active class.
	var playing = 0;

	this.key = key;
	this.onClick = onClick || function () {};

	// Plays the audio associated with this NoteBox
	this.play = function () {
		playing++;
		// Always play from the beginning of the file.
		audioEl.currentTime = 0;
		audioEl.play();

		// Set active class for NOTE_DURATION time
		boxEl.classList.add('active');
		setTimeout(function () {
			playing--;
			if (!playing) {
				boxEl.classList.remove('active');
			}
		}, NOTE_DURATION);
	}

	// Enable this NoteBox
	this.enable = function () {
		enabled = true;
	}

	// Disable this NoteBox
	this.disable = function () {
		enabled = false;
	}

	// Call this NoteBox's clickHandler and play the note.
	this.clickHandler = function () {
		if (!enabled) return;

		this.onClick(this.key);
		this.play();
		
		// Easy task
		// KEYS.push(this.key);
		// console.log(KEYS);
		// isTimeoutEnabled ? clearTimeout(timeoutRef) : isTimeoutEnabled = true;
		// timeoutRef = setTimeout(createAndPlayback, 2500);

		// Challenge Task
		if (this.key == simonKeys[currentIndex]) {
			userKeys.push(this.key);
			console.log("User", userKeys);

			currentIndex++;

			if (userKeys.length == simonKeys.length) {
				setTimeout(addSimon, 1500);
				currentIndex = 0;
			}

		} else {
			console.log("Game over");
			setTimeout(restartSimon, 1500);
			userKeys.length = 0;
			currentIndex = 0;
		}

	}.bind(this)

	boxEl.addEventListener('mousedown', this.clickHandler);
}

// Example usage of NoteBox.
//
// This will create a map from key strings (i.e. 'c') to NoteBox objects so that
// clicking the corresponding boxes on the page will play the NoteBox's audio.
// It will also demonstrate programmatically playing notes by calling play directly.
var notes = {};

KEYS.forEach(function (key) {
	notes[key] = new NoteBox(key);
});

/**
 * Challenge Task
 */
var simonKeys = [];
var userKeys = [];
var currentIndex = 0;

setTimeout(addSimon, 500);

function addSimon() {
	userKeys.length = 0;
	simonKeys.push(KEYS[getRandomIndex()]);
	playSimon();
}

function playSimon() {
	console.log("Simon", simonKeys);		
	simonKeys.forEach(function(key, i) {
		setTimeout(notes[key].play.bind(null, key), i * 500);
	});
}

function restartSimon() {
	simonKeys.length = 0;
	addSimon();
}

function getRandomIndex() {
	var idx = Math.random() * 4;
	return Math.floor(idx);
}