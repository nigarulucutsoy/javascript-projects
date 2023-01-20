const container =document.querySelector('.container');
const image = document.querySelector('#music-image');
const title= document.querySelector('#music-details .title');
const singer= document.querySelector('#music-details .singer');
const prev= document.querySelector('#controls #prev');
const play= document.querySelector('#controls #play');
const next= document.querySelector('#controls #next');
const duration =document.querySelector('#duration');
const currentTime=document.querySelector('#current-time');
const progressBar=document.querySelector('#progress-bar');
const volume=document.querySelector('#volume');
const volumeBar=document.querySelector('#volume-bar');
const ulDom=document.querySelector('ul');
const player= new MusicPlayer(musicList);
let music= player.getMusic();

window.addEventListener("load",()=>{
    let music =player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});

function displayMusic(music){
    title.innerHTML=music.title;
    singer.innerHTML=music.singer;
    image.src="img/"+ music.img;
    audio.src="mp3/" + music.file;
}

play.addEventListener("click",()=>{
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic(): playMusic();
});

prev.addEventListener("click",()=>{
   prevMusic();
});

next.addEventListener("click",()=>{
    nextMusic();
 });

function prevMusic(){
    player.prev();
    let music= player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}
function playMusic(){
 
    container.classList.add("playing");
    play.querySelector("i").classList="fa-solid fa-pause";
    audio.play();
};

function pauseMusic(){

    container.classList.remove("playing");
    play.querySelector("i").classList="fa-solid fa-play";
    audio.pause();
}
const calculateTime = (toplamSaniye)=>{
    const dakika=Math.floor(toplamSaniye/60);
    const saniye= Math.floor(toplamSaniye%60);
    const guncellenenSaniye=saniye<10 ? `0${saniye}`:`${saniye}`;
    const sonuc =`${dakika}:${guncellenenSaniye}`;
    return sonuc;
}
audio.addEventListener("loadedmetadata",()=>{
    duration.textContent=calculateTime(audio.duration);
    progressBar.max=Math.floor(audio.duration);

});

audio.addEventListener("timeupdate",()=>{
    progressBar.value=Math.floor(audio.currentTime);
    currentTime.textContent=calculateTime(progressBar.value);
});

progressBar.addEventListener("input",()=>{
    currentTime.textContent=calculateTime(progressBar.value);
    audio.currentTime=progressBar.value;
})

let sesDurumu="sesli"
volume.addEventListener("click",()=>{
    if(sesDurumu=="sesli"){
        audio.muted=true;
        volumeBar.value=0;
        volume.classList="fa-solid fa-volume-xmark";
        sesDurumu="sessiz";
    }else{
        audio.muted=false;
        volumeBar.value=100;
        volume.classList="fa-solid fa-volume-high";
        sesDurumu="sesli";
    }
})

volumeBar.addEventListener("input",(e)=>{
    const value=e.target.value;
    audio.volume=value/100;
    console.log(value);
    if(value==0){
        audio.muted=true;
        volumeBar.value=0;
        volume.classList="fa-solid fa-volume-xmark";
    }else{
        audio.muted=false;
        volume.classList="fa-solid fa-volume-high";
    }
});

const displayMusicList= (list)=>{
    for(let i=0;i<list.length;i++){
        let liTag=`
            <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;
        
        ulDom.insertAdjacentHTML("beforeend",liTag)
        
        let liAudioDuration = ulDom.querySelector(`#music-${i}`);
        let liAudioTag = ulDom.querySelector(`.music-${i}`);
        
        liAudioTag.addEventListener("loadeddata",()=>{
            liAudioDuration.innerText=calculateTime(liAudioTag.duration)
        })
    }
};

const selectedMusic =(li)=>{
    player.index= li.getAttribute("li-index");
  
     displayMusic(player.getMusic())
     playMusic();
     isPlayingNow();
}

const isPlayingNow=()=>{
    for(let li of ulDom.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index")==player.index){
            li.classList.add("playing");
        }
    }
};

audio.addEventListener("ended",()=>{
    nextMusic();
})
