function UI(){
    this.btn_start = document.querySelector(".btn-start"),
    this.btn_next = document.querySelector('.next-btn'),
    this.btn_replay =document.querySelector('.btn_replay'),
    this.btn_quit =document.querySelector('.btn_quit'),
    this.quiz_box = document.querySelector(".quiz_box"),
    this.score_box=document.querySelector(".score_box"),
    this.question_text=document.querySelector('.question-text'),
    this.option_list= document.querySelector('.option_list'),
    this.correctIcon='<div class="icon"><i class="fas fa-check"></i></div>',
    this.incorrectIcon='<div class="icon"><i class="fas fa-times"></i></div>',
    this.question_index=document.querySelector('.question_index')
    this.time_text=document.querySelector(".time_text"),
    this.time_second=document.querySelector(".time_second"),
    this.time_line=document.querySelector(".time_line")
}


UI.prototype.soruSayisiniGoster= function(soruSirasi, toplamSoru){
    let tag=` <span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
    ui.question_index.innerHTML=tag;
}

UI.prototype.skoruGoster =function(toplamSoru,dogruCevap) {
    let tag =`Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
    document.querySelector(".score_box .score_text").innerHTML= tag;
}