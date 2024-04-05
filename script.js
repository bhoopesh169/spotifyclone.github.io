document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Spotify");

    let songIndex = 0;
    let audioElement = new Audio('songs/1.mp3');
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myProgressBar');
    let gif = document.getElementById('gif');
    let masterSongName = document.getElementById('masterSongName');
    let songItems = Array.from(document.getElementsByClassName('songItem'));

    let songs = [
        {songName: "Familiar", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
        {songName: "Say My Name", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
        {songName: "Angels In Tibet", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"}
    ];

    songItems.forEach((element, i) => { 
        element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    });

    masterPlay.addEventListener('click', () => {
        if(audioElement.paused || audioElement.currentTime <= 0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    });

    audioElement.addEventListener('timeupdate', () => { 
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
        myProgressBar.value = progress;
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

    songItems.forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filepath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        });
    });
});
