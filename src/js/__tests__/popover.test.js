/**
* @jest-environment jsdom
*/

import Popover from '../Popover';

document.body.innerHTML = '<div class="container"></div>';
const container = document.querySelector('.container');

const block = `
    <button class="btn" type="button">Click to toggle popover</button>
`;

container.insertAdjacentHTML('beforeend', block);

test('Testing the appearance of the popover', () => {
  const popover = new Popover(container);
  popover.init();
  popover.button.click();
  popover.createElement();

  expect(popover.popover).toBeTruthy();
});
