import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable }    from './table.template'
import { resizeHandler }  from './table.resize'
import { shouldResize }   from './table.functions'

export class Table
  extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super( $root, {
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    } )
  }

  toHTML() {
    return createTable()
  }

  // apasam mouse da nu luam degetul
  onMousedown(event) {
    if (shouldResize(event)) {
     resizeHandler(this.$root, event)
    }
  }

  onMousemove() {
    // console.log( 'mousemove' )
  }

  onMouseup() {
    // console.log( 'onmouse up' )
  }
}

// deleghirovanie
// la google excel fiecare celula nu are metoda onClick, dar in root este
// event care urmareste unde a fost facut click si acolo il foloseste