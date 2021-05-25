

let minusBtn = document.querySelector('#minus'); 
let plusBtn = document.querySelector('#plus');
let heartBtn = document.querySelector('#heart');
let pauseBtn = document.querySelector('#pause');
let counter = document.querySelector('#counter');
let likesList = document.querySelector(".likes")
let commentSection = document.querySelector('#comment-form');

let numbersBtn = document.querySelector('#numbers'); 
let asciiBtn = document.querySelector('#ascii');
let romanBtn = document.querySelector('#roman');

let interval = startTimer();
let isPlaying = true;



let countNumber = true;
let countAscii = false;
let countRoman = false;
let currentMode = "numbers";

function selectMode() {
  mode = this.innerText
  let previousMode = currentMode;
  if(mode === "numbers") {
    countNumber = true;
    countAscii = false;
    countRoman = false;
    numbersBtn.disabled = true;
    asciiBtn.disabled = false;
    romanBtn.disabled = false;
    counter.innerText = convertToNumber(previousMode);
    currentMode = "numbers" ;
    

  } else if (mode === "ascii") {
    countNumber = false;
    countAscii = true;
    countRoman = false;
    numbersBtn.disabled = false;
    asciiBtn.disabled = true;
    romanBtn.disabled = false;
    counter.innerText = convertToAscii(previousMode);
    currentMode = "ascii"

  } else if (mode === "roman") {
    countNumber = false;
    countAscii = false;
    countRoman = true;
    numbersBtn.disabled = false;
    asciiBtn.disabled = false;
    romanBtn.disabled = true;
    counter.innerText = convertToRoman(previousMode);
    currentMode = "roman"

  }
}


function decrementCounter() {
   let counterVal = parseInt(counter.innerText);
   counter.innerText = (counterVal - 1).toString();
   
}

function incrementCounter() {
  
   if(countNumber) {
     incrementNumber()
   } else if(countAscii) {
     incrementAscii();
   } else if (countRoman) {
     incrementRoman();
   }
}

function incrementNumber() {
  let counterVal = parseInt(counter.innerText);
  counter.innerText = (counterVal + 1).toString();
}

function incrementAscii() {
  let counterVal = counter.innerText.charCodeAt(0);
  counterVal++;
  counter.innerText = String.fromCharCode(counterVal);
}

function incrementRoman() {
  let counterVal = convertRomanToNumber(counter.innerText)
  counterVal++;
  counter.innerText = convertNumberToRoman(counterVal);
}

function convertToNumber(mode) {
  if(mode === "ascii") {
    return counter.innerText.charCodeAt(0)
  } else if (mode === "roman") {
    return convertRomanToNumber(counter.innerText)
  }
}

function convertToAscii(mode) {
  if(mode === "numbers") {
    return String.fromCharCode(parseInt(counter.innerText));
  }
  else if (mode === "roman") {
    let num = convertRomanToNumber(counter.innerText);
    return String.fromCharCode(num);
  }
}

function convertToRoman(mode) {
  let num
  if(mode === "numbers") {
    num = parseInt(counter.innerText)
  }
  if(mode === "ascii") {
    num = counter.innerText.charCodeAt(0);
  }
  return convertNumberToRoman(num);
}


function startTimer () {
   return setInterval(incrementCounter, 1000);
 };

function addLike() {
   let likesList = document.querySelector('.likes')
   let counterVal = counter.innerText
   let child;
   let currentLike = document.querySelector(`#like${counterVal}`);
   if(currentLike === null){
      child = document.createElement("li");
      child.setAttribute("id", `like${counterVal}`);
      child.innerHTML = `${counterVal} has been liked <span>1</span> time.`;
      likesList.appendChild(child);
   } else {
      
      let likesCount = currentLike.children[0].innerText
      likesCount = parseInt(likesCount);
      likesCount++;
      currentLike.innerHTML = `${counterVal} has been liked <span>${likesCount}</span> times.` ;
   }
}

function disableButton(btn) {
   if (btn.id !== "pause") {
      btn.disabled = !isPlaying;
   }
}

function toggleButtons() {
   let buttonList = document.querySelectorAll('button')
   buttonList.forEach(btn => disableButton(btn))
}

function pause () {
   if(isPlaying) {
      isPlaying = false;
      clearInterval(interval);
      pauseBtn.innerText = "resume";
   } else {
      isPlaying = true;
      interval = startTimer();
      pauseBtn.innerText = "pause";
   }
   toggleButtons()
}

function addComment(event) {
   event.preventDefault();
    let input = this.children[0];
   
    let commentText = input.value;
    
    input.value = "";
    let commentSection = document.querySelector(".comments");
    let newComment = document.createElement("p");
    newComment.innerText = commentText;
    commentSection.appendChild(newComment);
}



minusBtn.addEventListener('click', decrementCounter);
plusBtn.addEventListener('click', incrementCounter);
heartBtn.addEventListener('click', addLike);
pauseBtn.addEventListener('click', pause);
commentSection.addEventListener('submit', addComment);

numbersBtn.addEventListener('click', selectMode); 
asciiBtn.addEventListener('click', selectMode);
romanBtn.addEventListener('click', selectMode);

function convertNumberToRoman(num) {
  if (num < 1 || num >= 5000 || num % 1 !== 0) {
    throw new UserException("Invalid Number");
  }
  const ROMAN_TENS = ["M", "C", "X", "I"];
  const ROMAN_FIVES = ["E", "D", "L", "V"];
  const NUM_ARR_SIZE = 4;
  let resultArr = [];
  let numArr = num.toString().split("");
  while (numArr.length < NUM_ARR_SIZE) {
    numArr.unshift("0");
  }
  for (let i = 0; i < NUM_ARR_SIZE; i++) {
    let digit = parseInt(numArr[i]);
    if (digit == 9) {
      resultArr.push(ROMAN_TENS[i]);
      resultArr.push(ROMAN_TENS[i - 1]);
      continue;
    } else if (digit == 4 && i > 0) {
      resultArr.push(ROMAN_TENS[i]);
      resultArr.push(ROMAN_FIVES[i]);
      continue;
    }
    if (digit >= 5) {
      resultArr.push(ROMAN_FIVES[i]);
      digit -= 5;
    }
    while (digit > 0) {
      resultArr.push(ROMAN_TENS[i]);
      digit--;
    }
  }
  return resultArr.join("");
}

function convertRomanToNumber (roman) {
  const ROMAN_NUMS = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  const ARABIC_NUMS = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let total = 0;
  let romanIndex = 0;
  for(let i = 0; i < roman.length; i++) {
    if(i < (roman.length - 1)){
      romanIndex = ROMAN_NUMS.indexOf(roman[i] + roman[i+1]);
      if(romanIndex >= 0) {
        total += ARABIC_NUMS [romanIndex];
        i++;
      } else {
        romanIndex = ROMAN_NUMS.indexOf(roman[i])
        total += ARABIC_NUMS [romanIndex];
      }
    } else {
      romanIndex = ROMAN_NUMS.indexOf(roman[i])
      total += ARABIC_NUMS [romanIndex];
    }
  }
  return total;
}