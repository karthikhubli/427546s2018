let angleY = 0;
let angleZ = 0;
let angleX = 0;
let plant;
let ambLight=true;
let ptLight=false;
let lightColor=[250,250,250];
let orthoProj=false;
let camZ=0;
let CamX=-200
let fov=0;
let shapeType='table'
let extModel;
let text='w'

function preload() {
	img1 = loadImage('wood.jpeg');
	img2 = loadImage('stone.jpg');
	img3 = loadImage('graphene.jpg');
	img4 = loadImage('fabric.jpg');
	extModel=loadModel('table.obj',false);
}
function setup() {
	angleMode(DEGREES)
	createCanvas(1200, 600, WEBGL);
	if(orthoProj){
		console.log('setting ortho')
	ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 1200);
	}
	camZ=(height/2)/(tan(30))
	fov=PI/3
	console.log(camZ)
}
function draw() {
	// let lightType = document.getElementsByName('light').value;
	camX=map(document.getElementById('camX').value,0,24,-(width/2.0),width/2.0)
	if (ptLight) {
		// console.log('point')
		pointLight(lightColor[0], lightColor[1], lightColor[2], 0, -(height/2), 300);
		ambientLight(0, 0, 0);
		// pointLight(0,255,0,100,0,200);
	}
	if (ambLight) {
		// console.log('ambient')
		pointLight(0, 0, 0, -200, 0, 175);
		ambientLight(lightColor[0], lightColor[1], lightColor[2]);
	}

	fov=map(document.getElementById('fov').value,0,18,0,PI)
	background(200);
	rectMode(CENTER);
	perspective(fov,width/height,camZ/10.0,camZ*10.0)
	
	
	push()
	angleY = document.getElementById('angleY').value
	rotateY(angleY);
	angleZ = document.getElementById('angleZ').value
	rotateZ(angleZ);
	angleX = document.getElementById('angleX').value
	rotateX(angleX);
/*	shear_X=document.getElementById('shearX').value
	//shearX(shear_X)
	shear_Y=document.getElementById('shearY').value
	//shear(shear_Y)
	scaleX=shear_Y=document.getElementById('scaleX').value
	scaleY=shear_Y=document.getElementById('scaleY').value
	scale(scaleX,scaleY)*/
	translate(camX, 0,0);
	if(text == 'w'){
		texture(img1)
	}else if(text == 'f'){
		texture(img4)
	}
	else if(text == 'g'){
		texture(img3)
	}else if(text == 's'){
		texture(img2)
	}else{
		texture(img1)
	}
	
	if(shapeType =='table'){
		model(extModel);
	} if(shapeType =='cube'){
		box(250, 125, 125);
	}else if(shapeType =='sphere'){
		sphere(80)
	}else if(shapeType =='cone'){
		cone(70,120)
	}else if(shapeType =='torus'){
		torus(75, 25);
	}
	pop()
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
function updateShapeType(obj){
	shapeType=obj.value;
	
}
function updateColor(color){
	console.log(color)
	lightColor=hexToRGB(color);
	console.log(lightColor)
}
function updateProj(proType){
	if(proType=='orthoP'){
		orthoProj=true;
		
	}else{
		orthoProj=false;
	}
	setup();
}
function updateTexture(obj){
	text=obj.value;
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