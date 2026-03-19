const user = localStorage.getItem("user")
if (!user) window.location.href = "index.html"
document.getElementById("userName").innerText = user

const sentenceDisplay = document.getElementById("sentence")
const input = document.getElementById("input")

let currentSentence = ""
let startTime
let correctChars = 0

let streak = localStorage.getItem("streak") || 0
document.getElementById("streak").innerText = streak

async function getSentence() {
  try {
    const res = await fetch("https://api.quotable.io/random")
    const data = await res.json()
    return data.content
  } catch {
    return "Practice typing every day to improve your speed."
  }
}

function renderSentence(sentence) {
  sentenceDisplay.innerHTML = ""
  sentence.split("").forEach(char => {
    const span = document.createElement("span")
    span.innerText = char
    sentenceDisplay.appendChild(span)
  })
}

async function startApp() {
  input.disabled = true
  input.value = "Loading sentence..."

  currentSentence = await getSentence()

  renderSentence(currentSentence)
  input.value = ""
  input.disabled = false
  input.focus()

  startTime = new Date()
  document.getElementById("progress-bar").style.width = "0%"
}

input.addEventListener("input", () => {
  const text = input.value
  const chars = sentenceDisplay.querySelectorAll("span")

  correctChars = 0

  chars.forEach((char, i) => {
    if (text[i] == null) {
      char.classList.remove("correct", "incorrect")
      char.classList.add("current")
    } 
    else if (text[i] === char.innerText) {
      char.classList.add("correct")
      char.classList.remove("incorrect", "current")
      correctChars++
    } 
    else {
      char.classList.add("incorrect")
      char.classList.remove("correct", "current")
    }
  })

  const progress = (text.length / chars.length) * 100
  document.getElementById("progress-bar").style.width = progress + "%"

  const time = (new Date() - startTime) / 1000 / 60
  const wpm = Math.round((text.length / 5) / time)
  const accuracy = Math.round((correctChars / text.length) * 100) || 100

  document.getElementById("wpm").innerText = wpm
  document.getElementById("accuracy").innerText = accuracy + "%"

  if (text === currentSentence) {
    streak++
    localStorage.setItem("streak", streak)
    document.getElementById("streak").innerText = streak
    startApp()
  }
})

function logout() {
  localStorage.removeItem("user")
  window.location.href = "index.html"
}

window.onload = startApp
