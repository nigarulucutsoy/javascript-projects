const username= document.querySelector('#username')
const email= document.querySelector('#email')
const password= document.querySelector('#password')
const repassword= document.querySelector('#repassword')
const phone=document.querySelector('#phone')

function error(item, message){
    item.classList.add("is-invalid")
    item.nextElementSibling.classList.add("invalid-feedback")
    item.nextElementSibling.innerHTML=message
}

function success(item){
    item.classList.add("is-valid")
}

function checkEmal(input){
    const re=  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(input.value)){
        success(input)
    }else{
        error(input,"email düzgün formatta değil")
    }
  };

  function checkRequied(inputs){
  inputs.forEach(function(input){
    if(input.value===""){
        error(input,`${input.id} is requied`)
    }else{
        success(input)
    }
  })
  }

  function checkLenght(input,min,max){
    if(input.value.length < min){
        error(input,`${input.id} en az ${min} karakterli olmalıdır.`)
    }else if(input.value.length>max){
        error(input,`${input.id} en fazla ${max} karakterli olmalıdır.`)
    }
    else{
        success(input)
    }
  }

  function checkPassword(input1,input2){
    if(input1.value===input2.value){
        success(input2)
    }else{
        error(input2,"Parolalar uyuşmuyor.")
    }
  }

  function checkPhone(input){
    var exp= /^\d{10}$/;

    if(!exp.test(input.value)){
        error(input,"telefon no uygun giriniz")
  }
  }

document.querySelector('.btn').addEventListener('click',function(e){
    e.preventDefault();

    checkRequied([username,email,password,repassword,phone])
    checkEmal(email)
    checkLenght(username,7,12)
    checkPassword(password,repassword)
    checkPhone(phone)
})