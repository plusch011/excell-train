import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  onMousedown(e) {
    const $resizer = $(e.target);

    const resizeType = $resizer.data.resize;
    const isCol = resizeType === 'col';

    if (resizeType) {
      let value;
      const initial = isCol ? 'width' : 'height';
      const edge = isCol ? 'right' : 'bottom';
      const mouseDimension = isCol ? 'pageX' : 'pageY';
      const $resizable = $resizer.closest('[data-type="resizable"]');
      const coords = $resizable.getCoords();
      $resizer.css({opacity: 1});
      document.body.style.cursor = isCol ? 'col-resize' : 'row-resize';

      document.onmousemove = e => {
        const delta = e[mouseDimension] - coords[edge];
        $resizer.css({
          [edge]: (- delta - 4) + 'px',
          zIndex: 10,
        })
        value = coords[initial] + delta + 4;
      }

      document.onmouseup = () => {
        if (isCol) {
          this.$root.findAll(`[data-col="${$resizable.data.col}"]`)
              .forEach(col => col.style[initial] = value + 'px');
        } else {
          $resizable.css({[initial]: value + 'px'})
        }

        $resizer.css({
          opacity: '',
          [edge]: '',
          zIndex: '',
        })

        document.body.style.cursor = '';
        document.onmousemove = null;

        document.onmouseup = null;
      }
    }
  }

  toHTML() {
    return createTable(40);
  }
}
