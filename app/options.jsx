require("./options/widgets.css")
require("./options/chrome-shared.css")
require("./options/options.css")

import React from "react"
import DEFAULT_OPTIONS from "resources/defaults"

const
  OCCURANCE_SCALE = 100,
  chrome = global.chrome

class OptionsPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      options: props.options
    }
  }

  render () {
    let {options} = this.state

    return <section className="main-container">
      <header className="title">Cursed!</header>
      <hr />

      <p>
        Cursed makes browsing the internet fun. If you don't remember installing Cursed, you're being pranked!
      </p>


      <div className="checkbox occurance">
        <h1>Occurance</h1>
        <p>How often should a curse take effect?</p>

        <label>
          <input type="number" max="100" min="0" value={options.occurance * OCCURANCE_SCALE} onChange={this.setOccurance.bind(this)} />
          <span /> %
        </label>
      </div>

      {this.renderCurses()}

    </section>
  }

  renderCurses () {
    let
      {curses} = this.state.options,
      names = Object.keys(curses)

    return names.map(function (name) {
      let curse = curses[name]

      return <div className="checkbox curse" key={name}>
        <h1>{curse.name}</h1>
        <p>{curse.description}</p>

        <label>
          <input type="checkbox" checked={curse.isEnabled} onChange={this.setEnabled.bind(this, name)} />
          <span /> Enable
        </label>
      </div>
    }.bind(this))
  }

  saveOptions () {
    chrome.storage.sync.set(this.state.options, function () {
      console.log("Saved!")
    })
  }

  setEnabled (name, event) {
    let {state} = this

    state.options.curses[name].isEnabled = event.target.checked

    this.setState(state, this.saveOptions)
  }

  setOccurance (event) {
    let {state} = this

    state.options.occurance = event.target.value / OCCURANCE_SCALE

    this.setState(state, this.saveOptions)
  }
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(DEFAULT_OPTIONS, function (options) {
    React.render(<OptionsPage options={options} />, document.body)
  })
})
