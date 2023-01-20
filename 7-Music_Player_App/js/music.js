class Music {
    constructor(title,singer,img,file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList =[
    new Music("The Pot", "Tool","1.jpg","1.mp3"),
    new Music("Sweet Child O'Mine","Guns N Roses","2.jpg","2.mp3"),
    new Music("Here Comes The Rain Again","Hypnogaja","3.jpg","3.mp3")
];