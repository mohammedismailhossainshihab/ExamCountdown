const countdownEl = document.getElementById("countdown");
const examDateTimeInput = document.getElementById("examDateTime");
const setTimeBtn = document.getElementById("setTimeBtn");
const refreshBtn = document.getElementById("refreshBtn");

function updateCountdown() {
  const examTime = localStorage.getItem("examTime");
  if (!examTime) {
    countdownEl.innerText = "Please set your exam time.";
    document.title = "Exam Countdown Timer";
    return;
  }

  const examDate = new Date(examTime);
  const now = new Date();
  const diff = examDate - now;

  if (diff <= 0) {
    countdownEl.innerText = "🚨 The exam time has started!";
    document.title = "🚨 Exam Time!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const timeString = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  countdownEl.innerText = timeString;
  document.title = timeString;
}


setTimeBtn.addEventListener("click", () => {
  const selectedDate = examDateTimeInput.value;
  if (!selectedDate) {
    alert("Please select a valid date and time!");
    return;
  }

  localStorage.setItem("examTime", selectedDate);
  updateCountdown();
});

refreshBtn.addEventListener("click", () => {
  localStorage.removeItem("examTime");
  countdownEl.innerText = "Please set your exam time.";
});

setInterval(updateCountdown, 1000);
updateCountdown();

const savedTime = localStorage.getItem("examTime");
if (savedTime) {
  examDateTimeInput.value = savedTime;
}
