const inputSlider=document.querySelector("[data-lengthSlider]");
const displayNum=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercase=document.querySelector("#uppercase");
const lowercase=document.querySelector("#lowercase");
const number=document.querySelector("#number");
const symbol=document.querySelector("#symbol");
const generation=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='-_=.?/><\{}[]()*-+,&^%$#@!~';
const indicator=document.querySelector("[strength-indicator]");

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");
// set password
function handleSlider(){
    inputSlider.value=passwordLength;
    displayNum.innerText=passwordLength;
     const min=inputSlider.min;
     const max=inputSlider.max;
     inputSlider.style.backgroundSize =((passwordLength-min)*100/(max-min)) +"% 100%" 
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;

}
function getRndInteger(min , max){
    return Math.floor(Math.random() * (max-min)) + min;
}
function getRandomInteger(){
    return getRndInteger(0,9);
}
function getLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function getUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function getSymbol(){
    const randNum= getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
let upper=false;
let lower=false;
let sym=false;
let num=false;
if(uppercase.checked) upper=true;
if(lowercase.checked) lower=true;
if(number.checked) num=true;
if(symbol.checked) sym=true;

if(upper && lower &&(num||sym) && passwordLength>=8){
    setIndicator("#0f0");
}
else if( 
    (upper || lower) &&
    (num || sym) &&
    passwordLength>=6
) {
    setIndicator("#ff0");
}
else{
    setIndicator("#f00");
}

}
function handleCheckbox(){
    checkCount=0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

};

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckbox)

})



async function copyContent(){
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed"
    }

    // to make copied text visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

inputSlider.addEventListener('input', (e) =>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generation.addEventListener('click',() => {
    if(checkCount==0)
    return;
   
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    
//New Password
  password="";

  let funcArr=[];
  if(uppercase.checked){
    funcArr.push(getUpperCase);
  }
  if(lowercase.checked){
    funcArr.push(getLowerCase);
  }
  if(number.checked){
    funcArr.push(getRandomInteger);
  }
  if(symbol.checked){
    funcArr.push(getSymbol);
  }
   //compulsory addition
  for(let i=0;i<funcArr.length;i++){
    password +=funcArr[i]();
  }

  //remaing addition
   for(let i=0; i< passwordLength-funcArr.length; i++){
      let randIndex = getRndInteger(0,funcArr.length);
      password+=funcArr[randIndex]();
   }

   passwordDisplay.value=password;
   calcStrength();

})



