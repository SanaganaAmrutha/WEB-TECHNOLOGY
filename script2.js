// script.js

let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerHTML = 'Pause';
        startStopBtn.style.backgroundColor = '#ffc107';
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startStopBtn.innerHTML = 'Start';
        startStopBtn.style.backgroundColor = '#28a745';
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerHTML = '00:00:00';
    running = false;
    startStopBtn.innerHTML = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    difference = 0;
    savedTime = 0;
    lapsList.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = (savedTime || 0) + (updatedTime - startTime);

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function recordLap() {
    const lapTime = display.innerHTML;
    const lapItem = document.createElement('li');
    lapItem.innerText = lapTime;
    lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

