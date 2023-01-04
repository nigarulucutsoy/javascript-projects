function Quiz(sorular) {
    this.sorular = sorular;
    this.soruIndex=0;
    this.dogruCevap=0;
}

Quiz.prototype.callQuiz= function(sorular){
    return this.sorular[this.soruIndex];
}
