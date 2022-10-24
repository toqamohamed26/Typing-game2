new TypeIt('#type', {
    speed: 100,
    startDelay: 1000,
    loop: true
})
    .type('<em class="typing">Typing</em>')
    .pause(1000)
    .type('<em class="game">Game</em>')
    .pause(1500).go();

let totalTime,level,selectValue,time,prog,word,text,pause,ran,Timer;
let score=0;
let isPaused=false;
let bestScore=window.localStorage.getItem('bestScore');
if(!bestScore){
    bestScore=0;
}
let selectElement=document.getElementById('choose');
let levelElement = document.getElementById("level");
let timeElement = document.getElementById("sec");
let scoreElement = document.getElementById('score');
let bar=document.getElementById('bar');
let content=document.getElementById('content');
let Btn=document.getElementById('Btnn');
let arr = ['Week', 'Congratulations', 'Bee', 'Location', 'Shopping', 'Collage','Game',
    'Graduation', 'Love', 'Money', 'Suggestions','Education', 'Charger', 'Bag','Work',
    'Mobile','book', 'Scarf','Tree','Company','Manager','Gym','Sports','Clothes', 'TV',
    'Computer','Coffe','Life','Accept','Change','Laptop','Fan','Write','Calculator']

let displayDetails=()=>{
    totalTime = window.localStorage.getItem('time');
    if(!totalTime){
        totalTime=20;
    }
    level = window.localStorage.getItem('level');
    if (!level){
        level="Easy";
    }
    timeElement.innerHTML = totalTime;
    levelElement.innerHTML = level;
}

let selectLevel = () => {
    selectValue=selectElement.value;
    if (selectValue == 1) {
        window.localStorage.setItem('time', '20')
        window.localStorage.setItem('level', 'Easy')
    }
    else if (selectValue == 2) {
        window.localStorage.setItem('time', '15')
        window.localStorage.setItem('level', 'Meduim')
    } else {
        window.localStorage.setItem('time', '10')
        window.localStorage.setItem('level', 'Hard')
    }
    displayDetails()
}

let reset = () =>{
    bar.style.width='100%';
    bar.style.backgroundColor="#06cce2";
    score= 0;
    scoreElement.innerHTML=score;
    timeElement.innerHTML = totalTime;
    selectElement.setAttribute("disabled","");
}

let progressBar =()=>{
    prog=(time/totalTime)*100
        if (prog<=25){
            bar.style.backgroundColor="#b11a1a"
        }
        else if(prog<=50){
            bar.style.backgroundColor="orange"
        }
        bar.style.width=`${prog}%`;
}

let Generating = () => {
    ran = Math.floor(Math.random() * arr.length);
    return arr[ran];
}

let validate=()=>{
    text=document.getElementById('text').value;
    if (text.toLowerCase() == word.toLowerCase()) {
        word = Generating();
        content.innerHTML = `<h2>${word}</h2>`;
        document.getElementById('text').value = '';
        score++;
        scoreElement.innerHTML = score;
    }
}

let Timeout=()=>{
    if (score>bestScore){
        bestScore=score;
        window.localStorage.setItem('bestScore', score);
    }
    if(time==0){
        content.innerHTML = `
        <h1 class='timeout'>Time Out !<h1>`
    }else{
        content.innerHTML = `
        <h1 class='timeout'>Game Over !<h1>`
    }
    content.innerHTML += `
    <h3 class='sco'>Your Score: ${score}</h3>
    <h5 class='best'>Best Score: ${bestScore}</h5>`;
    Btn.innerHTML = `
    <button type="button" class="btn btn-lg startbtn" onclick="startGame()" >
        <i class="fa-solid fa-arrow-rotate-right"></i> Play again
    </button>`
    selectElement.removeAttribute("disabled")
}

let play=()=>{
    pause=document.getElementById('pause')
    if(isPaused){
    pause.innerHTML=`<i class="fa-solid fa-pause"></i>`
    isPaused = false;
}else 
{
    pause.innerHTML=`<i class="fa-solid fa-play"></i>`
    isPaused = true;
}
}

let stop=()=>{
    clearInterval(Timer);
    Timeout()
}

let startGame =() => {
    reset();
    time=totalTime;
    Timer = setInterval(function () {
        if (time <= 0) {
            stop();
        }
        if(!isPaused){
        timeElement.innerHTML = time;
        time -= 1;
        progressBar()
    }}, 1000)
    word = Generating();
    content.innerHTML = `<h2>${word}</h2>`;
    Btn.innerHTML = `
    <input type="text" id='text'class='text rounded-pill border-0 px-3 py-1 mb-4' onkeyup='validate()'>
    <div>
        <button onclick="play()" class='pause p-1 px-4 mx-2' id='pause'  >
            <i class="fa-solid fa-pause"></i>
        </button>
        <button onclick="stop()" class='pause p-1 px-4' >
            <i class="fa-solid fa-stop"></i>
        </button>
    </div>
    `;
}
displayDetails()