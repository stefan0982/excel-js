import { $ } from '../../core/dom'

export function resizeHandler(root, event) {
  const $resizer = $( event.target )
  // const $parent = $resizer.$el.parentNode // bad
  // const $parent = $resizer.$el.closest('.column') // little better
  const $parent = $resizer.closest( '[data-type="resizable"]' )
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css( {
    opacity: 1,
    zIndex : 1000,
    [sideProp] : '-5000px',
  } )

  const cells = root.findAll( `[data-col="${ $parent.data.col }"]` )

  document.onmousemove = e => {
    if (type === 'col') {
      const deltaX = e.pageX - coords.right
      value = coords.width + deltaX
      $resizer.css( { right: -deltaX + 'px' } )
      // $parent.css({ width: value + 'px' })
      // cells.forEach( el => el.style.width = value + 'px' )
    } else {
      const deltaY = e.pageY - coords.bottom
      value = coords.height + deltaY
      $resizer.css({ bottom: -deltaY + 'px' })
      // $parent.css({ height: value + 'px' })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css( { width: value + 'px' } )
      cells.forEach( el => el.style.width = value + 'px' )
    } else {
      $parent.css({ height: value + 'px' })
    }
    $resizer.css( {
      opacity: 0,
      bottom : 0,
      right: 0
    } )
  }
}