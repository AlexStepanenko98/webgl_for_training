const HOW_MANY_IMAGES=2;
let gl;
let position;
let tex;
let matrix;
let images;
let mainMatrix;
let button1;
let button2;
let menu;
let rotates;
let start;


const vertex=`attribute vec4 position;
attribute vec2 tex;
varying vec2 tex_;
uniform mat4 matrix;


void main(){
	tex_=tex;
	gl_Position=matrix*position;
}`;


const fragment=`precision mediump float;
varying vec2 tex_;
uniform sampler2D text;


void main(){
	gl_FragColor=texture2D(text,tex_);
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


class Matrix{
	constructor(){
		this.data=[
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			0,0,0,1
		];
	}


	multiply(m,m_){
		if(m_===undefined){
			if(m.length===4){
				return [
					m[0]*this.data[0]+m[1]*this.data[4]+m[2]*this.data[8]+m[3]*this.data[12],
					m[0]*this.data[1]+m[1]*this.data[5]+m[2]*this.data[9]+m[3]*this.data[13],
					m[0]*this.data[2]+m[1]*this.data[6]+m[2]*this.data[10]+m[3]*this.data[14],
					m[0]*this.data[3]+m[1]*this.data[7]+m[2]*this.data[11]+m[3]*this.data[15],
				];
			}
			const data=[
				m[0]*this.data[0]+m[1]*this.data[4]+m[2]*this.data[8]+m[3]*this.data[12],
				m[0]*this.data[1]+m[1]*this.data[5]+m[2]*this.data[9]+m[3]*this.data[13],
				m[0]*this.data[2]+m[1]*this.data[6]+m[2]*this.data[10]+m[3]*this.data[14],
				m[0]*this.data[3]+m[1]*this.data[7]+m[2]*this.data[11]+m[3]*this.data[15],
				//
				m[4]*this.data[0]+m[5]*this.data[4]+m[6]*this.data[8]+m[7]*this.data[12],
				m[4]*this.data[1]+m[5]*this.data[5]+m[6]*this.data[9]+m[7]*this.data[13],
				m[4]*this.data[2]+m[5]*this.data[6]+m[6]*this.data[10]+m[7]*this.data[14],
				m[4]*this.data[3]+m[5]*this.data[7]+m[6]*this.data[11]+m[7]*this.data[15],
				//
				m[8]*this.data[0]+m[9]*this.data[4]+m[10]*this.data[8]+m[11]*this.data[12],
				m[8]*this.data[1]+m[9]*this.data[5]+m[10]*this.data[9]+m[11]*this.data[13],
				m[8]*this.data[2]+m[9]*this.data[6]+m[10]*this.data[10]+m[11]*this.data[14],
				m[8]*this.data[3]+m[9]*this.data[7]+m[10]*this.data[11]+m[11]*this.data[15],
				//
				m[12]*this.data[0]+m[13]*this.data[4]+m[14]*this.data[8]+m[15]*this.data[12],
				m[12]*this.data[1]+m[13]*this.data[5]+m[14]*this.data[9]+m[15]*this.data[13],
				m[12]*this.data[2]+m[13]*this.data[6]+m[14]*this.data[10]+m[15]*this.data[14],
				m[12]*this.data[3]+m[13]*this.data[7]+m[14]*this.data[11]+m[15]*this.data[15]
			];
			this.data=data;
			return undefined;
		}
		else{
			if(m_===1){
				return this.multiply(m,[
					1,0,0,0,
					0,1,0,0,
					0,0,1,0,
					0,0,0,1
				]);
			}
			if(m.length===4){
				return [
					m[0]*m_[0]+m[1]*m_[4]+m[2]*m_[8]+m[3]*m_[12],
					m[0]*m_[1]+m[1]*m_[5]+m[2]*m_[9]+m[3]*m_[13],
					m[0]*m_[2]+m[1]*m_[6]+m[2]*m_[10]+m[3]*m_[14],
					m[0]*m_[3]+m[1]*m_[7]+m[2]*m_[11]+m[3]*m_[15],
				];
			}
			else{
				return [
					m[0]*m_[0]+m[1]*m_[4]+m[2]*m_[8]+m[3]*m_[12],
					m[0]*m_[1]+m[1]*m_[5]+m[2]*m_[9]+m[3]*m_[13],
					m[0]*m_[2]+m[1]*m_[6]+m[2]*m_[10]+m[3]*m_[14],
					m[0]*m_[3]+m[1]*m_[7]+m[2]*m_[11]+m[3]*m_[15],
					//
					m[4]*m_[0]+m[5]*m_[4]+m[6]*m_[8]+m[7]*m_[12],
					m[4]*m_[1]+m[5]*m_[5]+m[6]*m_[9]+m[7]*m_[13],
					m[4]*m_[2]+m[5]*m_[6]+m[6]*m_[10]+m[7]*m_[14],
					m[4]*m_[3]+m[5]*m_[7]+m[6]*m_[11]+m[7]*m_[15],
					//
					m[8]*m_[0]+m[9]*m_[4]+m[10]*m_[8]+m[11]*m_[12],
					m[8]*m_[1]+m[9]*m_[5]+m[10]*m_[9]+m[11]*m_[13],
					m[8]*m_[2]+m[9]*m_[6]+m[10]*m_[10]+m[11]*m_[14],
					m[8]*m_[3]+m[9]*m_[7]+m[10]*m_[11]+m[11]*m_[15],
					//
					m[12]*m_[0]+m[13]*m_[4]+m[14]*m_[8]+m[15]*m_[12],
					m[12]*m_[1]+m[13]*m_[5]+m[14]*m_[9]+m[15]*m_[13],
					m[12]*m_[2]+m[13]*m_[6]+m[14]*m_[10]+m[15]*m_[14],
					m[12]*m_[3]+m[13]*m_[7]+m[14]*m_[11]+m[15]*m_[15]
				];
			}
		}
	}


	perspective(w,w_h,near,far){
		const f=Math.tan(Math.PI*0.5-w*0.5);
		const n=1/(near-far);
		this.multiply([
			f/w_h,0,0,0,
			0,f,0,0,
			0,0,(near+far)*n,-1,
			0,0,near*far*n*2,0
		]);
	}


	translate(x,y,z,m){
		return this.multiply([
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			x,y,z,1
		],m);
	}


	rotate(x,y,z,m){
		const matrix=new Matrix();
		if(x!=0){
			const c=Math.cos(x*Math.PI/180);
			const s=Math.sin(x*Math.PI/180);
			matrix.multiply([
				1,0,0,0,
				0,c,s,0,
				0,-s,c,0,
				0,0,0,1
			]);
		}
		if(y!=0){
			const c=Math.cos(y*Math.PI/180);
			const s=Math.sin(y*Math.PI/180);
			matrix.multiply([
				c,0,-s,0,
				0,1,0,0,
				s,0,c,0,
				0,0,0,1
			]);
		}
		if(z!=0){
			const c=Math.cos(z*Math.PI/180);
			const s=Math.sin(z*Math.PI/180);
			matrix.multiply([
				c,s,0,0,
				-s,c,0,0,
				0,0,1,0,
				0,0,0,1
			]);
		}
		return this.multiply(matrix.data,m)
	}


	scale(x,y,z,m){
		return this.multiply([
			x,0,0,0,
			0,y,0,0,
			0,0,z,0,
			0,0,0,1
		],m);
	}
}


class Button{
	constructor(m,c,c_,mode){
		this.data=[
			-50,-50,0,
			0,1,
			50,-50,0,
			1,1,
			50,50,0,
			1,0,
			50,50,0,
			1,0,
			-50,50,0,
			0,0,
			-50,-50,0,
			0,1
		];
		this.m=new Matrix();
		this.m.multiply(m);
		this.pointXY=this.m.multiply([-50,-50,0,1]);
		this.pointWH=this.m.multiply([50,50,0,1]);
		this.c=c;
		this.c_=c_;
		this.but=false;
		this.mode=mode===undefined?true:mode;
	}

	
	on(x,y,func){
		x=(x-window.innerWidth*0.5)*2.1;
		y=-((y-window.innerHeight*0.5)*1.118);
		/*alert(`${x} ${y}
			${this.pointXY[0]} ${this.pointXY[1]}
			${this.pointWH[0]} ${this.pointWH[1]}`
		);*/
		if(x>this.pointXY[0]&&x<this.pointWH[0]){
			if(y>this.pointXY[1]&&y<this.pointWH[1]){
				if(this.mode===false){
					this.but=true;
					setTimeout(()=>{
						if(func!=undefined)
							func();
					},300);
				}
				else{
					this.but=!this.but;
				}
			}
		}
	}


	show(){
		if(this.but)
			gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([Math.floor(this.c_[0]*255),Math.floor(this.c_[1]*255),Math.floor(this.c_[2]*255),Math.floor(this.c_[3]*255)]));
		else
			gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([Math.floor(this.c[0]*255),Math.floor(this.c[1]*255),Math.floor(this.c[2]*255),Math.floor(this.c[3]*255)]));
		gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.data),gl.STATIC_DRAW);
		gl.vertexAttribPointer(position,3,gl.FLOAT,false,20,0);
		gl.vertexAttribPointer(tex,2,gl.FLOAT,false,20,12);
		gl.uniformMatrix4fv(matrix,false,this.m.data);
		gl.drawArrays(gl.TRIANGLES,0,this.data.length/5);
	};
}


class Menu{
	constructor(m,c){
		this.data=[
			-50,-50,0,
			0,1,
			50,-50,0,
			1,1,
			50,50,0,
			1,0,
			50,50,0,
			1,0,
			-50,50,0,
			0,0,
			-50,-50,0,
			0,1
		];
		this.m=new Matrix();
		this.m.multiply(m);
		this.c=c;
		this.be=false;
	}


	show(){
		if(this.be===true)
			gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([Math.floor(this.c[0]*255),Math.floor(this.c[1]*255),Math.floor(this.c[2]*255),Math.floor(this.c[3]*255)]));
			gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.data),gl.STATIC_DRAW);
			gl.vertexAttribPointer(position,3,gl.FLOAT,false,20,0);
			gl.vertexAttribPointer(tex,2,gl.FLOAT,false,20,12);
			gl.uniformMatrix4fv(matrix,false,this.m.data);
			gl.drawArrays(gl.TRIANGLES,0,this.data.length/5);
	};
}


function createRect(m,c,t){
	const data=[
		-50,-50,50,
		0,1,
		50,-50,50,
		1,1,
		50,50,50,
		1,0,
		50,50,50,
		1,0,
		-50,50,50,
		0,0,
		-50,-50,50,
		0,1
	];
	if(t===undefined)
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([Math.floor(c[0]*255),Math.floor(c[1]*255),Math.floor(c[2]*255),Math.floor(c[3]*255)]));
	else{
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,t);
		gl.generateMipmap(gl.TEXTURE_2D);
	}
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.vertexAttribPointer(position,3,gl.FLOAT,false,20,0);
	gl.vertexAttribPointer(tex,2,gl.FLOAT,false,20,12);
	gl.uniformMatrix4fv(matrix,false,m);
	gl.drawArrays(gl.TRIANGLES,0,data.length/5);
}


function init(canvas){
	images=[];
	start=[0,0];
	rotates=[0,0];
	gl=canvas.getContext('webgl');
	const program=createProgram();
	gl.useProgram(program);
	gl.viewport(0,0,window.innerWidth,window.innerHeight);
	gl.clearColor(0,0,0,1);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);
	position=gl.getAttribLocation(program,'position');
	tex=gl.getAttribLocation(program,'tex');
	matrix=gl.getUniformLocation(program,'matrix');
	gl.enableVertexAttribArray(position);
	gl.enableVertexAttribArray(tex);
	const buffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
	const texture=gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D,texture);
	mainMatrix=new Matrix();
	mainMatrix.perspective(1,window.innerWidth/window.innerHeight,1,8000);
	mainMatrix.translate(0,0,-1000);
	button1=new Button(
		mainMatrix.multiply(
			mainMatrix.translate(-240,1760,0,1),
			mainMatrix.scale(1,0.3,1,mainMatrix.data)
		),
		[0.6,0.6,0.6,1],
		[0.4,0.4,0.4,1],
		false
	);
	button2=new Button(
		mainMatrix.multiply(
			mainMatrix.translate(-138,1760,0,1),
			mainMatrix.scale(1,0.3,1,mainMatrix.data)
		),
		[0.6,0.6,0.6,1],
		[0.4,0.4,0.4,1],
	);
	for(let i=1;i<=HOW_MANY_IMAGES;i++){
		const image=new Image();
		image.src='art'+i+'.jpg';
		image.addEventListener('load',()=>{
			images.push(image);
			draw(0,0);
		});
	}
}


function draw(rX,rY){
	if(rX>0&&rX<40)
		rX=0;
	if(rX<0&&rX>-40)
		rX=0;
	if(rY>0&&rY<80)
		rY=0;
	if(rY<0&&rY>-80)
		rY=0;
	rotates[0]+=rX*0.01;
	rotates[1]+=rY*0.01;
	let localMatrix=new Matrix();
	localMatrix.multiply(mainMatrix.rotate(rotates[1],rotates[0],0,mainMatrix.data));
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	button1.show();
	button2.show();
	createRect(localMatrix.data,[0.5,0.5,0.5,1],images[0]);
}


const root=document.querySelector('#root');
root.style.position='relative';
const infoX=document.createElement('div');
infoX.textContent='button 1';
infoX.style.position='absolute';
infoX.style.left='60px';
infoX.style.top='22px';
infoX.style.zIndex='2';
const infoY=document.createElement('div');
infoY.textContent='button 2';
infoY.style.position='absolute';
infoY.style.left='230px';
infoY.style.top='22px';
infoY.style.zIndex='2';
root.appendChild(infoX);
root.appendChild(infoY);
document.body.style.overscrollBehavior='contain';
const canvas=document.querySelector('#canvas');
canvas.style.position='absolute';
canvas.style.zIndex='1';
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);


canvas.addEventListener('touchstart',(e)=>{
	start[0]=e.touches[0].clientX;
	start[1]=e.touches[0].clientY;
	button1.on(start[0],start[1],()=>{
		init(canvas);
		draw(0,0);
	});
	button2.on(start[0],start[1]);
	draw(0,0);
});


canvas.addEventListener('touchmove',(e)=>{
	draw(
		start[0]-e.touches[0].clientX,
		start[1]-e.touches[0].clientY
	);
});


init(canvas);
draw(0,0);
