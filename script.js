console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Timer Display Elements
let currentTimeDisplay = document.getElementById('currentTime');
let totalDurationDisplay = document.getElementById('totalDuration');

// Songs Array with Descriptions
let songs = [
    {songName: "Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", description: "An energetic track with a powerful melody that uplifts and motivates."},
    {songName: "Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", description: "A melodic and soothing track that blends traditional elements with modern beats."},
    {songName: "Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", description: "An inspiring track with an epic build-up and powerful vocals that convey strength."},
    {songName: "My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", description: "A heartwarming song with emotional lyrics and a soothing melody."},
    {songName: "Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", description: "A high-energy track that captures the spirit of celebration and triumph."},
    {songName: "PIRATES", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", description: "A lively song with a pirate theme, combining adventure and excitement."},
    {songName: "Aasa Kooda", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", description: "A traditional song with a contemporary twist, featuring engaging rhythms."},
    {songName: "Kallu Kalia", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", description: "A vibrant track with catchy beats and an energetic vibe."},
    {songName: "Wake Up To Reality", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", description: "A motivational track with a powerful message and uplifting tempo."},
    {songName: "Armadham", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", description: "An intense track with strong beats and a dramatic feel."},
    {songName: "Thurupu Cheetu", filePath: "songs/11.mp3", coverPath: "covers/11.jpg", description: "A dynamic song with a blend of fast rhythms and engaging lyrics."},
    {songName: "Chuttamalle", filePath: "songs/12.mp3", coverPath: "covers/12.jpg", description: "A melodious track with a smooth flow and charming vocals."},
    {songName: "Ninage Naanu Nanage Neenu", filePath: "songs/13.mp3", coverPath: "covers/13.jpg", description: "A romantic song with heartfelt lyrics and a soothing melody."},
    {songName: "Illuminati", filePath: "songs/14.mp3", coverPath: "covers/14.jpg", description: "A mysterious track with a dark and intriguing atmosphere."},
    {songName: "Krishnam Pranaya Sakhi", filePath: "songs/15.mp3", coverPath: "covers/15.jpg", description: "A devotional song with a serene and spiritual tone."},
    {songName: "Belakina Kavithe", filePath: "songs/16.mp3", coverPath: "covers/16.jpg", description: "A poetic track with beautiful lyrics and an evocative melody."}
];

// Update the song items in the DOM
songItems.forEach((element, i) => {
    if (i < songs.length) {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 

        // Add click event to display song descriptions
        element.addEventListener('click', () => {
            const descriptionElement = document.getElementById('songDescription');
            descriptionElement.innerHTML = `<h3>${songs[i].songName}</h3><p>${songs[i].description}</p>`;
        });
    } else {
        element.style.display = "none"; // Hide extra song items if there are more items in the DOM than songs
    }
});

// Function to format time in mm:ss
const formatTime = (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return minutes + ':' + seconds;
};

// Update the timer display
const updateTimer = () => {
    let currentTime = audioElement.currentTime;
    currentTimeDisplay.innerText = formatTime(currentTime);
    let duration = audioElement.duration;
    totalDurationDisplay.innerText = formatTime(duration);
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
    updateTimer();
});

audioElement.addEventListener('loadeddata', () => {
    updateTimer();
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
