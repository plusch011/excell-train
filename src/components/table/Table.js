import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {
  getNextSelector,
  idMatrix,
  shouldResize,
  shouldSelect
} from './table.functions';
import {$} from '@core/dom';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection(this.emitter);
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(e) {
    const $target = $(e.target);

    if (shouldResize(e)) {
      return resizeHandler(this.$root, e);
    }

    if (shouldSelect(e)) {
      if (!this.selection.group.length)
        return this.selectCell($target);

      if (e.shiftKey) {
        const selection = idMatrix(this.selection.current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`));

        return this.selection.selectGroup(selection);
      }

      this.selection.select($target);
    }
  }

  onKeydown(e) {
    const {key} = e;
    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
      'Enter',
      'Tab',
    ];

    if (keys.includes(key)) {
      const selector = getNextSelector(e, this.selection.current);
      const $target = this.$root.find(selector);
      this.selectCell($target);
    }
  }

  onInput(e) {
    console.log(e);
    this.$emit('table:input', $(e.target));
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', text => this.selection.current.text(text));
    this.$on('formula:done', () => {
      this.selection.current.focus()
    });
  }

  toHTML() {
    return createTable(40);
  }
}

