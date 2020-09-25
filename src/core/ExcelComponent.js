import {DOMListener} from '@core/DomListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || ''
    this.unsubscribers = [];
    this.emitter = options.emitter;
    this.prepare();
    this.store = options.store;
    this.storeSub = null;
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
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
    this.storeSub && this.storeSub.ubsubscribe();
  }
}
