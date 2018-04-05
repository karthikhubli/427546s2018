let angleY = 0;
let angleZ = 0;
let angleX = 0;
let plant;
let ambLight=false;
let ptLight=true;
function preload() {
	// plant=loadModel('teapot.obj',false);
}
function setup() {
	angleMode(DEGREES)
	createCanvas(1200, 600, WEBGL);
}
function draw() {
	//let lightType = document.getElementsByName('light').value;
	if (ptLight) {
		//console.log('point')
		pointLight(50, 150, 255, -75, 0, 300);
		ambientLight(0, 0, 0);
		// pointLight(0,255,0,100,0,200);
	}
	if (ambLight) {
		//console.log('ambient')
		pointLight(0, 0, 0, -200, 0, 175);
		ambientLight(50, 100, 200);
	}
	background(51);
	rectMode(CENTER);

	angleY = document.getElementById('angleY').value
	rotateY(angleY);

	angleZ = document.getElementById('angleZ').value
	rotateZ(angleZ);

	angleX = document.getElementById('angleX').value
	rotateX(angleX);
	specularMaterial(255, 255, 255);
	translate(0, 0)
	box(250, 125, 125);

}
function updateLight(obj){
	console.log(obj.value)
	if(obj.value=='point'){
		ambLight=false;
		ptLight=true;
	}else if(obj.value=='ambient'){
		ambLight=true;
		ptLight=false;
	}
}