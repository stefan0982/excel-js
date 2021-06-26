class Dom {
  constructor(selector) {
    // #app
    this.$el = typeof selector === 'string' ? document.querySelector( selector )
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      // intoarcem this ca atunci cand chemam functia asta sa putem accesa
      // si celelalte functii din class in functia asta
      // de ex. solve.html().clear()
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html( '' )
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append( node )
    } else {
      this.$el.appendChild( node )
    }

    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $( this.$el.closest( selector ) )
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  on(eventType, callback) {
    this.$el.addEventListener( eventType, callback )
  }

  off(eventType, callback) {
    this.$el.removeEventListener( eventType, callback )
  }

  findAll(selector) {
    return this.$el.querySelectorAll( selector )
  }

  css(styles = {}) {
    Object.keys( styles ).forEach( key => {
      this.$el.style[key] = styles[key]
    } )
  }

}

export function $(selector) {
  return new Dom( selector )
}

$.create = (tagname, classes = '') => {
  const el = document.createElement( tagname )
  if (classes) {
    el.classList.add( classes )
  }
  return $( el )
}