# circleTimer
A JS class for making circular / radial timers and clocks

## Installation

Use npm to add the module to your project:

```sh
npm install -S circle-timer
```

## Usage

Import it into your code:

```js
import CircleTimer from 'circle-timer';
```

Instantiate the timer object. Use the `new` keyword and pass it a single configuration argument:

```js
this.circleTimer = new CircleTimer({
  rootElement: document.getElementById('my-circle-timer')
})
```

Possible settings and their defaults:

**rootElement**  
The DOM element that the circle will be attached to. Defaults to the body tag.

**circleDuration**  
The number of seconds that the entire circle represents. Defaults to 60.

**timerDuration**  
The number of seconds that will be counted down. Defaults to 60.

**timerClass**  
An additional class (or classes) that will be added to the circle timer element.

**radius**  
The radius of the circle. Defaults to 200.

**units**  
The units used for radius and thickness. Defaults to 'px'.

**color**  
The foreground color of the circle's ring. Defaults to 'lightskyblue'.

**backgroundRingColor**  
The background color of the circle's ring. The color that's visible as the time slips away. Defaults to 'gainsboro' (a light gray).

**backgroundRingShadow**  
The inner shadow of the circle's ring. Defaults to 'inset 0 0 5px rgba(0, 0, 0, 0.1)'.

**thickness**  
The thickness of the circle's ring. Defaults to 25.

**style**  
The style of the circle's ring. Accepts a valid `border-style` value. Values other than `solid` may result in odd visuals. Defaults to 'solid'.

## Methods

**startTimer**  
Takes no arguments. Starts the clock.

**pauseTimer**  
Takes no arguments. Pauses the clock.

**resetTimer**  
Takes no arguments. Resets the timer to its initial duration.

**updateTimer**  
Takes a configuration object as its only argument. Allows you to change `circleDuration` and `timerDuration`. Resets the timer.

## Usage in React

The simplest way to use this with react is inside of `componentDidMount`. For example:

```js
componentDidMount(){
  var element = document.getElementById('circle-timer');
  this.circleTimer = new CircleTimer({
    rootElement: element,
    color: 'red',
    backgroundRingColor: 'gray',
  })
}
```