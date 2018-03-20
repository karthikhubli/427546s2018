var finalList = new Array();
var whSize=8;
var score=0;
var whScale=20;

function updateValues(){
	whSize=document.getElementById("wheelSize").value;
    score=document.getElementById("drScore").value;
}
function resetScore(){
	document.getElementById("wheelSize").value=8;
    document.getElementById("drScore").value=100;
    document.getElementById("itSld").value=8;
    document.getElementById("frSld").value=100;
    updateValues();
}

function setup() {
    createCanvas(1400,700);
    whSize=document.getElementById("wheelSize").value;
    score=document.getElementById("drScore").value;
    console.log('whSize-'+whSize)
    console.log('score-'+score)
    fill(15);
    drawAcualWheel(whSize)
}

function draw() {
    background(230);
	translate(700,400);
    stroke(0);
    strokeWeight(4);
    line(0,-400,0,300)
    textSize(20);
    strokeWeight(1)
    text('Wheel after correction', 20, -370);
    text('Wheel before correction', -680, -370);
    drawAcualWheel();
    drawNewWheel();
    //noLoop();
    
}

function drawAcualWheel(){
	console.log('Size-'+whSize)
	var ogWheelCenter=createVector(-350,0);
	stroke(15);
    strokeWeight(whScale*(1+(whSize/10)));
    noFill()
	ellipse(ogWheelCenter.x, ogWheelCenter.y, whSize*whScale,whSize*whScale);
	drawNuts(ogWheelCenter);
}
function drawNewWheel(){
	var newWheelCenter=createVector(350,0);
	stroke(15);
	noFill();
    strokeWeight(whScale*(1+(whSize/10)));
	if(score >=80){
		ellipse(newWheelCenter.x, newWheelCenter.y, whSize*whScale,whSize*whScale*(score/100));
	}else{
		polygon(newWheelCenter.x, newWheelCenter.y, (whSize*whScale)/2, score);
	}
	drawNuts(newWheelCenter)
}
function drawNuts(center){
	var dmvScale=15*(whSize/15);
	var nOffset=3*dmvScale;
	fill(15);
	stroke(15);
    strokeWeight(2);
	polygon(center.x, center.y, 2*dmvScale, 6);
	/*ellipse(center.x+nOffset, center.y, 0.25*dmvScale,0.25*dmvScale);
	ellipse(center.x-nOffset, center.y, 0.25*dmvScale,0.25*dmvScale);
	ellipse(center.x, center.y+nOffset, 0.25*dmvScale,0.25*dmvScale);
	ellipse(center.x, center.y-nOffset, 0.25*dmvScale,0.25*dmvScale);*/
	
	polygon(center.x+nOffset, center.y, 0.35*dmvScale,5);
	polygon(center.x-nOffset, center.y, 0.35*dmvScale,5);
	polygon(center.x, center.y+nOffset, 0.35*dmvScale,5);
	polygon(center.x, center.y-nOffset, 0.35*dmvScale,5);
}
function polygon(x, y, radius, npoints) {
	  var angle = TWO_PI / npoints;
	  beginShape();
	  for (var a = 0; a < TWO_PI; a += angle) {
	    var sx = x + cos(a) * radius;
	    var sy = y + sin(a) * radius;
	    vertex(sx, sy);
	  }
	  endShape(CLOSE);
	}
