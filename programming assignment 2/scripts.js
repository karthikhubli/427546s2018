var canvas;
var ctx;
var pA={x:250,y:35050};
var pB={x:650,y:3500}
function openCity(evt, fractName) {
	var i,
		tabcontent,
		tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(fractName).style.display = "block";
	evt.currentTarget.className += " active";
	setUpCanvas(fractName);
}

function setUpCanvas(fractName) {
	
	if (fractName == 'F1') {
			initFractal();
	} else if (fractName == 'F2') {
		initIpsalege();
		//ctx.fillStyle = "#F05000";
	} else if (fractName == 'F3') {
		ctx.fillStyle = "#F0A000";
	}
	
}
function initFractal(){
	canvas = document.getElementById("fractCan_F1");
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "#FFFF";
	ctx.translate(0, canvas.height);
	ctx.scale(1, -1);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	pA={x:350,y:150};
	pB={x:canvas.width-350,y:150}
	//drawFract(0);
}
function drawFract(iteration) {
	clearCan(ctx);
	fractal(pA,pB,iteration);
	//getIntermidiatePoints(A,B,5)
}

function fractal(A, B, depth){
	console.log('-------In Fractal-----')
	console.log(A)
	console.log(B)
	console.log(depth)
    if (depth < 0){
        return null;
    }
    DrawLine(A, B, "black");

    if (depth !=0){/*
        for (var i=0;i<10;i++)
            DrawLine(C, D, "white");
    */};
    var pts=new Array();
    pts=getIntermidiatePoints(A,B,3);
    console.log('in main')
    //console.log(pts)
    for(i=0;i<pts.length-1;i++){
    	DrawLine(pts[i], pts[i+1], "blue");
    	fractal(pts[i],pts[i+1],depth-1);
    }
    console.log('-------End Fractal-----')
}
function multiply(v, num){
    return [v.x*num, v.y*num];
};

function divide(v, num){
    return [v.x/num, v.y/num];
};
 
function add(a, b){
    return [a.x+b.x, a.y+b.y];
};

function minus(a, b){
    return [a.x-b.x, a.y-b.y];
};

function length(a, b){
    return Math.sqrt(Math.pow(a.x - b.x,2) + 
                     Math.pow(a.y - b.y,2));
};

function DrawLine(a, b, c){
	console.log('draw line')
	console.log(a)
    ctx.beginPath();
    ctx.strokeStyle = c;
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.closePath();
}
function clearCan(contx){
	contx.fillStyle = canvColor;
	contx.fillRect(0, 0, canvas.width, canvas.height);
	
}

function drawArcFract(iteration){
	ctx.beginPath();
	var x=250
	var y=50
	var rad=350
	if(iteration==0){
	ctx.arc(x, y,rad, 0,  Math.PI,false);
	}else{
		drawcurves(x,y,rad,iteration);
	}
	ctx.stroke();
}
function drawcurves(x,y,rad,iteration){
	var ang=(2*Math.PI)/iteration;
	var nRad=rad/iteration;
	var dir=false;
	for(var i =0;i<iteration;i++){
		if(i%2 != 0){
			dir=true;
		}
		ctx.arc(x*(Math.cos(i*ang)), y*Math.sign(i*ang),nRad, 0,  Math.PI,dir);
	}
}

function getIntermidiatePoints(A,B,ratio){
	var totlen=length(A,B);
	console.log('Total len-'+totlen);
	var len=totlen/ratio;
	console.log('individual length-'+len);
	var P1=[];
	var Pn=new Array;
	Pn.push(A);
	Pn.push({x:0,y:0});
	for(i=1;i<ratio;i++){
		console.log(A.x+(i*len*(B.x-A.x))/totlen);
		Pn.push({x:A.x+(i*len*(B.x-A.x))/totlen,y:A.y+(i*len*(B.y-A.y))/totlen});
		Pn.push({x:0,y:0});
	}
	Pn.push(B)
	for(var i=0;i<Pn.length-1;i++){
		if(i%2 != 0){
			var mp=getMidpoint(Pn[i-1],Pn[i+1]);
			Pn[i]=mp
		}
	}
	for(var i=0;i<Pn.length-1;i++){
		DrawLine(Pn[i],Pn[i+1], 'red')
	}
	//console.log(Pn);
	return Pn;
}
function getMidpoint(A,B){
	var m= {x:(A.x+B.x)/2,y:(A.y + B.y)*0.7333};
	return m
}