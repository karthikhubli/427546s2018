var mCanvas;
var xCanvas, yCanvas, xCanvas;
var mCtx, xCtx, yCtx, zCtx;
// To manipulate a pixel
var pixId, d;
var dragging = false;
var visibleGrid=true;
var lnWidth=1;
var subCanW= 0.45 * (window.innerWidth);
var subCanH= 0.65 * (window.innerHeight);
var initialPointM = 0;
var state;
var pixelSize = 1;
var gridSize=30;
var col = hexToRGB(document.getElementById("strokeColor").value);
window.addEventListener('load', init, false);

	
function recordState(context,canvas) {
	state = context.getImageData(0, 0, canvas.width, canvas.height);
}

function setState(context) {
	context.putImageData(state, 0, 0);
}

function drawGrid(canvas, context) {
	var x = 0;
	var y = 0;
	context.beginPath();
	context.lineWidth = 0.15;
	context.strokeStyle = 'black';
	for (var i = 0; i < canvas.width / gridSize; i++) {
		context.moveTo(x, y);
		context.lineTo(x, y + canvas.height);
		x = x + gridSize;
	}
	x = 0;
	y = 0;
	for (var i = 0; i < canvas.height / gridSize; i++) {
		context.moveTo(x, y);
		context.lineTo(x + canvas.width, y);
		y = y + gridSize;
	}
	context.stroke();
}

function init() {
	console.log('Inside init()');
	
	mCanvas = document.getElementById('myMCanvas');
	mCtx = mCanvas.getContext("2d");
	mCtx.strokeStyle='red';
	mCanvas.width = subCanW;
	mCanvas.height = subCanH;
	

	xCanvas = document.getElementById('myXCanvas');
	xCtx = xCanvas.getContext("2d");
	xCtx.strokeStyle='blue';
	xCanvas.width = subCanW
	xCanvas.height = subCanH;

	yCanvas = document.getElementById('myYCanvas');
	yCtx = yCanvas.getContext("2d");
	yCtx.strokeStyle='green';
	yCanvas.width =subCanW;
	yCanvas.height =subCanH;

	zCanvas = document.getElementById('myZCanvas');
	zCtx = zCanvas.getContext("2d");
	zCtx.strokeStyle='black';
	zCanvas.width = subCanW;
	zCanvas.height = subCanH;
	
	

	/*pixId = ctx.createImageData(pixelSize, pixelSize);
	d = pixId.data;*/

	//Main event listner
	mCanvas.addEventListener('mousedown', startPointM, false);
	mCanvas.addEventListener('mousemove', dragM, false);
	mCanvas.addEventListener('mouseup', endPointM, false);
	
	//X event Listner
	xCanvas.addEventListener('mousedown', startPointX, false);
	xCanvas.addEventListener('mousemove', dragX, false);
	xCanvas.addEventListener('mouseup', endPointX, false);
	
	//Y event listner
	yCanvas.addEventListener('mousedown', startPointY, false);
	yCanvas.addEventListener('mousemove', dragY, false);
	yCanvas.addEventListener('mouseup', endPointY, false);
	
	//Z event Listner
	zCanvas.addEventListener('mousedown', startPointZ, false);
	zCanvas.addEventListener('mousemove', dragZ, false);
	zCanvas.addEventListener('mouseup', endPointZ, false);
	
	
	if(visibleGrid){
		drawGrid(mCanvas,mCtx);
		drawGrid(xCanvas,xCtx);
		drawGrid(yCanvas,yCtx);
		drawGrid(zCanvas,zCtx);
	}
}

function startPointM(event) {
	//console.log('startPointM')
	col = hexToRGB(document.getElementById("strokeColor").value);
	dragging = true;
	if (initialPointM ==0) {
		initialPointM = getCanvasCoordinates(event,mCanvas);
	}
	recordState(mCtx,mCanvas);
}
function dragM(event) {
	//console.log(getCanvasCoordinates(event,mCanvas))
	var position;
	if (dragging) {
		
		setState(mCtx);
		position = getCanvasCoordinates(event,mCanvas);
		//drawShape(position);
	}
}
function endPointM(event) {
	//console.log('Inside endPoint')
	dragging = false;
	var position = getCanvasCoordinates(event,mCanvas);
	setState(mCtx);
	//drawShape(position);

}
//X event Listner
function startPointX(event){
	//console.log('startPointX')
}
function dragX(event){
	//console.log(getCanvasCoordinates(event,xCanvas))
}
function endPointX(){
	//console.log('endPointX')
}
//Y event Listner
function startPointY(event){
	//console.log('startPointY')
}
function dragY(event){
	//console.log('dragY')
}
function endPointY(){
	//console.log('endPointY')
}
//Z event Listner
function startPointZ(event){
	//console.log('startPointZ')
}
function dragZ(event){
	//console.log('dragZ')
}
function endPointZ(){
	//console.log('endPointZ')
}

// Shapes
function drawLine(position,canvas,context,startLocation) {
	context.beginPath();
	context.lineWidth = lnWidth;
	context.strokeStyle = 'black';
	context.moveTo(startLocation.x, startLocation.y);
	context.lineTo(position.x,position.y);
	context.stroke();
	
}
function drawCircle(pos) {}

function drawEllipse(pos) {}
function drawPoly(pos,context) {}
function drawRectangle(pos,context) {}
function drawPolyln(pos) {}

// UI functions
function showForm(obj) {}

// Util functions
function getCanvasCoordinates(event,canvas) {
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
	var r, g, b;
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
	mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);
	xCtx.clearRect(0, 0, xCanvas.width, xCanvas.height);
	yCtx.clearRect(0, 0, yCanvas.width, yCanvas.height);
	zCtx.clearRect(0, 0, zCanvas.width, ZCanvas.height);
	initialPointM = 0;

}