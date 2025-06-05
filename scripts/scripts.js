class Timer {
  constructor(root) {
    this.root = root;
    this.display = root.querySelector('.display');
    this.startBtn = root.querySelector('.start');
    this.stopBtn = root.querySelector('.stop');
    this.clearBtn = root.querySelector('.clear');
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.timerInterval = null;
    this.registerEvents();
  }

  registerEvents() {
    this.startBtn.addEventListener('click', () => this.start());
    this.stopBtn.addEventListener('click', () => this.stop());
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        currentTimer = this;
      });
    }
  }

  tick() {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.textContent =
      (this.hours > 9 ? this.hours : '0' + this.hours) + ':' +
      (this.minutes > 9 ? this.minutes : '0' + this.minutes) + ':' +
      (this.seconds > 9 ? this.seconds : '0' + this.seconds);
  }

  start() {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => this.tick(), 1000);
      this.display.classList.add('running');
    }
  }

  stop() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.display.classList.remove('running');
  }

  reset() {
    this.stop();
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.updateDisplay();
  }
}

let timers = [];
let currentTimer = null;

function initTimerElements() {
  const original = document.getElementById('duplicater');
  if (original) {
    timers.push(new Timer(original));
  }
  const deleteBtn = document.getElementById('deleteTime');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (currentTimer) {
        currentTimer.reset();
        currentTimer = null;
      }
    });
  }
  const plus = document.getElementById('plus');
  if (plus) {
    plus.addEventListener('click', duplicate);
  }
}

document.addEventListener('DOMContentLoaded', initTimerElements);

function duplicate() {
  const original = document.getElementById('duplicater');
  if (!original) return;
  const clone = original.cloneNode(true);
  clone.id = 'duplicater';
  original.parentNode.appendChild(clone);
  timers.push(new Timer(clone));
}

if (typeof module !== 'undefined') {
  module.exports = { duplicate, Timer };
}
