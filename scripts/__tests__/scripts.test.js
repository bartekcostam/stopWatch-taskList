let duplicateFn;
let Timer;
let consoleError;

beforeEach(() => {
  consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.useFakeTimers();
  document.body.innerHTML = `
    <div id="duplicater">
      <time class="display"></time>
      <button class="start"></button>
      <button class="stop"></button>
      <button class="clear"></button>
    </div>
    <button id="deleteTime"></button>
    <button id="plus"></button>
  `;
  ({ duplicate: duplicateFn, Timer } = require('../scripts.js'));
});

afterEach(() => {
  jest.useRealTimers();
  consoleError.mockRestore();
});

test('duplicate adds another #duplicater element', () => {
  expect(document.querySelectorAll('#duplicater').length).toBe(1);
  duplicateFn();
  expect(document.querySelectorAll('#duplicater').length).toBe(2);
});

test('start button begins incrementing the timer', () => {
  const root = document.getElementById('duplicater');
  const timer = new Timer(root);
  timer.startBtn.click();
  jest.advanceTimersByTime(3000);
  expect(timer.display.textContent).toBe('00:00:03');
});

test('stop button halts the timer', () => {
  const root = document.getElementById('duplicater');
  const timer = new Timer(root);
  timer.startBtn.click();
  jest.advanceTimersByTime(1000);
  timer.stopBtn.click();
  jest.advanceTimersByTime(2000);
  expect(timer.display.textContent).toBe('00:00:01');
});

test('clear + confirm resets the timer', () => {
  document.dispatchEvent(new Event('DOMContentLoaded'));
  const root = document.getElementById('duplicater');
  const del = document.getElementById('deleteTime');
  const timer = new Timer(root);
  timer.startBtn.click();
  jest.advanceTimersByTime(2000);
  timer.clearBtn.click();
  del.click();
  expect(timer.display.textContent).toBe('00:00:00');
});

test('multiple timers run independently', () => {
  const root1 = document.getElementById('duplicater');
  const timer1 = new Timer(root1);
  duplicateFn();
  const root2 = document.querySelectorAll('#duplicater')[1];
  const timer2 = new Timer(root2);

  timer1.startBtn.click();
  jest.advanceTimersByTime(1000);
  timer2.startBtn.click();
  jest.advanceTimersByTime(1000);

  expect(timer1.display.textContent).toBe('00:00:02');
  expect(timer2.display.textContent).toBe('00:00:01');
});

test('plus button duplicates a timer after DOMContentLoaded', () => {
  document.dispatchEvent(new Event('DOMContentLoaded'));
  expect(document.querySelectorAll('#duplicater').length).toBe(1);
  document.getElementById('plus').click();
  expect(document.querySelectorAll('#duplicater').length).toBe(2);
});
