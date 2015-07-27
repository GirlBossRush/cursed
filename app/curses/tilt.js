function tilt (element) {
  if (Math.random() < 0.5) return

  element._offset *= 1.0005

  element.style.transform = `rotate(${element._offset}deg) translateX(${element._offset * 5}px)`
}

export default function cast (options = {}) {
  let
    interval = options.interval || 5000,
    elements = Array.from(document.querySelectorAll("div, header, footer, img, p, span"))


  elements.forEach(function (element) {
    element._offset = 0.2
    element.style.transformOrigin = "left top"
    element.style.transition = "transform 3s ease-in"
  })

  setInterval(function () {
    requestAnimationFrame(function () {
      elements.forEach(tilt)
    })
  }, interval)
}

