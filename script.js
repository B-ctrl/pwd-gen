//Creating DOM files for html

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = { 
    lower: getRandomLower, 
    upper: getRandomUpper, 
    number: getRandomNumber, 
    symbol: getRandomSymbol }

//adding Event Listeners

generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    console.log(length, hasUpper, hasLower, hasNumber, hasSymbol);

    // validate length of password
    if (isNaN(length) || length < 8 || length > 128) {
        window.alert("Requested password length not within guidelines!");
      } 
    else{
        resultEl.innerText = generatePassword(hasUpper, hasLower, 
            hasNumber, hasSymbol, length);
        }
});


clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) { return; }

    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});


//adding function codes

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item =>Object.values(item)[0]);

    console.log('types of arrays: ', typesArr);

    if(typesCount === 0) {
        window.alert("You must select at least one element to construct the password!");
        return '';
    }

    //looping
    for(let i=0; i<length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
                console.log('funcName: ',funcName);
            generatedPassword += randomFunc[funcName]();
        });}
    console.log(generatedPassword);

    const finalPassword = generatedPassword.slice(0,length);
    
    console.log(finalPassword);

    return finalPassword;


}





// create the password options   
const lowerCase = "abcdefghijklmnopqrstuvwxyz";  // creates the lowercase alphabet options
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  // creates the uppercase alphabet options
const special = "!@#$%^&*()_+{}|:<>?-=[]\;,./";  // creates the special character options
const num = "0123456789";  // creates the number options


function getRandomUpper() {
    return upperCase[Math.floor(Math.random() * upperCase.length )];
}

function getRandomLower() {
    return lowerCase[Math.floor(Math.random() * lowerCase.length )];
}

function getRandomNumber() {
    return num[Math.floor(Math.random() * num.length )];
}

function getRandomSymbol() {
    return special[Math.floor(Math.random() * special.length )];
}