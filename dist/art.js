let gl;
let position;
let texture;
let matrix;
const images=[];
let start=[0,0];
let rotates=[0,0];
let z=0;


const vertex=`attribute vec4 position;
attribute vec2 text;
uniform mat4 matrix;
varying vec2 text_;


void main(){
	text_=text;
	gl_Position=matrix*position;
}`;


const fragment=`precision mediump float;
varying vec2 text_;
uniform sampler2D texture;


void main(){
	gl_FragColor=texture2D(texture,text_);
}`;


function drawCube(m,img){
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
	gl.generateMipmap(gl.TEXTURE_2D);
	const data=[
		-50,-50,50,
		0,0,
		50,-50,50,
		1,0,
		50,50,50,
		1,1,
		50,50,50,
		1,1,
		-50,50,50,
		0,1,
		-50,-50,50,
		0,0,
		//
		-50,-50,-50,
		0,0,
		-50,-50,50,
		1,0,
		-50,50,50,
		1,1,
		-50,50,50,
		1,1,
		-50,50,-50,
		0,1,
		-50,-50,-50,
		0,0,
		//
		50,-50,50,
		0,0,
		50,-50,-50,
		1,0,
		50,50,-50,
		1,1,
		50,50,-50,
		1,1,
		50,50,50,
		0,1,
		50,-50,50,
		0,0,
		//
		-50,50,50,
		0,0,
		50,50,50,
		1,0,
		50,50,-50,
		1,1,
		50,50,-50,
		1,1,
		-50,50,-50,
		0,1,
		-50,50,50,
		0,0,
		//
		-50,-50,-50,
		0,0,
		50,-50,-50,
		1,0,
		50,-50,50,
		1,1,
		50,-50,50,
		1,1,
		-50,-50,50,
		0,1,
		-50,-50,-50,
		0,0,
		//
		50,-50,-50,
		0,0,
		-50,-50,-50,
		1,0,
		-50,50,-50,
		1,1,
		-50,50,-50,
		1,1,
		50,50,-50,
		0,1,
		50,-50,-50,
		0,0,
		//
	];
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.vertexAttribPointer(position,3,gl.FLOAT,false,20,0);
	gl.vertexAttribPointer(texture,2,gl.FLOAT,false,20,12);
	gl.uniformMatrix4fv(matrix,false,m);
	gl.drawArrays(gl.TRIANGLES,0,data.length/5);
}


/*function drawRect(m,img){
	const data=[
		-50,-50,50,
		0,0,
		50,-50,50,
		1,0,
		50,50,50,
		1,1.
		50,50,50,
		1,1,
		-50,50,50,
		0,1,
		-50,-50,50,
		0,0
	];
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.vertexAttribPointer(position,3,gl.FLOAT,false,20,0);
//iiiiiii
}*/


function init(canvas){
	gl=canvas.getContext('webgl');
	const program=createProgram();
	gl.useProgram(program);
	gl.viewport(0,0,window.innerWidth,window.innerHeight);
	gl.clearColor(1,1,1,1);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);
	position=gl.getAttribLocation(program,'position');
	texture=gl.getAttribLocation(program,'text');
	matrix=gl.getUniformLocation(program,'matrix');
	gl.enableVertexAttribArray(position);
	gl.enableVertexAttribArray(texture);
	const buffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
	text=gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D,text);
	const img1=new Image();
	img1.src='art1.jpg';
	img1.addEventListener('load',()=>{
		images.push(img1);
		if(images.length===2)
			draw(0,0);
	})
	const img2=new Image();
	img2.src='art2.jpg';
	img2.addEventListener('load',()=>{
		images.push(img2);
		if(images.length===2)
			draw(0,0);
	})
}


function draw(rX,rY){
	if(rY>0&&rY<80)
		rY=0;
	if(rY<0&&rY>-80)
		rY=0;
	if(rX>0&&rX<30)
		rX=0;
	if(rX<0&&rX>-30)
		rX=0;
	rotates[0]+=rX*0.1;
	rotates[1]+=rY*0.1;
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	let mat=mat4.perspective(1,window.innerWidth/window.innerHeight,1,8000);
	mat=mat4.multiply(mat4.translate(0,0,-1000+z),mat);
	mat=mat4.multiply(mat4.rotateX(rotates[1]),mat);
	mat=mat4.multiply(mat4.rotateY(rotates[0]),mat);
	let local=mat4.multiply(mat4.translate(200,0,0),mat);
	drawCube(local,images[0]);
	local=mat4.multiply(mat4.translate(0,0,0),mat);
	drawCube(local,images[1]);
}

document.body.style.position='relative';


const canvas=document.querySelector('#canvas');
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);
canvas.style.position='absolute';
canvas.style.zIndex='1';


const range=document.createElement('input');
range.setAttribute('type','range');
range.setAttribute('value','0');
range.setAttribute('max','1000');
range.setAttribute('min','-1000');
range.setAttribute('step','50');
range.style.width=window.innerWidth*0.3+'px';
range.style.position='absolute';
range.style.top='50px';
range.style.zIndex='2';
document.body.append(range);


canvas.addEventListener('touchstart',(e)=>{
	start[0]=e.touches[0].clientX;
	start[1]=e.touches[0].clientY;
});
canvas.addEventListener('touchmove',(e)=>{
	if(images.length===2){
		draw(
			start[0]-e.touches[0].clientX,
			start[1]-e.touches[0].clientY
		);
	}
});


range.addEventListener('input',(v)=>{
	if(images.length===2){
		z=Number(v.target.value);
		//alert(z);
		draw(0,0);
	}
});


init(canvas);
