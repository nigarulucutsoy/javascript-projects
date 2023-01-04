
const quiz=new Quiz(sorular);
const ui=new UI();

ui.btn_start.addEventListener("click",function(){
    ui.quiz_box.classList.add("active");
    startTimer(10)
    startTimerLine();
    soruGoster(quiz.callQuiz())
   ui.soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length)
})

ui.btn_next.addEventListener('click',function(){
    if(quiz.sorular.length!=quiz.soruIndex+1){
        ui.quiz_box.classList.add("active");
        quiz.soruIndex +=1;
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(10);
        startTimerLine();
        soruGoster(quiz.callQuiz())
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        ui.score_box.classList.add("active")
        ui.quiz_box.classList.remove("active")
        ui.skoruGoster(quiz.sorular.length,quiz.dogruCevap)
    }
    ui.soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length)
});

ui.btn_quit.addEventListener("click",function(){
    window.location.reload();
})

ui.btn_replay.addEventListener("click",function(){
    quiz.soruIndex=0;
    quiz.dogruCevap=0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
})

function soruGoster(soru){
    let question=`
    <span>${soru.soruMetni}</span>
    `;
    let options=``;
    for(let s in soru.cevapSecenekleri){
        options+=`
        <div class="option">
            <span><b>${s}</b>:${soru.cevapSecenekleri[s]}</span>
        </div>
        `;
    }
    
    ui.question_text.innerHTML=question;
    ui.option_list.innerHTML=options;
    let option_dom=ui.option_list.querySelectorAll('.option');
    for(let op of option_dom){
        op.addEventListener('click',function(){
        clearInterval(counter);
        clearInterval(counterLine);
        let cevap=op.querySelector("span b").textContent;
        let soru=quiz.callQuiz();
        if(soru.cevabiKontrolEt(cevap)){
            op.classList.add("correct");
            quiz.dogruCevap+=1;
            op.insertAdjacentHTML("beforeend",ui.correctIcon);
        }else{
            op.classList.add("incorrect");
            op.insertAdjacentHTML("beforeend",ui.incorrectIcon);
        }

        for(let i=0; i<ui.option_list.children.length;i++){
            ui.option_list.children[i].classList.add("disabled")
            ui.btn_next.classList.add("activebtn")
        }
        })
        ui.btn_next.classList.remove("activebtn")
    }
}
let counter;
function startTimer(time){
   counter= setInterval(timer,1000);

    function timer(){
        ui.time_text.textContent="Kalan Süre:";
        ui.time_second.textContent= time;
        time--;
        if(time <0){
            clearInterval(counter);

            ui.time_text.textContent="Süre Bitti";
            let cevap=quiz.callQuiz().dogruCevap;
            for(let option of ui.option_list.children){
                if(option.querySelector("span b").textContent==cevap){
                    option.classList.add("correct")
                    option.insertAdjacentHTML("beforeend",ui.correctIcon);
                }
                option.classList.add("disabled")
            }
            ui.btn_next.classList.add("activebtn")
        }
    }
}
let counterLine;
function startTimerLine(){
    let line_width=0;
   counterLine= setInterval(timer,20);

    function timer(){
        line_width+=1;
        ui.time_line.style.width=line_width+"px";
        if(line_width>548){
            clearInterval(counterLine)
        }
    }
}
