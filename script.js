function updateTime() {
  const now = new Date();
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");
  timeElement.textContent = now.toLocaleTimeString();
  dateElement.textContent = now.toDateString();
}

setInterval(updateTime, 1000);

function setAlarm() {
  const alarmTime = document.getElementById("alarmTime").value;
  const now = new Date();
  const alarm = new Date(now.toDateString() + " " + alarmTime);

  const timeUntilAlarm = alarm - now;

  if (timeUntilAlarm < 0) {
    alert("Invalid time. Please choose a time in the future.");
    return;
  }

  // Creates a new alarm element
  const alarmsContainer = document.getElementById("alarms");
  const alarmElement = document.createElement("div");
  alarmElement.classList.add("alarm-item"); // Adds a CSS class for styling

  // Creates a button to turn off the alarm
  const alarmOffButton = document.createElement("button");
  alarmOffButton.textContent = "Remove";
  alarmOffButton.classList.add("alarm-off-button"); // Adds a CSS class for styling
  alarmOffButton.onclick = function () {
    alarmElement.remove();
  };

  // Displays the alarm time in bold
  const alarmTimeDisplay = document.createElement("span");
  alarmTimeDisplay.textContent = alarm.toLocaleTimeString();
  alarmTimeDisplay.classList.add("alarm-time"); // Adds a CSS class for styling

  // Appends the alarm elements
  alarmElement.appendChild(alarmTimeDisplay);
  alarmElement.appendChild(alarmOffButton); // Adds the "Remove" button
  alarmsContainer.appendChild(alarmElement);

  // Sets the alarm to trigger
  setTimeout(() => {
    showPopup();
  }, timeUntilAlarm);
}

//shows a pop up to either turn off the alarm or snooze it 
function showPopup() {
  const alarmPopup = document.getElementById("alarmPopup");
  alarmPopup.style.display = "flex";
  playAlarm();
}

function turnOffAlarm() {
  const alarmPopup = document.getElementById("alarmPopup");
  alarmPopup.style.display = "none";
  stopAlarm();
}

function snoozeAlarm() {
  const alarmPopup = document.getElementById("alarmPopup");
  alarmPopup.style.display = "none";
  setTimeout(() => {
    showPopup();
  }, 300000); // Snooze for 5 minutes (300,000 milliseconds)
}

function playAlarm() {
  const alarmSound = document.getElementById("alarmSound");
  alarmSound.loop = true; // Make the alarm sound play continuously
  alarmSound.play();
}

function stopAlarm() {
  const alarmSound = document.getElementById("alarmSound");
  alarmSound.loop = false; // Stop the alarm sound
  alarmSound.pause();
}
