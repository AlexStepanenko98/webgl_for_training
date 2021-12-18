let gl;
let position;
let color;
let matrix;
let aX=0;
let aY=0;
let old=[0,0];
let colors;


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


function createShader(type,source){
	const shader=gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	if(gl.getShaderParameter(shader,gl.COMPILE_STATUS))
		return shader;
	alert(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}


function createProgram(){
	const vertexShader=createShader(gl.VERTEX_SHADER,vertex);
	const fragmentShader=createShader(gl.FRAGMENT_SHADER,fragment);
	const program=gl.createProgram();
	gl.attachShader(program,vertexShader);
	gl.attachShader(program,fragmentShader);
	gl.linkProgram(program);
	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);
	if(gl.getProgramParameter(program,gl.LINK_STATUS))
		return program;
	alert(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}


const mat4={
	perspective: function(w,w_h,near,far){
		const f=Math.tan(Math.PI*0.5-w*0.5);
		const number=1.0/(near-far);
		return [
			f/w_h,0,0,0,
			0,f,0,0,
			0,0,(near+far)*number,-1,
			0,0,near*far*number*2,0
		]
	},
	translate: function(x,y,z){
		return [
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			x,y,z,1
		]
	},
	rotateX: function(angle){
		const c=Math.cos(angle*Math.PI/180);
		const s=Math.sin(angle*Math.PI/180);
		return [
			1,0,0,0,
			0,c,s,0,
			0,-s,c,0,
			0,0,0,1
		]
	},
	rotateY: function(angle){
		const c=Math.cos(angle*Math.PI/180);
		const s=Math.sin(angle*Math.PI/180);
		return [
			c,0,-s,0,
			0,1,0,0,
			s,0,c,0,
			0,0,0,1
		]
	},
	rotateZ: function(angle){
		const c=Math.cos(angle*Math.PI/180);
		const s=Math.sin(angle*Math.PI/180);
		return [
			c,s,0,0,
			-s,c,0,0,
			0,0,1,0,
			0,0,0,1
		]
	},
	scale: function(x,y,z){
		return [
			x,0,0,0,
			0,y,0,0,
			0,0,z,0,
			0,0,0,1
		]
	},
	multiply: function(m1,m2){
		return [
			m1[0]*m2[0]+m1[1]*m2[4]+m1[2]*m2[8]+m1[3]*m2[12],
			m1[0]*m2[1]+m1[1]*m2[5]+m1[2]*m2[9]+m1[3]*m2[13],
			m1[0]*m2[2]+m1[1]*m2[6]+m1[2]*m2[10]+m1[3]*m2[14],
			m1[0]*m2[3]+m1[1]*m2[7]+m1[2]*m2[11]+m1[3]*m2[15],
			//
			m1[4]*m2[0]+m1[5]*m2[4]+m1[6]*m2[8]+m1[7]*m2[12],
			m1[4]*m2[1]+m1[5]*m2[5]+m1[6]*m2[9]+m1[7]*m2[13],
			m1[4]*m2[2]+m1[5]*m2[6]+m1[6]*m2[10]+m1[7]*m2[14],
			m1[4]*m2[3]+m1[5]*m2[7]+m1[6]*m2[11]+m1[7]*m2[15],
			//
			m1[8]*m2[0]+m1[9]*m2[4]+m1[10]*m2[8]+m1[11]*m2[12],
			m1[8]*m2[1]+m1[9]*m2[5]+m1[10]*m2[9]+m1[11]*m2[13],
			m1[8]*m2[2]+m1[9]*m2[6]+m1[10]*m2[10]+m1[11]*m2[14],
			m1[8]*m2[3]+m1[9]*m2[7]+m1[10]*m2[11]+m1[11]*m2[15],
			//
			m1[12]*m2[0]+m1[13]*m2[4]+m1[14]*m2[8]+m1[15]*m2[12],
			m1[12]*m2[1]+m1[13]*m2[5]+m1[14]*m2[9]+m1[15]*m2[13],
			m1[12]*m2[2]+m1[13]*m2[6]+m1[14]*m2[10]+m1[15]*m2[14],
			m1[12]*m2[3]+m1[13]*m2[7]+m1[14]*m2[11]+m1[15]*m2[15]
		]
	},
	findMinor: function(m){
		const A11=(m[4]*m[8]-m[5]*m[7]);
		const A12=-(m[3]*m[8]-m[5]*m[6]);
		const A13=(m[3]*m[7]-m[4]*m[6]);
		return A11*m[0]+A12*m[1]+A13*m[2];
	},
	findDet: function(m){
		const A11=(this.findMinor([
			m[5],m[6],m[7],
			m[9],m[10],m[11],
			m[13],m[14],m[15]
		]));
		const A12=-(this.findMinor([
			m[4],m[6],m[7],
			m[8],m[10],m[11],
			m[12],m[14],m[15]
		]));
		const A13=(this.findMinor([
			m[4],m[5],m[7],
			m[8],m[9],m[11],
			m[12],m[13],m[15]
		]));
		const A14=-(this.findMinor([
			m[4],m[5],m[6],
			m[8],m[9],m[10],
			m[12],m[13],m[14]
		]));
		return A11*m[0]+A12*m[1]+A13*m[2]+A14*m[3];
	},
	inverse: function(m){
		const det=this.findDet(m);
		if(det!=0){
			const A11=(this.findMinor([
				m[5],m[6],m[7],
				m[9],m[10],m[11],
				m[13],m[14],m[15]
			]));
			const A12=-(this.findMinor([
				m[4],m[6],m[7],
				m[8],m[10],m[11],
				m[12],m[14],m[15]
			]));
			const A13=(this.findMinor([
				m[4],m[5],m[7],
				m[8],m[9],m[11],
				m[12],m[13],m[15]
			]));
			const A14=-(this.findMinor([
				m[4],m[5],m[6],
				m[8],m[9],m[10],
				m[12],m[13],m[14]
			]));
			const A21=-(this.findMinor([
				m[1],m[2],m[3],
				m[9],m[10],m[11],
				m[13],m[14],m[15]
			]));
			const A22=(this.findMinor([
				m[0],m[2],m[3],
				m[8],m[10],m[11],
				m[12],m[14],m[15]
			]));
			const A23=-(this.findMinor([
				m[0],m[1],m[3],
				m[8],m[9],m[11],
				m[12],m[13],m[15]
			]));
			const A24=(this.findMinor([
				m[0],m[1],m[2],
				m[8],m[9],m[10],
				m[12],m[13],m[14]
			]));
			const A31=(this.findMinor([
				m[1],m[2],m[3],
				m[5],m[6],m[7],
				m[13],m[14],m[15]
			]));
			const A32=-(this.findMinor([
				m[0],m[2],m[3],
				m[4],m[6],m[7],
				m[12],m[14],m[15]
			]));
			const A33=(this.findMinor([
				m[0],m[1],m[3],
				m[4],m[5],m[7],
				m[12],m[13],m[15]
			]));
			const A34=-(this.findMinor([
				m[0],m[1],m[2],
				m[4],m[5],m[6],
				m[12],m[13],m[14]
			]));
			const A41=-(this.findMinor([
				m[1],m[2],m[3],
				m[5],m[6],m[7],
				m[9],m[10],m[11]
			]));
			const A42=(this.findMinor([
				m[0],m[2],m[3],
				m[4],m[6],m[7],
				m[8],m[10],m[11]
			]));
			const A43=-(this.findMinor([
				m[0],m[1],m[3],
				m[4],m[5],m[7],
				m[8],m[9],m[11]
			]));
			const A44=(this.findMinor([
				m[0],m[1],m[2],
				m[4],m[5],m[6],
				m[8],m[9],m[10]
			]));
			return [
				1/det*A11,1/det*A21,1/det*A31,1/det*A41,
				1/det*A12,1/det*A22,1/det*A32,1/det*A42,
				1/det*A13,1/det*A23,1/det*A33,1/det*A43,
				1/det*A14,1/det*A24,1/det*A34,1/det*A44
			];
		}
	},
	cross: function(a,b){
		return [
			a[1]*b[2]-a[2]*b[1],
			a[2]*b[0]-a[0]*b[2],
			a[0]*b[1]-a[1]*b[0]
		];
	},
	subtract: function(a,b){
		return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
	},
	normalize: function(v){
		const l=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
		if(l>0.00001)
			return [v[0]/l,v[1]/l,v[2]/l];
		else
			return [0,0,0];
	},
	lookAt: function(camera,element,up){
		const z=this.normalize(this.subtract(camera,element));
		const x=this.normalize(this.cross(up,z));
		const y=this.normalize(this.cross(z,x));
		return [
			x[0],x[1],x[2],0,
			y[0],y[1],y[2],0,
			z[0],z[1],z[2],0,
			camera[0],camera[1],camera[2],1
		];
	}
}


function randColor(howMany){
	const array=[];
	for(let i=0;i<howMany;i++){
		array.push([Math.random(),Math.random(),Math.random()]);
	}
	return array;
}


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
		50,-50,50,
		c[0],c[1],c[2],
		50,-50,-50,
		c[0],c[1],c[2],
		50,50,-50,
		c[0],c[1],c[2],
		50,50,-50,
		c[0],c[1],c[2],
		50,50,50,
		c[0],c[1],c[2],
		50,-50,50,
		c[0],c[1],c[2],
		//
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
		-50,50,50,
		c[0],c[1],c[2],
		50,50,50,
		c[0],c[1],c[2],
		50,50,-50,
		c[0],c[1],c[2],
		50,50,-50,
		c[0],c[1],c[2],
		-50,50,-50,
		c[0],c[1],c[2],
		-50,50,50,
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
		c[0],c[1],c[2],
		//
	];
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.vertexAttribPointer(position,3,gl.FLOAT,false,24,0);
	gl.vertexAttribPointer(color,3,gl.FLOAT,false,24,12);
	gl.uniformMatrix4fv(matrix,false,m);
	gl.drawArrays(gl.TRIANGLES,0,data.length/6);
}


function draw(x,y){
	if((y>0&&y<80)||(y<0&&y>-80))
		y=0;
	if((x>0&&x<40)||(x<0&&x>-40))
		x=0;
	aX+=y*0.009;
	aY+=x*0.009;
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	let mainMat=mat4.perspective(1,window.innerWidth/window.innerHeight,1,8000);
	mainMat=mat4.multiply(mat4.translate(0,0,-1000),mainMat);
	mainMat=mat4.multiply(mat4.rotateX(aX),mainMat);
	mainMat=mat4.multiply(mat4.rotateY(aY),mainMat);
	/*camera
	let camera=mat4.rotateY(aY);
	camera=mat4.multiply(mat4.rotateX(aX),camera);
	camera=mat4.multiply(mat4.translate(0,0,270),camera);
	camera=mat4.lookAt(
		[
			camera[12],
			camera[13],
			camera[14]
		],
		[
			180,0,0
		],
		[
			0,1,0
		]
	);
	mainMat=mat4.multiply(mat4.inverse(camera),mainMat);
	camera*/
	/*for(let angle=0;angle<360;angle+=30){
		const c=Math.cos(angle*Math.PI/180)*180;
		const s=Math.sin(angle*Math.PI/180)*180;
		let mat=mat4.multiply(mat4.translate(c,0,s),mainMat);
		mat=mat4.multiply(mat4.scale(0.2,1,0.2),mat);
		drawRect(mat,colors[angle/30]);
	}*/
	let mat=mat4.multiply(mat4.translate(100,0,0),mainMat);
	drawRect(mat,[1,1,0]);
}


function init(canvas){
	//colors=randColor(12);
	gl=canvas.getContext('webgl');
	const program=createProgram();
	gl.useProgram(program);
	gl.viewport(0,0,window.innerWidth,window.innerHeight);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(0,0,0,1);
	position=gl.getAttribLocation(program,'position');
	color=gl.getAttribLocation(program,'color');
	matrix=gl.getUniformLocation(program,'matrix');
	gl.enableVertexAttribArray(position);
	gl.enableVertexAttribArray(color);
	const buffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
}


const canvas=document.querySelector('canvas');
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);
canvas.addEventListener('touchstart',(e)=>{
	old[0]=e.touches[0].clientX;
	old[1]=e.touches[0].clientY;
});
canvas.addEventListener('touchmove',(e)=>{
	draw(old[0]-e.touches[0].clientX,old[1]-e.touches[0].clientY);
});
init(canvas);
draw(0,0);
