const counterEl = document.getElementById("counter")
const unitEl = document.getElementById("unit")
const activityEl = document.getElementById("activity")
const activityButton = document.getElementById("activity-button")

let seconds = 0
let activityTimeout

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  }

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
}

function renderCounter() {
  counterEl.textContent = formatTime(seconds)
  counterEl.setAttribute("aria-label", `${seconds} seconds`)
  unitEl.textContent = seconds >= 3600
    ? "hours : minutes : seconds of glorious nothing"
    : "minutes : seconds of glorious nothing"
}

function doSomething() {
  seconds = 0
  renderCounter()
  activityEl.textContent = "Aha! You did a thing. The streak begins again."

  window.clearTimeout(activityTimeout)
  activityTimeout = window.setTimeout(() => {
    activityEl.textContent = "Everything is still. Beautiful."
  }, 2200)
}

activityButton.addEventListener("click", doSomething)

document.addEventListener("keydown", (event) => {
  if (event.target === activityButton) return
  if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
  if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab"].includes(event.key)) return
  doSomething()
})

renderCounter()
window.setInterval(() => {
  seconds += 1
  renderCounter()
}, 1000)
