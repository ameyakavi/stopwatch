const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");
const lap_btn = document.getElementById("lap");
const lapsContainer = document.querySelector('.laps-container');

let seconds = 0;
let interval = null;
let lapCount = 1;
let hrs = 0;
let mins = 0;
let secs = 0;

// Event listeners
start_btn.addEventListener('click', start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);
lap_btn.addEventListener("click", lap);

// Update the timer
function timer() {
    seconds++;

    // Format our time
     hrs = Math.floor(seconds / 3600);
     mins = Math.floor((seconds - (hrs * 3600)) / 60);
     secs = seconds % 60;

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = "0" + mins;
    if (hrs < 10) hrs = "0" + hrs;

    time_el.innerText = `${hrs}:${mins}:${secs}`;
}

function start() {
    if (interval) {
        return;
    }

    interval = setInterval(timer, 1000);
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    seconds = 0;
    time_el.innerText = '00:00:00';
    lapsContainer.innerHTML = ''; // Clear laps when resetting
    lapCount = 1;
}

function lap() {
    const lapTime = `${padZero(hrs)}:${padZero(mins)}:${padZero(secs)}`;
    const lapItem = document.createElement('h1');
    lapItem.classList.add('lap-item');
    lapItem.innerHTML = `Lap ${lapCount}: ${lapTime}`;
	lapsContainer.appendChild(lapItem);
    lapCount++;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}
