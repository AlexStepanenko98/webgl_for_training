const HOW_MANY=400;
let gl;
let position;
let color;
let matrix;
let time=0;
let angleX=0;
let angleY=0;
let colors;
let points;
let angles;


const vertex=`attribute vec4 position;
attribute vec3 color;
uniform mat4 matrix;
varying vec3 color_;


void main(){
	color_=color;
	gl_Position=matrix*position;
}`;


const fragment=`precision mediump float;
varying vec3 color_;


void main(){
	gl_FragColor=vec4(color_,1);
}`;


function drawRect(m,c){
	const data=[
		-50,-50,50,
		c[0],c[1],c[2],
		50,-50,50,
		c[0],c[1],c[2],
		50,50,50,
		c[0],c[1],c[2],
		50,50,50,
		c[0],c[1],c[2],
		-50,50,50,
		c[0],c[1],c[2],
		-50,-50,50,
		c[0],c[1],c[2],
		//
		-50,-50,50,
		c[0],c[1],c[2],
		-50,-50,-50,
		c[0],c[1],c[2],
		50,-50,-50,
		c[0],c[1],c[2],
		50,-50,-50,
		c[0],c[1],c[2],
		50,-50,50,
		c[0],c[1],c[2],
		-50,-50,50,
		c[0],c[1],c[2],
		//
		-50,-50,50,
		c[0],c[1],c[2],
		-50,50,50,
		c[0],c[1],c[2],
		-50,50,-50,
		c[0],c[1],c[2],
		-50,50,-50,
		c[0],c[1],c[2],
		-50,-50,-50,
		c[0],c[1],c[2],
		-50,-50,50,
		c[0],c[1],c[2],
		//
		50,50,50,
		c[0],c[1],c[2],
		50,-50,50,
		c[0],c[1],c[2],
		50,-50,-50,
		c[0],c[1],c[2],
		50,-50,-50,
		c[0],c[1],c[2],
		50,50,-50,
		c[0],c[1],c[2],
		50,50,50,
		c[0],c[1],c[2],
		//
		50,50,50,
		c[0],c[1],c[2],
		50,50,-50,
		c[0],c[1],c[2],
		-50,50,-50,
		c[0],c[1],c[2],
		-50,50,-50,
		c[0],c[1],c[2],
		-50,50,50,
		c[0],c[1],c[2],
		50,50,50,
		c[0],c[1],c[2],
		//
		-50,-50,-50,
		c[0],c[1],c[2],
		-50,50,-50,
		c[0],c[1],c[2],
		50,50,-50,
		c[0],c[1],c[2],
		50,50,-50,
		c[0],c[1],c[2],
		50,-50,-50,
		c[0],c[1],c[2],
		-50,-50,-50,
		c[0],c[1],c[2]
	];
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.vertexAttribPointer(position,3,gl.FLOAT,false,24,0);
	gl.vertexAttribPointer(color,3,gl.FLOAT,false,24,12);
	gl.uniformMatrix4fv(matrix,false,m);
	gl.drawArrays(gl.TRIANGLES,0,data.length/6);
}


function animation(now){
	now*=0.001;
	let local=now-time;
	time=now;
	angleX+=local*5;
	angleY+=local*7;
	draw(angleX,angleY);
	requestAnimationFrame(animation);
}


function rand(number){
	let Z=Math.floor(Math.random()*number);
	if((Math.floor(Math.random()*2))){
		return -Z;
	}
	else
		return Z;
}


function randColor(){
	const array=[];
	for(let i=0;i<HOW_MANY;i++){
		array.push([Math.random(),Math.random(),Math.random()]);
	}
	return array;
}


function randPoint(){
	const array=[];
	for(let i=0;i<HOW_MANY;i++){
		array.push([rand(5*HOW_MANY),rand(5*HOW_MANY),rand(5*HOW_MANY)]);
	}
	return array;	
}


function randAngles(){
	const array=[];
	for(let i=0;i<HOW_MANY;i++){
		array.push([rand(100),rand(100),rand(100)]);
	}
	return array;	
}


function init(canvas){
	gl=canvas.getContext('webgl');
	const program=createProgram();
	gl.useProgram(program);
	gl.viewport(0,0,window.innerWidth,window.innerHeight);
	gl.clearColor(0,0,0,1);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);
	position=gl.getAttribLocation(program,'position');
	color=gl.getAttribLocation(program,'color');
	matrix=gl.getUniformLocation(program,'matrix');
	gl.enableVertexAttribArray(position);
	gl.enableVertexAttribArray(color);
	const buffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
	colors=randColor();
	points=randPoint();
	angles=randAngles();
}


function draw(x,y){
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	rand(6);
	let mat=mat4.perspective(1,window.innerWidth/window.innerHeight,1,8000);
	mat=mat4.multiply(mat4.translate(0,0,-3000),mat);
	let local;
	for(let i=0;i<HOW_MANY;i++){
		local=mat4.multiply(mat4.translate(points[i][0],points[i][1],points[i][2]),mat);
		local=mat4.multiply(mat4.rotateX(x+angles[i][0]),local);
		local=mat4.multiply(mat4.rotateY(y+angles[i][1]),local);
		drawRect(local,colors[i]);
	}
}


const canvas=document.querySelector('#canvas');
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);
init(canvas);
requestAnimationFrame(animation);
draw(angleX,angleY);
