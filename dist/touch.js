let gl;
let position;
let color;
let matrix;
let but=false;
let mat;
let start=[0,0];
let mX=0;
let mY=0;
let points=[[-50,-50],[50,50]];


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
	];
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.vertexAttribPointer(position,3,gl.FLOAT,false,24,0);
	gl.vertexAttribPointer(color,3,gl.FLOAT,false,24,12);
	gl.uniformMatrix4fv(matrix,false,m);
	gl.drawArrays(gl.TRIANGLES,0,data.length/6);
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
	mat=mat4.perspective(1,window.innerWidth/window.innerHeight,1,8000);
	mat=mat4.multiply(mat4.translate(0,0,-1000),mat);
}


function draw(){
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	if(but)
		drawRect(mat,[0,0.8,0.7]);
	else
		drawRect(mat,[1,1,0]);
}


const canvas=document.querySelector('#canvas');
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);


canvas.addEventListener('touchstart',(e)=>{
	start[0]=e.touches[0].clientX;
	start[1]=e.touches[0].clientY;
	let X=(start[0]-window.innerWidth*0.5)*0.55;
	let Y=(-(start[1]-window.innerHeight*0.5))*0.55;
	if((X>=points[0][0]&&X<=points[1][0])&&(Y>=points[0][1]&&Y<=points[1][1]))
		but=true;
	else
		alert('{\n\t'+points[0][0]+',\n\t'+points[0][1]+'\n}\n'+'{\n\t'+X+',\n\t'+Y+'}\n{\n\t'+points[1][0]+',\n\t'+points[1][1]+'\n}');
	draw();
});


canvas.addEventListener('touchmove',(e)=>{
	mX=(e.touches[0].clientX-start[0])*0.2;
	mY=(start[1]-e.touches[0].clientY)*0.2;
	if(but){
		points[0][0]+=mX;
		points[0][1]+=mY;
		points[1][0]+=mX;
		points[1][1]+=mY;
		mat=mat4.multiply(mat4.translate(mX,mY,0),mat);
	}
	draw();
});


canvas.addEventListener('touchend',()=>{
	but=false;
	draw();
});


init(canvas);
draw();
