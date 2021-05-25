
let minusBtn = document.querySelector('#minus'); 
let plusBtn = document.querySelector('#plus');
let heartBtn = document.querySelector('#heart');
let pauseBtn = document.querySelector('#pause');
let counter = document.querySelector('#counter');
let likesList = document.querySelector(".likes")
let commentSection = document.querySelector('#comment-form');

let interval = startTimer();
let isPlaying = true;




function decrementCounter() {
   let counterVal = parseInt(counter.innerText);
   counter.innerText = (counterVal - 1).toString();
}

function incrementCounter() {
   let counterVal = parseInt(counter.innerText);
   counter.innerText = (counterVal + 1).toString();
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
