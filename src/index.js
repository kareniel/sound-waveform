var html = require('nanohtml')
var Nanocomponent = require('nanocomponent')
var defaultState = { loaded: true, peaks: new Array(500).fill(255) }

class Waveform extends Nanocomponent {
  constructor (rect = { width: 440, height: 60 }) {
    super()

    this.canvas = html`<canvas aria-hidden="true" width=${rect.width} height=${rect.height}>`
    this.el = html`<div data-target="sound-waveform">${this.canvas}</div>`
  }

  createElement (state = defaultState) {
    if (state && state.loaded) this.el.dataset.loaded = 1
    return this.el
  }

  load (el) {
    this._ctx = this.canvas.getContext('2d')
    this.__fill = this._ctx.fillRect.bind(this._ctx, 0, 0, this.canvas.width, this.canvas.height)

    this.draw()
  }

  update (state = defaultState) {
    if (state.loaded && state.peaks) this._draw()

    return state.loaded && this.el.dataset['loaded']
  }

  draw () {
    if (!this._ctx) return

    this.fill('black')
  }

  fill (color) {
    this._ctx.fillStyle = color
    this.__fill()
  }
}

module.exports = Waveform
