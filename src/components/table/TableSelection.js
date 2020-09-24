import {Dom} from '@core/dom';

export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
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

  static parseId(id) {
    return {row: id[0], col: id[2]};
  }

  static isIdInRange(id, from, to) {
    from = TableSelection.parseId(from);
    to = TableSelection.parseId(to);
    id = TableSelection.parseId(id);

    const [r1, r2] = [Math.min(from.row, to.row), Math.min(from.row, to.row)];
    const [c1, c2] = [Math.min(from.col, to.col), Math.min(from.col, to.col)];

    const inRow = id.row >= r1 && id.row <= r2;
    const inCol = id.col >= c1 && id.col <= c2;
    inRow & inCol && console.log('inRange')
    return inRow & inCol;
  }

  selectFromTo(id1, id2) {

  }

  // toggle($el) {
  //   const elements = TableSelection.toArray($el);
  //
  //   elements.forEach(elem => {
  //     return this.group.includes(elem) ? this.remove(elem) : this.add(elem);
  //   });
  // }


  select($el) {
    const elements = TableSelection.toArray($el);
    elements.forEach(elem => elem.addClass(TableSelection.className));
    this.clear();
    this.group = elements;

  }

  add($el) {
    const elements = TableSelection.toArray($el);

    this.group = [...this.group, ...elements];

    elements.forEach(elem => elem.addClass('selected'));
  }

  // remove($el) {
  //   TableSelection.checkElement($el);
  //
  //   this.group = this.group.filter(el => el.$el != $el.$el);
  //
  //   $el.removeClass('selected');
  // }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
}
