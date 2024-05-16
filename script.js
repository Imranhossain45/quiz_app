const myBtn = document.querySelector('.myBtn button');
const rulesBox = document.querySelector('.rulesBox');
const exitBtn = document.querySelector('.rulesBtn .exitBtn');
const contnueBtn = document.querySelector('.rulesBtn .contnueBtn');
const questions = document.querySelector('.questions');
const nextBtn = document.querySelector('.nextBtn');
const timeCount = document.querySelector(".timeCount .seconds");
const timeLine = document.querySelector(".questionHeader .timeLine");
const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".restart1");
const quit_quiz = document.querySelector(".quit");
const myOptions = document.querySelector('.myOptions');

myBtn.onclick = () => {
  rulesBox.classList.add('activeInfo');
}
exitBtn.onclick = () => {
  rulesBox.classList.remove('activeInfo');
}

contnueBtn.onclick = () => {
  rulesBox.classList.remove('activeInfo');
  questions.classList.add('activeQuiz');
  showQuestions(0);
  startTimer(15);
  startTimerLine(0);
}
quit_quiz.onclick = () => {
  window.location.reload();
}
restart_quiz.onclick = () => {
  let que_count = 0;
  let counter;
  let timeValue = 15;
  let counterLine;
  let widthValue = 0;
  que_count++;
  showQuestions(que_count);
  clearInterval(counter);
  startTimer(timeValue);

  clearInterval(counterLine);
  startTimerLine(widthValue);

  nextBtn.style.display = "none";
}
let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

nextBtn.onclick = () => {
  if (que_count < questnsArr.length - 1) {
    que_count++;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);

    clearInterval(counterLine);
    startTimerLine(widthValue);

    nextBtn.style.display = "none";
  } else {
    console.log("You Have complete your task");
    showResultBox();
  }
}

function showQuestions(index) {
  const que_text = document.querySelector('.text');
  
  const total_que = document.querySelector('.total_que');
  const myOptions_tag = `<div class="options">
                        <span>${questnsArr[index].options[0]}</span>
					              </div>
                        <div class="options">
                        <span>${questnsArr[index].options[1]}</span>
					              </div>
                        <div class="options">
                        <span>${questnsArr[index].options[2]}</span>
					              </div>
                        <div class="options">
                        <span>${questnsArr[index].options[3]}</span>
					              </div>
                        `;

  let que_tag = "<span>" + questnsArr[index].number + '.' + questnsArr[index].question + "</span>";
  let total_que_tag = `<p>${questnsArr[index].number} of 5 questions</p>`
  que_text.innerHTML = que_tag;
  myOptions.innerHTML = myOptions_tag;
  total_que.innerHTML = total_que_tag;

  const option = myOptions.querySelectorAll('.options');
  for (let i =0 ; i < option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
let tickIcon = `<div class="tick icon"><i class="fa-solid fa-circle-check"></i></div>`;
let crossIcon = `<div class="cross icon"><i class="fa-solid fa-circle-xmark"></i></div>`

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent.trim();
  let correctAns = questnsArr[que_count].answer.trim();
  let allOptions = myOptions.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon)
    for (i = 0; i < allOptions;i++){
      if (myOptions.children[i].textContent.trim() == correctAns) {
        myOptions.children[i].setAttribute("class", "options correct");
        myOptions.children[i].insertAdjacentHTML("beforeend", tickIcon);
      } 
    }
  }
  for (i = 0; i < allOptions;i++){
    myOptions.children[i].classList.add("disabled");
  }

  nextBtn.style.display = "block";
}
function showResultBox() {
  rulesBox.classList.remove('activeInfo');
  questions.classList.remove('activeQuiz');
  result_box.classList.add('activeResult');
  const score_text = document.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag = `<span>Congratulations! You Got <p>${userScore}</p> Out of <p>${questnsArr.length}</p> </span>`;
    score_text.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag = `<span>Carry On You Got <p>${userScore}</p> Out of <p>${questnsArr.length}</p> </span>`;
    score_text.innerHTML = scoreTag;
  } else {
    let scoreTag = `<span>Sorry! You Got <p>${userScore}</p> Out of <p>${questnsArr.length}</p> </span>`;
    score_text.innerHTML = scoreTag;
  }
  
}
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time;
    time--;
    if (time<9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = 0 + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
    }
  }
}
function startTimerLine(time) {
  counterLine = setInterval(timer, 50);
  function timer(){
    time += 1;
    timeLine.style.width = time + 'px'
    if (time > 319) {
      clearInterval(counterLine);
    }
  }
}