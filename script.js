const sentences = [
"Programming is the art of solving problems with code",
"Practice typing daily to increase your speed",
"JavaScript makes websites interactive and dynamic",
"Consistency is the secret to becoming a great developer",
"Small improvements every day lead to big success"
]

let sentence = ""
let timer = 0
let interval = null
let startTime = null

const sentenceElement = document.getElementById("sentence")
const inputElement = document.getElementById("input")

const timeElement = document.getElementById("time")
const wpmElement = document.getElementById("wpm")
const accuracyElement = document.getElementById("accuracy")

function loadSentence(){

sentence = sentences[Math.floor(Math.random()*sentences.length)]

sentenceElement.innerHTML = ""

sentence.split("").forEach(char => {

const span = document.createElement("span")
span.innerText = char

sentenceElement.appendChild(span)

})

}

function startGame(){

if(startTime) return

inputElement.disabled = false
inputElement.focus()

startTime = new Date()

startTimer()

}

function startTimer(){

interval = setInterval(()=>{

timer++

timeElement.textContent = timer

},1000)

}

inputElement.addEventListener("input",()=>{

const typed = inputElement.value
const characters = sentenceElement.querySelectorAll("span")

let correct = 0

characters.forEach((char,index)=>{

const typedChar = typed[index]

if(typedChar == null){

char.classList.remove("correct")
char.classList.remove("wrong")

}

else if(typedChar === char.innerText){

char.classList.add("correct")
char.classList.remove("wrong")

correct++

}

else{

char.classList.add("wrong")
char.classList.remove("correct")

}

})

let accuracy = Math.floor((correct/typed.length)*100)

if(isNaN(accuracy)) accuracy = 100

accuracyElement.textContent = accuracy + "%"

const minutes = (new Date() - startTime)/1000/60

const words = typed.length/5

const wpm = Math.floor(words/minutes)

if(isFinite(wpm)){
wpmElement.textContent = wpm
}

})

function endGame(){

clearInterval(interval)

interval = null

inputElement.disabled = true

}

function restartGame(){

clearInterval(interval)

interval = null

timer = 0
timeElement.textContent = timer

wpmElement.textContent = 0
accuracyElement.textContent = "100%"

inputElement.value = ""
inputElement.disabled = true

startTime = null

loadSentence()

}

loadSentence()
