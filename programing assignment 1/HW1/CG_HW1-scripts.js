var canvas,
	ctx;
//To manipulate a pixel
var pixId,
	d;
var dragging = false;
var initialPoint = 0;
var state;
var drawLn = false;
var drawCirc = false;
var drawEll = false;
var drawPolygon = false;
var drawPolyline = false;
var drawRect = false;

var pixelSize = 1;
var col = hexToRGB(document.getElementById("strokeColor").value);
window.addEventListener('load', init, false);

function recordState() {
	state = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function setState() {
	ctx.putImageData(state, 0, 0);
}

function init() {
	console.log('Inside init()')
	canvas = document.querySelector('canvas');
	ctx = canvas.getContext("2d");
	canvas.width = 0.75 * (window.innerWidth);
	canvas.height = 0.7 * (window.innerHeight);

	pixId = ctx.createImageData(pixelSize, pixelSize);
	d = pixId.data;

	canvas.addEventListener('mousedown', startPoint, false);
	canvas.addEventListener('mousemove', drag, false);
	canvas.addEventListener('mouseup', endPoint, false);
}

function drawShape(position) {
	if (drawCirc) {
		drawCircle(position);
	} else if (drawEll) {
		drawEllipse(position);
	} else if (drawLn) {
		//drawLineRb(position);
		drawLine(position);
	} else if (drawPolygon) {
		drawPoly(position);
	} else if (drawPolyline) {
		drawPolyln(position);
	} else if (drawRect) {
		drawRectangle(position);
	}
}
function startPoint(event) {
	console.log('Inside startPoint(' + getCanvasCoordinates(event).x + ',' + getCanvasCoordinates(event).y + ')');
	col = hexToRGB(document.getElementById("strokeColor").value);
	dragging = true;
	if (initialPoint == 0 || !drawPolyline) {
		initialPoint = getCanvasCoordinates(event);
	}
	recordState();
}
function drag(event) {
	var position;
	if (dragging) {
		//console.log('Inside drag(' + getCanvasCoordinates(event).x + ',' + getCanvasCoordinates(event).y + ')');
		setState();
		position = getCanvasCoordinates(event);
		drawShape(position);
	}
}
function endPoint(event) {
	console.log('Inside endPoint(' + getCanvasCoordinates(event).x + ',' + getCanvasCoordinates(event).y + ')')
	dragging = false;
	var position = getCanvasCoordinates(event);
	setState();
	drawShape(position);
	if (drawPolyline) {
		initialPoint = position;
	}
}

//Shapes
function drawLine(position) {
	var x2 = position.x;
	var y2 = position.y;
	var x1 = initialPoint.x;
	var y1 = initialPoint.y;
	var temp;
	var dx = Math.abs(x1 - x2);
	var dy = Math.abs(y1 - y2);
	var largeSlope = false;
	var incry;
	if (dy > dx) {
		//swap points
		temp = x1;
		x1 = y1;
		y1 = temp;
		temp = x2;
		x2 = y2;
		y2 = temp;
		temp = dy;
		dy = dx;
		dx = temp;
		largeSlope = true;
	}

	if (x1 > x2) {
		temp = x1;
		x1 = x2;
		x2 = temp;
		temp = y1;
		y1 = y2;
		y2 = temp;
	}
	if (y1 > y2) {
		incry = -1;
	} else {
		incry = 1;
	}
	var del = 2 * dy - dx;
	var goE = 2 * dy;
	var goNE = 2 * (dy - dx);

	while (x1 < x2) {
		if (del <= 0)
			del += goE;else {
			del += goNE;
			y1 += incry;
		}
		x1++;
		if (largeSlope)
			setPixel(y1, x1);
		else
			setPixel(x1, y1);
	}

}
function drawCircle(pos) {
	var r = Math.sqrt(Math.pow((initialPoint.x - pos.x), 2) + Math.pow((initialPoint.y - pos.y), 2));
	/*ctx.beginPath();
	ctx.arc(initialPoint.x, initialPoint.y, r, 0, 2 * Math.PI);
	ctx.stroke();*/
	var p;
	var x,
		y;
	var xc = initialPoint.x;
	var yc = initialPoint.y;
	p = 1 - r;
	x = 0;
	y = r;
	transform(x, y, xc, yc);

	while (x <= y) {
		x++;
		if (p < 0) {
			p += 2 * x + 1;
		} else {
			p += 2 * (x - y) + 1;
			y--;
		}

		transform(x, y, xc, yc);
	}
}

function drawEllipse(pos) {
	var rX = Math.sqrt(Math.pow((initialPoint.x - pos.x), 2) + Math.pow((initialPoint.y - pos.y), 2));
	var rY = 0.5 * rX;
	var incl = Math.atan2((initialPoint.y - pos.y), (initialPoint.x - pos.x));
	var x0 = initialPoint.x;
	var y0 = initialPoint.y;
	var X = rX;
	var Y = 0;
	var err = 0;

	var ASq = rX * rX;
	var BSq = rY * rY;
	var twoBSq = 2 * BSq;
	var twoASq = 2 * ASq;
	var ABSq = ASq * BSq;
	var BSqXSq = BSq * X * X;
	var stoppingX = twoBSq * X;
	var stoppingY = 0;

	while (stoppingX >= stoppingY) {
		setPoints(X, x0, Y, y0)
		Y++;
		stoppingY += twoASq;
		err = BSqXSq + ASq * Y * Y - ABSq + stoppingY + ASq;
		if (2 * err + BSq - stoppingX > 0) {
			X--;
			stoppingX -= twoBSq;
			BSqXSq = BSq * X * X;
		}
	}

	X = 0;
	Y = rY;
	err = 0;
	var ASqYSq = ASq * Y * Y;
	var stoppingX = 0;
	var stoppingY = twoASq * Y;
	while (stoppingY > stoppingX) {
		setPoints(X, x0, Y, y0)
		X++;
		stoppingX += twoBSq;
		err = ASqYSq + BSq * X * X - ABSq + stoppingY + ASq;
		if (2 * err + BSq - stoppingX > 0) {
			Y--;
			stoppingY -= twoASq;
			ASqYSq = ASq * Y * Y;
		}
	}
	function setPoints(X, x0, Y, y0) {
		setPixel(X + x0, Y + y0);
		setPixel(-X + x0, Y + y0);
		setPixel(-X + x0, -Y + y0);
		setPixel(X + x0, -Y + y0);
	}
}
function drawPoly(pos) {
	var coordinates = [];
	var r = Math.sqrt(Math.pow((initialPoint.x - pos.x), 2) + Math.pow((initialPoint.y - pos.y), 2));

	var sides = document.getElementById("numberOfSidesV").value;
	var angle = (Math.PI) / sides;
	for (var i = 0; i < sides; i++) {
		coordinates.push({
			x : (initialPoint.x + r * Math.cos(angle)),
			y : (initialPoint.y - r * Math.sin(angle))
		});
		angle = angle + ((2 * Math.PI) / sides);
	}
	ctx.beginPath();
	ctx.strokeStyle = document.getElementById("strokeColor").value;
	ctx.moveTo(coordinates[0].x, coordinates[0].y);
	for (var i = 0; i < sides; i++) {
		ctx.lineTo(coordinates[i].x, coordinates[i].y);
	}
	ctx.closePath();
	ctx.stroke();
}
function drawRectangle(pos) {
	var h = Math.sqrt(Math.pow((initialPoint.x - pos.x), 2) + Math.pow((initialPoint.y - initialPoint.y), 2));
	var w = Math.sqrt(Math.pow((pos.x - pos.x), 2) + Math.pow((initialPoint.y - pos.y), 2));
	ctx.beginPath();
	ctx.strokeStyle = document.getElementById("strokeColor").value;
	ctx.rect(initialPoint.x, initialPoint.y, h, w);
	console.log(initialPoint.x, initialPoint.y, h, w);
	ctx.closePath();
	ctx.stroke();
}
function drawPolyln(pos) {
	drawLine(pos);

}

//UI functions
function showForm(obj) {
	var polygonRange = document.getElementById("polygonRange");
	if (obj.value === 'line') {
		drawLn = true;
		drawCirc = false;
		drawEll = false;
		drawPolygon = false;
		drawPolyline = false;
		drawRect = false;
		polygonRange.style.display = "none";
	} else if (obj.value === 'circle') {
		drawLn = false;
		drawCirc = true;
		drawEll = false;
		drawPolygon = false;
		drawRect = false;
		drawPolyline = false;
		polygonRange.style.display = "none";
	} else if (obj.value === 'ellipse') {
		drawLn = false;
		drawCirc = false;
		drawEll = true;
		drawPolygon = false;
		drawPolyline = false;
		drawRect = false;
		polygonRange.style.display = "none";
	} else if (obj.value === 'polygon') {
		drawLn = false;
		drawCirc = false;
		drawEll = false;
		drawPolygon = true;
		drawPolyline = false;
		drawRect = false;
		polygonRange.style.display = "block";
	} else if (obj.value === 'polyline') {
		drawLn = false;
		drawCirc = false;
		drawEll = false;
		drawPolygon = false;
		drawPolyline = true;
		drawRect = false;
		initialPoint = 0;
		polygonRange.style.display = "none";
	} else if (obj.value === 'rectangle') {
		drawLn = false;
		drawCirc = false;
		drawEll = false;
		drawPolygon = false;
		drawPolyline = false;
		drawRect = true;
		polygonRange.style.display = "none";
	}
}

//Util functions
function getCanvasCoordinates(event) {
	var x = event.clientX - canvas.getBoundingClientRect().left;
	var y = event.clientY - canvas.getBoundingClientRect().top;
	return {
		x : x,
		y : y
	};
}
function setPixel(x, y) {
	d[0] = col[0];
	d[1] = col[1];
	d[2] = col[2];
	d[3] = 255;
	ctx.putImageData(pixId, x, y);
	ctx.fill()
}
function transform(x, y, xc, yc) {
	setPixel(xc + x, yc + y);
	setPixel(xc + x, yc - y);
	setPixel(xc - x, yc + y);
	setPixel(xc - x, yc - y);
	setPixel(xc + y, yc + x);
	setPixel(xc - y, yc + x);
	setPixel(xc + y, yc - x);
	setPixel(xc - y, yc - x);
}
function hexToRGB(colour) {
	var r,
		g,
		b;
	if (colour.charAt(0) == '#') {
		colour = colour.substr(1);
	}

	r = colour.charAt(0) + '' + colour.charAt(1);
	g = colour.charAt(2) + '' + colour.charAt(3);
	b = colour.charAt(4) + '' + colour.charAt(5);

	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);
	return [ r, g, b ];
}
function clearPixel(x, y) {
	d[0] = 255;
	d[1] = 255;
	d[2] = 255;
	d[3] = 255;
	ctx.putImageData(pixId, x, y);
}
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	initialPoint = 0;

}