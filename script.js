const playerContainer = document.getElementById('player-container');

const image = document.getElementById('image');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.getElementById('music');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let isPlaying = false;

// Array of song objects
const songs = [
    { "name":"jacinto-1", "displayName":"Electric Chill Machine", "artist":"Jacinto" },
    { "name":"jacinto-2", "displayName":"Seven Nation Army (Remix)", "artist":"Jacinto" },
    { "name":"jacinto-3", "displayName":"Goodnight, Disco Queen", "artist":"Jacinto" },
    { "name":"metric-1", "displayName":"Front Row (Remix)", "artist":"Metric" }
];

// Selecting song from array
let songIndex = 0;

// Load selected song
loadSong(songs[songIndex]);

// Update DOM
function loadSong(song) {
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Event Listener: playBtn to pause or play
playBtn.addEventListener('click', () => {
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Play 
function playSong() {
    isPlaying = true;
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    music.pause();
}

// Event Listeners: Progress Bar
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('timeupdate', updateProgressBar);

// Set Progress Bar
function setProgressBar(e) {
    let width = this.clientWidth;
    // shows total width
    console.log(width);
    let clickX = e.offsetX;
    let duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}

// Update Progress Bar
function updateProgressBar(e) {
    let { duration, currentTime } = e.srcElement;
    console.log(duration, currentTime);
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}