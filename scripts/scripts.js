// Dodac petle do while, albo for a najlepiej if i warunek, on load

//skanowanie w tle..

//local storage in json format

//

var h1 = document.getElementsByTagName("h1")[0],
  start = document.getElementById("start"),
  stop = document.getElementById("stop"),
  clear = document.getElementById("clear"),
  plus = document.getElementById("plus"),
  seconds = 0,
  minutes = 0,
  hours = 0,
  t,
  addNote,
  deleteNote,
  openNote;
window.addEventListener("unload", function(start) {
  console.log("I am the 3rd one.");
});

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  h1.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  timer();
}
function timer() {
  t = setTimeout(add, 1000);
}

/* Start button */

start.onclick = timer;

/* Stop button */
stop.onclick = function() {
  clearTimeout(t);
};

/* Clear button */

deleteTime.onclick = function() {
  h1.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
};

var original = document.getElementById("duplicater");

function duplicate() {
  var clone = original.cloneNode(true); // "deep" clone so I can try to do it in diffrent way
  clone.id = "duplicater";
  // or clone.id = ""; if the divs don't need an ID
  original.parentNode.appendChild(clone);

  //in this step I should run onload method too, to reload clone DOM elements

  //I can try to save some data to ceche memory
}
