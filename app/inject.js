import * as curseHelpers from "curses"
import DEFAULT_OPTIONS from "resources/defaults"

global.chrome.storage.sync.get(DEFAULT_OPTIONS, function ({curses, occurance}) {
  if (Math.random() > occurance) return console.log("Curse avoided...for now.")

  const
    enabled = Object.keys(curses).filter(name => curses[name].isEnabled),
    name = enabled[Math.floor(Math.random() * enabled.length)]

  console.log(enabled, name)

  if (name) {
    curseHelpers[name].call()
  } else {
    console.log("No enabled curses!")
  }
})
