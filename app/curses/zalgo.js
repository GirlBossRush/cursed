let
  zeroWidthSpace = "\u200B",
  characters = {}

characters.up = [
  "\u030d", /*  ̍  */ "\u030e", /*  ̎  */ "\u0304", /*  ̄  */ "\u0305", /*  ̅  */
  "\u033f", /*  ̿  */ "\u0311", /*  ̑  */ "\u0306", /*  ̆  */ "\u0310", /*  ̐  */
  "\u0352", /*  ͒  */ "\u0357", /*  ͗  */ "\u0351", /*  ͑  */ "\u0307", /*  ̇  */
  "\u0308", /*  ̈  */ "\u030a", /*  ̊  */ "\u0342", /*  ͂  */ "\u0343", /*  ̓  */
  "\u0344", /*  ̈́  */ "\u034a", /*  ͊  */ "\u034b", /*  ͋  */ "\u034c", /*  ͌  */
  "\u0303", /*  ̃  */ "\u0302", /*  ̂  */ "\u030c", /*  ̌  */ "\u0350", /*  ͐  */
  "\u0300", /*  ̀  */ "\u0301", /*  ́  */ "\u030b", /*  ̋  */ "\u030f", /*  ̏  */
  "\u0312", /*  ̒  */ "\u0313", /*  ̓  */ "\u0314", /*  ̔  */ "\u033d", /*  ̽  */
  "\u0309", /*  ̉  */ "\u0363", /*  ͣ  */ "\u0364", /*  ͤ  */ "\u0365", /*  ͥ  */
  "\u0366", /*  ͦ  */ "\u0367", /*  ͧ  */ "\u0368", /*  ͨ  */ "\u0369", /*  ͩ  */
  "\u036a", /*  ͪ  */ "\u036b", /*  ͫ  */ "\u036c", /*  ͬ  */ "\u036d", /*  ͭ  */
  "\u036e", /*  ͮ  */ "\u036f", /*  ͯ  */ "\u033e", /*  ̾  */ "\u035b", /*  ͛  */
  "\u0346", /*  ͆  */ "\u031a" /*  ̚  */
]

characters.down = [
  "\u0316", /*  ̖  */ "\u0317", /*  ̗  */ "\u0318", /*  ̘  */ "\u0319", /*  ̙  */
  "\u031c", /*  ̜  */ "\u031d", /*  ̝  */ "\u031e", /*  ̞  */ "\u031f", /*  ̟  */
  "\u0320", /*  ̠  */ "\u0324", /*  ̤  */ "\u0325", /*  ̥  */ "\u0326", /*  ̦  */
  "\u0329", /*  ̩  */ "\u032a", /*  ̪  */ "\u032b", /*  ̫  */ "\u032c", /*  ̬  */
  "\u032d", /*  ̭  */ "\u032e", /*  ̮  */ "\u032f", /*  ̯  */ "\u0330", /*  ̰  */
  "\u0331", /*  ̱  */ "\u0332", /*  ̲  */ "\u0333", /*  ̳  */ "\u0339", /*  ̹  */
  "\u033a", /*  ̺  */ "\u033b", /*  ̻  */ "\u033c", /*  ̼  */ "\u0345", /*  ͅ  */
  "\u0347", /*  ͇  */ "\u0348", /*  ͈  */ "\u0349", /*  ͉  */ "\u034d", /*  ͍  */
  "\u034e", /*  ͎  */ "\u0353", /*  ͓  */ "\u0354", /*  ͔  */ "\u0355", /*  ͕  */
  "\u0356", /*  ͖  */ "\u0359", /*  ͙  */ "\u035a", /*  ͚  */ "\u0323" /*  ̣  */
]

characters.middle = [
  "\u0315", /*  ̕  */ "\u031b", /*  ̛  */ "\u0340", /*  ̀  */ "\u0341", /*  ́  */
  "\u0358", /*  ͘  */ "\u0321", /*  ̡  */ "\u0322", /*  ̢  */ "\u0327", /*  ̧  */
  "\u0328", /*  ̨  */ "\u0334", /*  ̴  */ "\u0335", /*  ̵  */ "\u0336", /*  ̶  */
  "\u034f", /*  ͏   */ "\u035c", /*  ͜  */ "\u035d", /*  ͝  */ "\u035e", /*  ͞   */
  "\u035f", /*  ͟   */ "\u0360", /*  ͠  */ "\u0362", /*  ͢  */ "\u0338", /*  ̸  */
  "\u0337", /*  ̷  */ "\u0361", /*  ͡  */ "\u0489"  /*  ҉_    */
]

characters.all = [].concat(characters.up, characters.down, characters.middle)

function randomUpTo (max) {
  return Math.floor(Math.random() * max)
}

const getStyle = {
  minimum () {
    return {
      up: randomUpTo(8),
      middle: randomUpTo(2),
      down: randomUpTo(8)
    }
  },
  normal () {
    return {
      up: randomUpTo(16) / 2 + 1,
      middle: randomUpTo(6) / 2,
      down: randomUpTo(16) / 2 + 1
    }
  },
  maximum () {
    return {
      up: randomUpTo(64) / 4 + 3,
      middle: randomUpTo(16) / 4 + 1,
      down: randomUpTo(64) / 4 + 3
    }
  }
}

function randomZalgoCharacter (array) {
  let index = Math.floor(Math.random() * array.length)

  return array[index]
}

function isZalgoCharacter (character) {
  return characters.all.indexOf(character) !== -1
}

function zalgo (input, options) {
  let
    directions = ["up", "middle", "down"],
    output = "",
    style = getStyle[options.style]()

  function appendZalgoCharacter (type) {
    if (!options[type]) return

    for (let j = 0; j < style[type]; j++) {
      // Zero width space seems to correct some encoding issue.
      output += zeroWidthSpace + randomZalgoCharacter(characters[type])
    }
  }

  for (let i = 0; i < input.length; i++) {
    let character = input.substr(i, 1);

    if (character === zeroWidthSpace || isZalgoCharacter(character)) continue

    // Add the normal character.
    output += input.substr(i, 1)

    directions.forEach(appendZalgoCharacter)
  }

  return output
}

function textNodesUnder (el) {
  let
    node,
    nodes = [],
    walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false)

  while (node = walk.nextNode()) {
    nodes.push(node)
  }

  return nodes
}

function isNodeInViewport (node) {
  if (!node.parentElement) return false

  let
    rect = node.parentElement.getBoundingClientRect()

  return rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
}

function flickerZalgo (node) {
  let
    originalData = node.data,
    delay = {
      initial: Math.floor(1000000 * Math.random()),
      subsequent: Math.floor(1000 * Math.random())
    }

  setTimeout(function () {
    if (!isNodeInViewport(node)) return

    node.data = zalgo(originalData, {
      middle: true,
      down: true,
      style: "minimum"
    })

    setTimeout(function () {
      node.data = originalData
    }, delay.subsequent)
  }, delay.initial)
}

export default function (options = {}) {
  let
    scrolling = false,
    nodes = textNodesUnder(document.body).filter(function (node) {
      return node.data.length
    })

  window.addEventListener("scroll", function () {
    if (scrolling) return
    scrolling = true

    let randomDivisible = Math.floor(Math.random() * 10)

    function divisbleBy (node, index) {
      return index % randomDivisible === 0
    }

    nodes.filter(isNodeInViewport).filter(divisbleBy).forEach(flickerZalgo)
    scrolling = false
  })
}
