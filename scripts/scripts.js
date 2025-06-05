// Dodac petle do while, albo for a najlepiej if i warunek, on load

//skanowanie w tle..

//local storage in json format

//Najlepiej bylo by uzyc ajax do wymiany danych w tle, by nie przeladowywac scryptu




//

var timeDisplay = document.getElementById("display"),
  startBtn = document.getElementById("start"),
  stopBtn = document.getElementById("stop"),
  clearBtn = document.getElementById("deleteTime"),
  plus = document.getElementById("plus"),
  seconds = 0,
  minutes = 0,
  hours = 0,
  timerInterval,
  addNote,
  deleteNote,
  openNote;

window.addEventListener("unload", function (start) {
  console.log("I am the 3rd one.");
});


function tick() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  timeDisplay.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(tick, 1000);
    timeDisplay.classList.add("running");
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeDisplay.classList.remove("running");
}


/* Start button */

startBtn.onclick = startTimer;

/* Stop button */
stopBtn.onclick = stopTimer;

/* Clear button */

clearBtn.onclick = function () {
  stopTimer();
  seconds = 0;
  minutes = 0;
  hours = 0;
  timeDisplay.textContent = "00:00:00";
};

var original = document.getElementById("duplicater");

function duplicate() {
  var clone = original.cloneNode(true); // "deep" clone so I can try to do it in diffrent way
  clone.id = "duplicater";
  // or clone.id = ""; if the divs don't need an ID
  original.parentNode.appendChild(clone);


  window.location = window.location.href;

  window.location.reload(true);

  //in this step I should run onload method too, to reload clone DOM elements

  // I can try to save some data to cache memory
}


if (typeof module !== "undefined") { module.exports = { duplicate }; }

