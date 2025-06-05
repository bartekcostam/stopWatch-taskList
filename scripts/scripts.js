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

function attachEditHandlers(container) {
  const input = container.querySelector('.clickedit');
  const label = input ? input.previousElementSibling : null;
  if (!input || !label) return;
  input.style.display = 'none';

  function endEdit() {
    label.textContent = input.value === '' ? 'Click me and enter some text' : input.value;
    input.style.display = 'none';
    label.style.display = '';
  }

  input.addEventListener('blur', endEdit);
  input.addEventListener('keyup', e => {
    if (e.key === 'Tab') {
      endEdit();
    }
  });

  label.addEventListener('click', () => {
    label.style.display = 'none';
    input.style.display = '';
    input.focus();
  });
}

let timers = [];
let currentTimer = null;

function initTimerElements() {
  const original = document.getElementById('duplicater');
  if (original) {
    attachEditHandlers(original);
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
  attachEditHandlers(clone);
  timers.push(new Timer(clone));
}

if (typeof module !== 'undefined') {
  module.exports = { duplicate, Timer, attachEditHandlers };
}
