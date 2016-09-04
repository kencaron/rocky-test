var rocky = require('rocky');


var settings = null;

var defaultSettings = {
  ForegroundColor: 'black',
  BackgroundColor: 'white'
};

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  
  var foregroundColor = cssColor(defaultSettings.ForegroundColor);
  var backgroundColor = cssColor(defaultSettings.BackgroundColor);

  if (settings) {
    foregroundColor = cssColor(settings.ForegroundColor);
    backgroundColor = cssColor(settings.BackgroundColor);
  }
  
  // Current date/time
  var d = new Date();

  // Set the text color
  ctx.fillStyle = backgroundColor;
  
  //set the bg color
  ctx.fillRect(0, 0, w, h);

  
  ctx.fillStyle = foregroundColor;
  // Center align the text
  ctx.textAlign = 'center';

  // Display the time, in the middle of the screen
  ctx.fillText(d.toLocaleTimeString(), w / 2, h / 2, w);
});

rocky.on('message', function(event) {
  console.log('message', JSON.stringify(event));
  console.log('data', JSON.stringify(event.data));
  settings = event.data;
  rocky.requestDraw();
});

rocky.on('minutechange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});

rocky.postMessage({command: 'settings'});





// Borrowed from Clay.js

/**
 * @param {string|boolean|number} color
 * @returns {string}
 */
function cssColor(color) {
  if (typeof color === 'number') {
    color = color.toString(16);
  } else if (!color) {
    return 'transparent';
  }

  color = padColorString(color);

  return '#' + color;
}

/**
 * @param {string} color
 * @return {string}
 */
function padColorString(color) {
  color = color.toLowerCase();

  while (color.length < 6) {
    color = '0' + color;
  }

  return color;
}
