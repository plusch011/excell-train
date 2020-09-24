import {DOMListener} from '@core/DomListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || ''
  }

  toHTML() {
    return '<div>Component</div>';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}
