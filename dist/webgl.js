
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
	}
}
