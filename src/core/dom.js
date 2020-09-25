export class Dom {
  constructor(selector) {
    this.$el = typeof selector == 'string'
        ? document.querySelector(selector)
        : this.$el = selector;
  }

  static isDom($el) {
    return $el instanceof Dom;
  }

  closest(selector) {
    const el = this.$el.closest(selector)
    return el ? $(el) : null;
  }

  get data() {
    return this.$el.dataset;
  }

  static parseId(id) {
    id = id.split(':');
    return {row: +id[0], col: +id[1]};
  }

  id(parse) {
    return parse ? Dom.parseId(this.data.id) : this.data.id;
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  html(template) {
    if (typeof template === 'string') {
      this.$el.innerHTML = template;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }

    if (this.$el.tagName.toLowerCase() == 'input') {
      return this.$el.value.trim();
    }

    return this.$el.textContent.trim();
  }

  css(styles = {}) {
    Object.assign(this.$el.style, styles)
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
    return this;
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
    return this;
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    this.$el.append(node instanceof Dom ? node.$el : node);
    return this;
  }

  findAll(selector) {
    return Array.from(this.$el
        .querySelectorAll(selector))
        .map($);
  }

  find(selector) {
    const el = this.$el.querySelector(selector);

    return el ? $(el) : null;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  toggleClass(className) {
    this.$el.classList.toggle(className);
    return this;
  }

  focus() {
    this.$el.focus();
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);

  classes && el.classList.add(classes);
  return $(el);
}
