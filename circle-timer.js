class CircleTimer {
  constructor() {
    const params = arguments[0] || {}
    this.config = {
      rootElement: params.rootElement || params.root || document.getElementsByTagName('body')[0],
      circleDuration: params.circleDuration || params.circleTime || 60,
      initialTimerDuration:  params.timerDuration || params.time || 60,
      timerClass:  params.timerClass || 'timer',
      radius: params.radius || 200,
      units: params.units || 'px',
      color: params.color || 'lightskyblue',
      circleColor: params.backgroundColor || 'transparent',
      backgroundRingColor: params.backgroundRingColor || 'gainsboro',
      backgroundCircleColor: params.backgroundCircleColor || 'transparent',
      backgroundRingShadow: params.innerShadow || 'inset 0 0 5px rgba(0, 0, 0, 0.1)',
      thickness: params.thickness || '2vmin',
      style: params.style || 'solid'
    }
    this.timerDuration = this.config.initialTimerDuration
    this.config.createdOn = Date.now()
    this.element = document.createElement('section')
    this.element.classList.add(this.config.timerClass)
    this.element.style.width = this.element.style.height = (this.config.radius * 2) + this.config.units
    this.config.rootElement.appendChild(this.element)
    this.element.appendChild( this.buildBackgroundRing() )
    this.element.appendChild( this.buildBackgroundRingShadow() )
    this.buildTimer()
  }

  buildTimer() {

    this.segments = Array.from({length:4}, (_,i) => {
      let segment = this.buildSegment(i)
      this.element.appendChild(segment)

      return segment
    })

  }

  buildBackgroundRing() {
    const backgroundRing = document.createElement('div')
    backgroundRing.style.position = 'absolute'
    backgroundRing.style.width = backgroundRing.style.height = (this.config.radius * 2) + this.config.units
    backgroundRing.style.border = `${this.config.thickness} ${this.config.style} ${this.config.backgroundRingColor}`
    backgroundRing.style.borderRadius = '50%'
    backgroundRing.style.boxSizing = 'border-box'
    backgroundRing.style.boxShadow = this.config.backgroundRingShadow

    return backgroundRing
  }

  buildBackgroundRingShadow() {
    const backgroundRingShadow = this.buildBackgroundRing()
    backgroundRingShadow.style.border = 'none'
    backgroundRingShadow.style.boxShadow = this.config.backgroundRingShadow

    return backgroundRingShadow
  }

  buildSegment(i) {
    let percentOfCircle = this.timerDuration / this.config.circleDuration
    let degreesToTravel = percentOfCircle * 360
    let innerOcclusionBox = document.createElement('div')
    let outerOcclusionBox = document.createElement('div')
    let circleSegment = document.createElement('div')
    let translateX = (i < 2) * this.config.radius
    let translateY = (i > 0 && i < 3) * this.config.radius
    let originX = (i > 1) * this.config.radius
    let originY = (i < 1 || i > 2) * this.config.radius
    let initialRotation = Math.max(-90, Math.min(0, -90 + (degreesToTravel - (i * 90)))) + 'deg'
    let quarterTime = this.config.circleDuration / 4
    let transitionTime = Math.max(0,
      Math.min(quarterTime,
        this.timerDuration - (i * quarterTime)
      )
    ) + 's'
    let rotationDelay = Math.max(0, (this.timerDuration - ((i+1) * (this.config.circleDuration / 4)))) + 's'
    innerOcclusionBox.className = 'inner occlusion-box'
    outerOcclusionBox.className = 'outer occlusion-box'

    innerOcclusionBox.style.overflow = outerOcclusionBox.style.overflow = 'hidden'

    innerOcclusionBox.style.position = outerOcclusionBox.style.position = 'absolute'

    circleSegment.classList.add('circle-segment')
    circleSegment.style.position = 'absolute'
    circleSegment.style.borderRadius = '50%'
    circleSegment.style.boxSizing = 'border-box'

    innerOcclusionBox.style.width = innerOcclusionBox.style.height = outerOcclusionBox.style.width = outerOcclusionBox.style.height = this.config.radius + this.config.units
    circleSegment.style.width = circleSegment.style.height = (this.config.radius * 2) + this.config.units

    innerOcclusionBox.style.transition = `transform ${transitionTime} linear ${rotationDelay}`
    innerOcclusionBox.style.transformOrigin = `${originX}${this.config.units} ${originY}${this.config.units}`
    innerOcclusionBox.style.transform = `rotate(${initialRotation})`

    outerOcclusionBox.style.transform =
      `translate(
          ${translateX}${this.config.units},
          ${translateY}${this.config.units})`

    circleSegment.style.transform =
      `translate(
          ${-translateX}${this.config.units},
          ${-translateY}${this.config.units})`
    circleSegment.style.border =
      `${this.config.thickness} ${this.config.style} ${this.config.color}`

    innerOcclusionBox.appendChild(circleSegment)
    outerOcclusionBox.appendChild(innerOcclusionBox)

    return outerOcclusionBox
  }

  startTimer() {
    if (this.running) { return }
    this.running = true
    this.startedOn = Date.now()
    if (!this.segments.length) {
      this.pauseTimer()
    }
    for (let segment of this.segments) {
      setTimeout( function() {
        segment.querySelector('.inner.occlusion-box').style.transform = "rotate(-90deg)"
      }, 1)
    }
  }

  _clearSegments() {
    for (let segment of this.segments) {
      segment.remove()
    }
    this.segments = []
  }

  pauseTimer() {
    if (!this.running) { return }
    this.running = false
    const timeElapsed = (this.startedOn - Date.now()) / 1000
    this.timerDuration += timeElapsed
    this._clearSegments()
    this.buildTimer()
  }

  resetTimer() {
    this.timerDuration = this.config.initialTimerDuration
    this._clearSegments()
    this.buildTimer()
    this.running = false
  }
}

module.exports = CircleTimer