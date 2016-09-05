var rocky = require('rocky');

var settings = null;

var watchface = {
	initialized: false
};

function Rectangle(attrs) {
	this.attrs = attrs;
	
	this.draw = function (ctx) {
		//console.log('drawshape');
		//console.log(JSON.stringify(this.attrs));
		
		ctx.fillStyle = this.attrs.fillStyle;
		ctx.fillRect(
			this.attrs.startX,
			this.attrs.startY,
			this.attrs.width,
			this.attrs.height
		);
		
	};
}

function TextField(attrs) {
	this.attrs = attrs;
	
	this.draw = function (ctx) {
		//console.log('drawshape');
		//console.log(JSON.stringify(this.attrs));
		
		ctx.fillStyle = this.attrs.fillStyle;
		ctx.textAlign = this.attrs.textAlign;
		
		ctx.fillText(this.attrs.value, this.attrs.startX, this.attrs.startY, this.attrs.width);
	};
}

var background = new Rectangle({
	fillStyleKey: 'colorBackground',
	fillStyle   : 'white',
	startX      : 0,
	startY      : 0,
	width       : 0,
	height      : 0,
});

var label = new TextField({
	fillStyleKey: 'colorLabel',
	fillStyle   : 'black',
	textAlign   : 'center',
	font: '14px Gothic',
	value       : new Date().toLocaleTimeString(),
	startX      : 0,
	startY      : 0,
	width: 0,
	height: 15
});

var fieldsWithSettings = [label, background];

//The First draw, setting up valuables that don't have to be recalculated all the time
function init(canvas) {
	
	// Determine the width and height of the display
	background.attrs.width  = canvas.unobstructedWidth;
	background.attrs.height = canvas.unobstructedHeight;
	
	label.attrs.startX = (background.attrs.width / 2);
	label.attrs.startY = (background.attrs.height / 2)
	label.attrs.width = background.attrs.width;
	
	// Request settings from pebblekit
	rocky.postMessage({command: 'settings'});
	
	watchface.initialized = true;
};

//Messy but a way to apply settings via convention.
// Currently only supports fillColor application by providing a fillColorKey to a field
// To be expanded to support toggles and values, probably with a prefix paradign for appkeys by type
function applySettings() {
	//Apply settings if present
	if (settings) {
		var drawQueued = false;
		
		//Iterate all settings objects
		Object.keys(settings).forEach(function (key) {
			//find the corrosponding field to put setting on
			var matches = fieldsWithSettings.filter(function (field) {
				return (field.attrs.fillStyleKey && field.attrs.fillStyleKey === key);
			});
			
			if (matches.length) {
				matches.forEach(function(match) {
					match.attrs.fillStyle = cssColor(settings[key]);
				});
				
				drawQueued = true;
				
			}
		});
		
		if (drawQueued) {
			rocky.requestDraw();
		}
	}
}

rocky.on('draw', function (event) {
	console.log('Rocky draw invoked.');
	
	// Get the CanvasRenderingContext2D object
	var ctx = event.context;
	
	if (!watchface.initialized) {
		init(ctx.canvas);
	} else {
		// Clear the screen
		ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	}
	
	background.draw(ctx);
	label.draw(ctx);
});

rocky.on('message', function (event) {
	settings = event.data;
	applySettings();
});

rocky.on('minutechange', function (event) {
	rocky.requestDraw();
});

////TODO below be libs I want to export into files
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
	
	console.log('cssColor returning', '#' + color);
	
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