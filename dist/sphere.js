let gl;
let position;
let color;
let matrix;
let touch=[0,0];
let rX=0;
let rY=0;


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


function drawSphere(m,c,r){
	const data=[];
	for(let i=90;i>-90;i-=10){
		const cos=Math.cos(i*Math.PI/180)*r;
		const sin=Math.sin(i*Math.PI/180)*r;
		/*const cos_=Math.cos((i-10)*Math.PI/180)*r;
		const sin_=Math.sin((i-10)*Math.PI/180)*r;
		data.push(
			cos,sin,0,
			c[0],c[1],c[2],
			0,0,0,
			c[0],c[1],c[2],
			cos_,sin_,0,
			c[0],c[1],c[2],
		);*/
		for(let j=0;j<360;j+=10){
			const cos_l=Math.cos(j*Math.PI/180)*(cos);
			const sin_l=Math.sin(j*Math.PI/180)*(cos);
			const cos_l_=Math.cos((j+10)*Math.PI/180)*(cos);
			const sin_l_=Math.sin((j+10)*Math.PI/180)*(cos);
			data.push(
				cos_l,sin,sin_l,
				c[0],c[1],c[2],
				0,sin,0,
				c[0],c[1],c[2],
				cos_l_,sin,sin_l_,
				c[0],c[1],c[2]
			);
		}
	}
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.vertexAttribPointer(position,3,gl.FLOAT,false,24,0);
	gl.vertexAttribPointer(color,3,gl.FLOAT,false,24,12);
	gl.uniformMatrix4fv(matrix,false,m);
	gl.drawArrays(gl.TRIANGLES,0,data.length/6);
}


function drawSphere2(m,c,r){
	const data=[];
	for(let i=90;i>-90;i-=10){
		const cos=Math.cos(i*Math.PI/180)*r;
		const sin=Math.sin(i*Math.PI/180)*r;
		const sin_=Math.sin((i-10)*Math.PI/180)*r;
		const cos_=Math.cos((i-10)*Math.PI/180)*r;
		for(let j=0;j<360;j+=10){
			const cos_h=Math.cos(j*Math.PI/180)*(cos);
			const sin_h=Math.sin(j*Math.PI/180)*(cos);
			const cos_h_=Math.cos((j+10)*Math.PI/180)*(cos);
			const sin_h_=Math.sin((j+10)*Math.PI/180)*(cos);
			const cos_l=Math.cos(j*Math.PI/180)*(cos_);
			const sin_l=Math.sin(j*Math.PI/180)*(cos_);
			const cos_l_=Math.cos((j+10)*Math.PI/180)*(cos_);
			const sin_l_=Math.sin((j+10)*Math.PI/180)*(cos_);
			data.push(
				cos_h,sin,sin_h,
				c[0],c[1],c[2],
				cos_l,sin_,sin_l,
				c[0],c[1],c[2],
				cos_l_,sin_,sin_l_,
				c[0],c[1],c[2],
				cos_l_,sin_,sin_l_,
				c[0],c[1],c[2],
				cos_h_,sin,sin_h_,
				c[0],c[1],c[2],
				cos_h,sin,sin_h,
				c[0],c[1],c[2]
			);
		}
	}
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
}


function draw(X,Y){
	if(touch[1]>0&&touch[1]<90)
		touch[1]=0;
	if(touch[1]<0&&touch[1]>-90)
		touch[1]=0;
	if(touch[0]>0&&touch[0]<40)
		touch[0]=0;
	if(touch[0]<0&&touch[0]>-40)
		touch[0]=0;
	rX+=X*0.01;
	rY+=Y*0.01;
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	let mat=mat4.perspective(1,window.innerWidth/window.innerHeight,1,8000);
	mat=mat4.multiply(mat4.translate(0,0,-600),mat);
	mat=mat4.multiply(mat4.rotateX(rY),mat);
	mat=mat4.multiply(mat4.rotateY(rX),mat);
	drawSphere2(mat,[0,0.8,0.7],60);
	//drawRect(mat,[0,0.8,0.7]);
}


const canvas=document.querySelector('#canvas');
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);


canvas.addEventListener('touchstart',(e)=>{
	touch[0]=e.touches[0].clientX;
	touch[1]=e.touches[0].clientY;
});


canvas.addEventListener('touchmove',(e)=>{
	draw(touch[0]-e.touches[0].clientX,touch[1]-e.touches[0].clientY);
});


init(canvas);
draw(0,0);
