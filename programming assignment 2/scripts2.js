var canvas1;
var ctx1;
var canvas2;
var ctx2;
var scale=10;
var canvColor="#FFFF"
var pixId,
	d;
function initIpsalege(){
	canvas1 = document.getElementById("dmv_1");
	ctx1 = canvas1.getContext("2d");
	ctx1.fillStyle = canvColor;
	ctx1.translate(0, canvas1.height);
	ctx1.scale(1, -1);
	ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
	
	
	canvas2 = document.getElementById("dmv_2");
	ctx2 = canvas2.getContext("2d");
	ctx2.fillStyle = canvColor;
	ctx2.translate(0, canvas2.height);
	ctx2.scale(1, -1);
	ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
	pixId = ctx2.createImageData(1, 1);
	d = pixId.data;
}
function drawWheel(size){
	clearCanvas(ctx1);
	var wheelSize=size.value*scale;
	drawCirc(wheelSize,canvas1,ctx1);
}

function drawCirc(rad,canv,cont){
	var x =canv.width/2;
	var y =canv.height/2;
	drawCircle(x, y, rad*.75,cont);
	drawCircle(x, y, rad,cont);
	drawNuts(cont);
	
}
function drawEllp(size,score,canv,cont){
	var x =canv.width/2;
	var y =canv.height/2;
	cont.beginPath();
	//inner circ
	cont.moveTo(x,y);
	drawEllipse(x, y, size*0.75, size*(score/100)*0.75,0, 2 * Math.PI,true);
	drawEllipse(x, y, size, size*(score/100),0, 2 * Math.PI,true);
	cont.closePath();
	cont.stroke();
	drawNuts(cont);
	
}

function drawCircle(x,y,rad,cont){
	cont.beginPath();
	//inner circ
	cont.moveTo(x,y);
	cont.arc(x, y, rad, 0, 2 * Math.PI,true);
	cont.closePath();
	cont.stroke();
}
function drawPolyWheel(rad,sides,canv,cont){
	var x =canv.width/2;
	var y =canv.height/2;
	
	cont.beginPath();
	//inner circ
	cont.moveTo(x,y);
	
	drawPoly(x, y, rad,sides,cont);
	drawPoly(x, y, rad*.75,sides,cont);
	cont.closePath();
	cont.stroke();
	drawNuts(cont);
}
function drawNuts(cont){
	var x =canvas1.width/2;
	var y =canvas1.height/2;
	drawCircle(x, y, 4*scale,cont);
	drawCircle(x, y+(5*scale), 0.50*scale, cont);
	drawCircle(x, y-(5*scale), 0.50*scale,cont);
	drawCircle(x+(5*scale), y, 0.50*scale,cont);
	drawCircle(x-(5*scale), y, 0.50*scale,cont);

}
function updateWheel(score){
	clearCanvas(ctx2);
	var wheelSize=(document.getElementById("sizeSld").value)*scale;
	var scoreV =score.value;
	if(scoreV >= 80){
		drawEllp(wheelSize,scoreV,canvas2,ctx2);
	}else{
		drawPolyWheel(wheelSize,scoreV,canvas2,ctx2);
	}
	
}

function drawEllipse(x0,y0,rX,rY) {
	var incl = 0;
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
function drawPoly(x,y,radius,sides,cxt) {
	cxt.beginPath();
	cxt.moveTo (x +  radius * Math.cos(0), y +  radius *  Math.sin(0));  
	for (var i = 1; i <= sides;i += 1) {
	    cxt.lineTo (x + radius * Math.cos(i * 2 * Math.PI / sides), y + radius * Math.sin(i * 2 * Math.PI / sides));
	}

	//cxt.strokeStyle = "#000000";
	cxt.lineWidth = 1;
	cxt.stroke();
}
function setPixel(x, y) {
	d[0] = 0;
	d[1] = 0;
	d[2] = 0;
	d[3] = 255;
	ctx2.putImageData(pixId, x, y);
	ctx2.fill()
}
function clearCanvas(contx){
	contx.fillStyle = canvColor;
	contx.fillRect(0, 0, canvas2.width, canvas2.height);
	
}