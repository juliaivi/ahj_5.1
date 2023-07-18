export default class Popover {
  constructor(el) {
    this.container = el;
    this.button = this.container.querySelector('.btn');
  }

  init() {
    this.button.addEventListener('click', () => this.createElement());
  }

  createElement() {
    if (document.querySelector('.popover') || document.querySelector('.popover') !== null) {
      document.querySelector('.popover').remove();
    } else {
      const elementPopover = `
        <div class="popover">
            <h3 class="popover-header">Popover title</h3>
            <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>
            <div class="arrow"></div>
        </div>
            `;
      this.container.insertAdjacentHTML('beforeend', elementPopover);
      this.positionPopover();
    }
  }

  positionPopover() {
    this.arrow = this.container.querySelector('.arrow');
    this.popover = this.container.querySelector('.popover');
    const { top, left } = this.button.getBoundingClientRect();
    this.popover.style.top = `${top - this.popover.offsetHeight + 3}px`;
    this.popover.style.left = `${left + this.button.offsetWidth / 2 - this.popover.offsetWidth / 2}px`;
    this.arrow.style.left = `${this.popover.offsetWidth / 2 - 10}px`;
  }
}
