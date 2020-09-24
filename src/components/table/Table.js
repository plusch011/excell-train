import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, shouldSelect} from '@/components/table/table.functions';
import {$} from '@core/dom';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  onMousedown(e) {
    const $target = $(e.target);

    if (shouldResize(e)) {
      return resizeHandler(this.$root, e);
    }

    if (shouldSelect(e)) {
      if (!this.selection.group.length)
        return this.selection.select($target);
      if (e.ctrlKey)
        return this.selection.add($target);

      if (e.shiftKey) {
        const $first = this.selection.group[0];
        const firstId = $first.data.id;
        const targetId = $target.data.id;

        const cells = this.$root
            .findAll('[data-id]')
            .filter($cell => TableSelection
                .isIdInRange($cell.data.id, firstId, targetId));

        return this.selection.select(cells);
      }

      this.selection.select($target);
    }
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  toHTML() {
    return createTable(40);
  }
}
