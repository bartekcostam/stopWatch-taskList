let duplicateFn;
let consoleError;

beforeEach(() => {
  consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  document.body.innerHTML = `
    <div id="duplicater"></div>
    <h1></h1>
    <button id="start"></button>
    <button id="stop"></button>
    <div id="clear"></div>
    <div id="deleteTime"></div>
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
