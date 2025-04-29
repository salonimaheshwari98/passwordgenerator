const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");//saarey checkboxes aajayenge
const symbols = '~!@#$%^&*()_+}{:"?></?.,';//string of random symbols

let password = " ";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//set circle colour to grey
setIndicator("#ccc");
// these are the starting values of the java script

//will set the passwordlength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //this function will display the password length into the UI
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=( (passwordLength - min) * 100 / ( max - min ) )+"% 100%";
//heigth toh pura 100% lega and width formula k basis peh lega
//this is helping ki jbh bhi hum slider ko move karey toh utna hi part coloured rahe
// jitna ki slide kiya haai and ismein hum range k around percentage find karahe h
console.log(( (passwordLength - min) * 100 / ( max - min ) )+"% 100%")

}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    //math.random will give value from 0 to 1(exclusive) then *(max-min) will give 0 to max-min to roundoff floor is used and min is added to give value from min to max 

}
function generateRandomNumber() {
    return getRndInteger(0, 9)
}
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));//97 is ascii value of 'a' and 123 is of z here string.from..code is used to convert the integer 
    //generated into the character
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));//65 of 'A' and 91 of'Z'
}
function generateSymbol() {
    const ranNum = getRndInteger(0, symbols.length);
    return symbols.charAt(ranNum);//charAt is the function that will return character present at that index

}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
    if (hasUpper && hasLower && (hasNum || hasSym && passwordLength >= 8)) {
        setIndicator("#0f0");
    }
    else if (
        (hasLower || hasUpper) &&
        (hasSym || hasNum) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0")

    }
    else {
        setIndicator("#f00");
    }
    //if .checked property is used to check if we have checked the check box and yeh agar true aati hain toh check  box ticked hain warna nhi

}

async function copyContent(){
    // navigator.clipboard.writeText - it will return promise and copied text only shown if copied and for this we use awit
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
   // jb tak upr wali line chal nhi jayegi tb tk niche wali line nhi chlegi
    copyMsg.innerText = "copied";// this will goes to span tang of copy msg
  } catch(e){
        copyMsg.innerText = "failed";
  }
  // to make copy wala span visible
  copyMsg.classList.add("active");
  // and to make invisible after 2 sec

  setTimeout(() =>{
    copyMsg.classList.remove("active");
  }, 2000);
    
}
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
         copyContent();
    }
});
// adding event listener to all the check boxes
// since the password will only be generated if anyone checkbox is clicked so we will have to count the checkboxes checkedd and then we can monitor the changes

function shufflePassword(array) {
    //fisher vates method
    for (let i = array.length - 1; i > 0; i--) {
        //random j is found using this function
        const j = Math.floor(Math.random() * (i + 1));
        //swapping is done between i and j
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    //now the element in the password array is added into the string
    let str = "";
    array.forEach((el) => (str += el));
    return str;
   
}

function handleCheckboxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++
    });
    //special condition that says agar ek hi checkbox checked h fir bhi 4 length ka password generate hoga hi
    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()
    }
}
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange)
    //this function will monitor the change made on the checkboxes and call the handle checkbox change
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})//event listener lagaya hain slider peh 

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)//agar value hain clipboard peh tbhi copy hoga
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkboxes are checked
    if (checkCount <= 0)
        return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()
    }
    //finding the new password


    //to find the new password we will have to remove the old password first
    password = ""

    //putting the stuff asked by the checkbox that is we will make sure that the one which is checked is included
    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if (lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if (symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    // if (numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }


    //to generate the password randomly we are pushing the checkboxes checked into the funcarr


    let funcArr = [];

    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);

    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber);


    // compulsory addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    //remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length)
        password += funcArr[randIndex]();
    }
   

    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show in ui
    passwordDisplay.value = password;

    //calculateStrength
    calcStrength();


});


