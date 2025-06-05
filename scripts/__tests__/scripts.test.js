let duplicateFn;
let consoleError;

beforeEach(() => {
  consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
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
  jest.resetModules();
  duplicateFn = require('../scripts.js').duplicate;
});

afterEach(() => {
  consoleError.mockRestore();
});

test('duplicate adds another #duplicater element', () => {
  expect(document.querySelectorAll('#duplicater').length).toBe(1);
  duplicateFn();
  expect(document.querySelectorAll('#duplicater').length).toBe(2);
});
