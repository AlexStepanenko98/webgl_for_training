let gl;
let position;
let color;
let matrix;
let but=false;
let points=[[50,-50],[150,50]];


const vertex=`attribute vec4 position;
attribute vec4 color;
uniform mat4 matrix;
varying vec4 color_;


void main(){
	color_=color;
	gl_Position=matrix*position;
}`;


const fragment=`precision mediump float;
varying vec4 color_;


void main(){
	gl_FragColor=color_,1;
}`;


function drawRect(m,c){
	const data=[
		-50,-50,50,
		c[0],c[1],c[2],c[3],
		50,-50,50,
		c[0],c[1],c[2],c[3],
		50,50,50,
		c[0],c[1],c[2],c[3],
		50,50,50,
		c[0],c[1],c[2],c[3],
		-50,50,50,
		c[0],c[1],c[2],c[3],
		-50,-50,50,
		c[0],c[1],c[2],c[3]
	];
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.vertexAttribPointer(position,3,gl.FLOAT,false,28,0);
	gl.vertexAttribPointer(color,4,gl.FLOAT,false,28,12);
	gl.uniformMatrix4fv(matrix,false,m);
	gl.drawArrays(gl.TRIANGLES,0,data.length/7);
}


function init(canvas){
	gl=canvas.getContext('webgl',{alpha: false});
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
}


function draw(){
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	let mat=mat4.perspective(1,window.innerWidth/window.innerHeight,1,8000);
	mat=mat4.multiply(mat4.translate(0,0,-1000),mat);
	mat=mat4.multiply(mat4.translate(100,0,0),mat);
	if(but)
		drawRect(mat,[0,0.8,0.7,0]);
	else
		drawRect(mat,[1,1,0,0]);
}


const canvas=document.querySelector('#canvas');
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);


canvas.addEventListener('touchstart',(e)=>{
	let X=(e.touches[0].clientX-window.innerWidth*0.5)*0.5;
	let Y=(-(e.touches[0].clientY-window.innerHeight*0.5))*0.5;
	if((X>=points[0][0]&&X<=points[1][0])&&(Y>=points[0][1]&&Y<=points[1][1]))
		but=true;
	draw();
});


canvas.addEventListener('touchmove',(e)=>{
	let X=(e.touches[0].clientX-window.innerWidth*0.5)*0.5;
	let Y=(-(e.touches[0].clientY-window.innerHeight*0.5))*0.5;
	if(!((X>=points[0][0]&&X<=points[1][0])&&(Y>=points[0][1]&&Y<=points[1][1])))
		but=false;
	draw();
});


canvas.addEventListener('touchend',()=>{
	but=false;
	draw();
});


init(canvas);
draw();
