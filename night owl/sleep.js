function setAlarm() {
  const alarmTime = document.getElementById("alarmTime").value;
  const alarmTime1 = document.getElementById("alarmTime");

  const now = new Date();
  var gotWentToSleep = document.getElementById("wentToSleep");
  var gotGoBack = document.getElementById('goBack');
  const timeParts = alarmTime.split(":");
  const alarm = new Date();
  alarm.setHours(timeParts[0]);
  alarm.setMinutes(timeParts[1]);
  alarm.setSeconds(0);

    alarmTime1.style.display = "none";

    var set = document.getElementById('set');
    set.innerHTML = 'STOP SLEEPING'

  

  function updateClock() {
    const clock = document.getElementById("currentTime");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;
    clock.textContent = timeString;
  }
  setInterval(updateClock, 1000);

  gotGoBack.style.display = 'none'
  if (alarm < now) {
    alarm.setDate(alarm.getDate() + 1);
  }

  const timeUntilAlarm = alarm.getTime() - now.getTime();

  setTimeout(() => {
    alert("Alarm!");
    gotGoBack.style.display = 'block'
  }, timeUntilAlarm);

  for (var i = 0; i < myclouds.length; i++) {
    myclouds[i].style.display = "block";
  }

  timeText.style.color = "gray";
  function getCurrentTime() {
    // create a new Date object
    var now = new Date();
    // get the current hour (0-23) and minute (0-59)
    var hour = now.getHours();
    var minute = now.getMinutes();
    // output the values to the console
    console.log("The current time is " + hour + ":" + minute);
    // store the values in a variable
    var currentTime = hour + ":" + minute;
    // do something with the variable
    gotWentToSleep.innerHTML = "You went to sleep at " + currentTime;
  }
  getCurrentTime();
}

const redirectToHome = () => {
  window.location.href = "/home.html";
};

var timeText = document.getElementById("alarmTime");
var d = new Date();
var hours = d.getHours();
var minutes = d.getMinutes();

if (hours < 10) {
  hours = "0" + hours;
}

if (minutes < 10) {
  minutes = "0" + minutes;
}

document.getElementById("alarmTime").defaultValue = hours + ":" + minutes;

var myclouds = document.getElementsByClassName("cloud");
