const playerContainer = document.getElementById('player-container');
const image = document.getElementById('image');
const track = document.getElementById('track');
const artist = document.getElementById('artist');
const music = document.getElementById('music');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let isPlaying = false;

// Music
const songs = [
    { "name":"jacinto-1", "displayName":"Electric Chill Machine", "artist":"Jacinto Design" },
    { "name":"jacinto-2", "displayName":"Seven Nation Army (Remix)", "artist":"Jacinto Design" },
    { "name":"jacinto-3", "displayName":"Goodnight, Disco Queen", "artist":"Jacinto Design" },
    { "name":"metric-1", "displayName":"Front Row (Remix)", "artist":"Metric/Jacinto Design" }
];

// Selecting Song
let songIndex = 0;

// Load Selected Song
loadSong(songs[songIndex]);

// Update DOM
function loadSong(song) {
    track.innerText = song.displayName;
    artist.innerText = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Play or Pause Event Listener
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
    playBtn.innerHTML = `<i class="fas fa-pause main-button" title="Pause"></i>`
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = `<i class="fas fa-play main-button" title="Play"></i>`
    music.pause();
}

// Set Progress Bar
progressContainer.addEventListener('click', setProgressBar);
function setProgressBar(e) {
    let width = this.clientWidth;
    // shows total width
    // console.log(width);
    let clickX = e.offsetX;
    let duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}

// Update Progress Bar & Time
music.addEventListener('timeupdate', updateProgressBar);
function updateProgressBar(e) {
    if (isPlaying) {
        let { duration, currentTime } = e.srcElement;
        //console.log(duration, currentTime);

        // Calculate display for duration
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = '0' + durationSeconds;
        } 
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.innerText = `${durationMinutes}:${durationSeconds}`
        }
        // Calculate display for currentTime
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = '0' + currentSeconds;
        } 
        currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`
        // Update progress bar width
        let progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

// Previous Song
prevBtn.addEventListener('click', prevSong);
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
nextBtn.addEventListener('click', nextSong);
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Play next song when current finishes
music.addEventListener('ended', nextSong);