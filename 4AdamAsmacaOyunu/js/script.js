const word_el= document.getElementById('word')
const popup=document.querySelector('#popup-container')
const message_el=document.querySelector('#success-message')
const wrongLetters_el =document.querySelector("#wrong-letters")
const popup_class=document.querySelector('.popup')
const items =document.querySelectorAll('.item')
const message=document.querySelector('#message')
const playAgainBtn=document.querySelector('#play-again')
 const correctLetters=[]
 const wrong_letters=[]
 let selectedWord= getRandomWord(); //bu kısımda rastgele gelecek kelimeyi bir değere atadık.

// Random kelime üretme fonksiyonu oluşturuldu.
function getRandomWord(){
    const words=["javascript","java","python","css","html","flutter","react","angular"];
    return words[Math.floor(Math.random()*words.length)]
}

function displayWord(){
    
    word_el.innerHTML=`
    ${selectedWord.split('').map(letter=>`
        <div class="letter">
            ${correctLetters.includes(letter) ? letter :''} 
        </div>
    `).join('')}

    `;

    const w= word_el.innerText.replace(/\n/g,'') //word_el içerisinde ki harfleri yanyana yazdırmamızı sağlar. her boşluk gördügünde (g harfi olmasaydı ilk gördüğü boşlukta dururdu) '' ile değiştiricek yani silecektir.
    if(w===selectedWord){
        popup.style.display="flex"
        message_el.innerText="Tebrikler kazandınız."
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML=`
        ${wrong_letters.length>0 ? `<h3>Hatalı Harfler</h3>`: ''}
        ${wrong_letters.map(letter=>
            `
           <span> ${letter}</span>
                `)}
    `;

    items.forEach((item,index)=>{
        const errorCount = wrong_letters.length;
        if(index<errorCount){
            item.style.display='block';
        }else {
            item.style.display='none'
        }
    })
    if(wrong_letters.length>=items.length){
        popup.style.display="flex"
        message_el.innerText="Maalesef kaybettiniz."
        popup_class.style.backgroundColor="red"
    }
}

function displayMessage(){
    message.style.display="flex"
    

    setTimeout(function(){
        message.style.display="none"
    }, 1000)
}

window.addEventListener('keydown',function(e){
    if(e.keyCode>=65 && e.keyCode <=90){
        const letter =e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord();
            }else{
                displayMessage()
            }
        }else{
            if(!wrong_letters.includes(letter)){
                wrong_letters.push(letter)
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }
})

playAgainBtn.addEventListener('click',function(){
    correctLetters.splice(0);
    wrong_letters.splice(0);
    popup.style.display='none';
    selectedWord=getRandomWord()
    displayWord();
    updateWrongLetters();
})

displayWord()