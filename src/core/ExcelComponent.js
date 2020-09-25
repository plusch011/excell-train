import {DOMListener} from '@core/DomListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || ''
    this.unsubscribers = [];
    this.emitter = options.emitter;
    this.prepare();

  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);

    this.unsubscribers.push(unsub);
  }

  prepare() {

  }

  toHTML() {
    return '<div>Component</div>';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
