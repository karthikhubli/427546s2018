var primitive=5;
var cnv=null;
var context=null;
var iter =0;
var colors =['red','blue','green','cyan','violet','orange','yellow']
function updatePrim(prim){
	primitive=prim;
	init();
}
function init(){
	cnv=document.getElementById("myCanvas");
	context=cnv.getContext("2d")
	clearCanvas(context,cnv);
    iter=document.getElementById("itSld").value;
    console.log(iter)
   if(primitive==0){
	   lineFractal([50,300], [cnv.width-50,300], iter);
   }else if(primitive==1){
	   cicFractal([150,300], [cnv.width-150,300], iter);
   }else if(primitive ==2){
	   triangleFractal();
   }else{
	   alert('Select a primitive to start');
   }

};

function lineFractal(A, B, depth){
    if (depth < 0){
        return null;
    }
    var C = divide(add(prod(A, 2), B), 3);
    var D = divide(add(prod(B, 2), A), 3);
    var F = divide(add(A, B), 2);
    var V1 = divide(subt(F, A), pointDist(F, A));
    var V2 = [V1[1], -V1[0]];
    var E = add(prod(V2, Math.sqrt(3)/6 * pointDist(B, A)), F);
    fractLine(A, B, colors[depth]);
    if (depth !=0){
        for (var i=0;i<10;i++)
            fractLine(C, D, "white");
    };
    lineFractal(A, C, depth-1);
    lineFractal(C, E, depth-1);
    lineFractal(E, D, depth-1);
    lineFractal(D, B, depth-1);

};
function cicFractal(A, B, depth){
    if (depth < 0){
        return null;
    }
    console.log(A)
    var C = divide(add(prod(A, 2), B), 3);
    var D = divide(add(prod(B, 2), A), 3);
    var F = divide(add(A, B), 2);
    var V1 = divide(subt(F, A), pointDist(F, A));
    var V2 = [V1[1], -V1[0]];
    var E = add(prod(V2, Math.sqrt(3)/6 * pointDist(B, A)), F);
    if (depth !=0){
        for (var i=0;i<10;i++)
        	fractCicle(C, D, "white");
    };
    fractCicle(A, B, colors[depth]);
    cicFractal(A, C, depth-1);
    cicFractal(C, E, depth-1);
    cicFractal(E, D, depth-1);
    cicFractal(D, B, depth-1);

};
function triangleFractal(){
	var A=[200,480];
	var B =[680,480];
	var C=[440,Math.sqrt(440)+20];
	drawTriagle(A,B,C,'black');
	drawSubTriangles(A,B,C, iter);
}

function drawSubTriangles(A,B,C, degreeIndex) {
	console.log(degreeIndex+' >= '+iter)
    if (degreeIndex == 0) {
        return;
    }
    var X= midPoint(A, B);
    var Y=midPoint(B, C);
    var Z= midPoint(C, A)
    
    drawTriagle(X,Y,Z,colors[degreeIndex]);
    drawSubTriangles(X,B,Y,degreeIndex-1);
    drawSubTriangles(Z,Y,C,degreeIndex-1);
    drawSubTriangles(A,X,Z,degreeIndex-1);
};

function prod(v, num){
	//console.log(v)
    return [v[0]*num, v[1]*num];
};

function divide(v, num){
    return [v[0]/num, v[1]/num];
};
function add(a, b){
    return [a[0]+b[0], a[1]+b[1]];
};
function subt(a, b){
    return [a[0]-b[0], a[1]-b[1]];
};
function pointDist(a, b){
    return Math.sqrt(Math.pow(a[0] - b[0],2) + 
                     Math.pow(a[1] - b[1],2));
};
function midPoint(a,b){
	return [(a[0]+b[0])/2,(a[1]+b[1])/2]
}

function fractLine(a, b, c){
    context.beginPath();
    context.strokeStyle = c;
    context.moveTo(a[0], a[1]);
    context.lineTo(b[0], b[1]);
    context.stroke();
    context.closePath();
};

function fractCicle(a, b, c){
    context.beginPath();
    context.strokeStyle = c;
   var rad=(a[1]+b[1])/2
    context.moveTo(a[0], a[1]);
    context.bezierCurveTo(a[0],rad,b[0],rad,b[0],b[1]);
    context.stroke();
    context.closePath();
};
function drawTriagle(a,b,c,col){
	
    fractLine(a,b,col)
    fractLine(b,c,col)
    fractLine(c,a,col)

	
}
function clearCanvas(ctx,canvas) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

}
function resetPage(){
	document.getElementById("itSld").value=0;
	document.getElementById("numberOfIterTb").value=0;
	clearCanvas(context,cnv);
}
      