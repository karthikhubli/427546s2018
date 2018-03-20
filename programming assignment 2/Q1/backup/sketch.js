var finalList = new Array();

function setup() {
    createCanvas(1000,600);
    angleMode(DEGREES);
}

let x=0;
let y=0;
function draw() {
    var ratio=document.getElementById("fraction").value;
    var iter=document.getElementById("numberOfIterTb").value;
    background(200,200,255);
	translate(0,300);
    let a= createVector(40,0);
    let b=createVector(800,0);
    stroke(0,255,0)
    line(a.x,b.y,b.x,b.y)
    finalList.push(a);
    finalList.push(b);
    drawLine(iter,ratio);
    noLoop();
}
function drawLine(iteration, ratio) {
	var tempList = new Array();
	var dir=1;
	var midPoint=createVector(0,0);
	for(var i=0;i<finalList.length-1;i++){
		let ptArr = getIntermidiatePoints(finalList[i],finalList[i+1], ratio);
		for(var j=0;j<ptArr.length-1;j++){
			if(j%2==0){
				dir=1
			}else{
				dir =-1;
			}
			midPoint=getThirdVector(ptArr[j],ptArr[j+1]);
			tempList.push(ptArr[j]);
			tempList.push(midPoint);
			tempList.push(ptArr[j+1]);
		}
	}
	finalList=tempList;
	console.log(tempList);
	if (iteration != 0) {
		drawLine(iteration-1, ratio)
	} else {
		for(var x=0;x<finalList.length-2;x++){
			renderLineFract(finalList[x],finalList[x+1],finalList[x+2])
		}

	}
}
function renderLineFract(a,b,ab){
    /*console.log(a)
    console.log(ab)
    console.log(b)
    console.log("-----------------------------------------")*/
    strokeWeight(2);
    stroke(255,0,0)
    line(a.x,b.y,ab.x,ab.y)
    line(ab.x,ab.y,b.x,b.y)
}
function getThirdVector(a,b,dir){
	console.log(a)
    console.log(b)
    let p1=parseFloat((a.x+b.x+(a.y-b.y)*Math.sqrt(3)*dir)/2)
    let p2=(a.y+b.y+(a.x-b.x)*Math.sqrt(3)*dir)/2
    console.log(p1+" , "+p2)
    let c= createVector(p1,p2)
    console.log(c)
    return c;
}
function getIntermidiatePoints(A,B,ratio){
	var totlen=Math.sqrt(Math.pow((A.x-B.x),2)+Math.pow((A.y-B.y),2));
	//console.log('Total len-'+totlen);
	var len=totlen/ratio;
	//console.log('individual length-'+len);
	var Pn=new Array;
	Pn.push(A);
	for(i=1;i<ratio;i++){
		//console.log(A.x+(i*len*(B.x-A.x))/totlen);
		Pn.push(createVector(A.x+(i*len*(B.x-A.x))/totlen,y,A.y+(i*len*(B.y-A.y))/totlen));
	}
	Pn.push(B)
	console.log(Pn)
	return Pn;
}
