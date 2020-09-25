import {Dom} from '@core/dom';

export class TableSelection {
  static className = 'selected';

  constructor(emitter) {
    this.group = [];
    this.current = null;
  }

  static checkElement($el) {
    if (!Dom.isDom($el)) {
      throw new TypeError(
          'TableSelection: element must be wrapped in $() function!');
    }
  }

  static toArray($el) {
    if (Array.isArray($el)) {
      $el.forEach(TableSelection.checkElement)
      return $el;
    }

    TableSelection.checkElement($el);
    return [$el];
  }

  focus() {
    this.current.focus();
  }

  select($el) {
    this.clear();
    $el.addClass(TableSelection.className);
    this.group = [$el];
    this.current = $el;
    this.focus();
  }

  selectGroup($elArr) {
    const elements = TableSelection.toArray($elArr);

    this.clear();

    elements.forEach(elem => elem.addClass('selected'));

    this.group = elements;
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
}
