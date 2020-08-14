import {capitalize} from '@core/utils';

export class DOMListener {
  name;

  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DOMListener');
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const eventName = getMethodName(listener);

      if (!this[eventName]) {
        const name = this.name || ''
        throw new Error(
            `Method ${eventName} is not implemented in ${name} Component`);
      }

      this[eventName] = this[eventName].bind(this);

      this.$root.on(listener, this[eventName]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const eventName = getMethodName(listener);
      if (!this[eventName]) return;

      this.$root.off(listener, this[eventName]);
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
