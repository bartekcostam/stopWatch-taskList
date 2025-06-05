let duplicateFn;
let Timer;
let attachEditHandlers;
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
      <label>Title</label>
      <input class="clickedit" type="text" />
    </div>
    <button id="deleteTime"></button>
    <button id="plus"></button>
  `;
  ({ duplicate: duplicateFn, Timer, attachEditHandlers } = require('../scripts.js'));
  const root = document.getElementById('duplicater');
  attachEditHandlers(root);
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

test('buttons operate correctly on a duplicated timer', () => {
  duplicateFn();
  const clone = document.querySelectorAll('#duplicater')[1];
  attachEditHandlers(clone);
  const timer = new Timer(clone);
  timer.startBtn.click();
  jest.advanceTimersByTime(2000);
  expect(timer.display.textContent).toBe('00:00:02');
  timer.stopBtn.click();
  jest.advanceTimersByTime(2000);
  expect(timer.display.textContent).toBe('00:00:02');
  document.dispatchEvent(new Event('DOMContentLoaded'));
  const del = document.getElementById('deleteTime');
  timer.clearBtn.click();
  del.click();
  expect(timer.display.textContent).toBe('00:00:00');
});

test('editing label works on newly created timer', () => {
  duplicateFn();
  const clone = document.querySelectorAll('#duplicater')[1];
  attachEditHandlers(clone);
  const label = clone.querySelector('label');
  const input = clone.querySelector('.clickedit');
  label.click();
  input.value = 'New task';
  input.dispatchEvent(new Event('blur'));
  expect(label.textContent).toBe('New task');
  expect(input.style.display).toBe('none');
});
