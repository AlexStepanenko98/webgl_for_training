class Matrix{
	//CONSTRUCTOR
	constructor(kind){
		this.kind=Number(kind);
		if(this.kind===4){
			this.data=[
				1,0,0,0,
				0,1,0,0,
				0,0,1,0,
				0,0,0,1
			]
			return this.data
		}
		else if(this.kind===3){
			this.data=[
				1,0,0,
				0,1,0,
				0,0,1,
			]
			return this.data
		}
		else if(this.kind===2){
			this.data=[
				1,0,
				0,1,
			]
			return this.data
		}
		else{
			this.kind=0;
			return undefined;
		}
	}
	//CONSTRUCTOR
	//
	//
	//MULTIPLY
	multiply(m1,m2){
		if(m1===undefined)
			return undefined;
		if(m2===undefined){
			const kind=Math.sqrt(m1.length);
			if(kind!=this.kind)
				return undefined;
			if(this.kind===4){
				const data=[];
				data[0]=m1[0]*this.data[0]+m1[1]*this.data[4]+m1[2]*this.data[8]+m1[3]*this.data[12];
				data[1]=m1[0]*this.data[1]+m1[1]*this.data[5]+m1[2]*this.data[9]+m1[3]*this.data[13];
				data[2]=m1[0]*this.data[2]+m1[1]*this.data[6]+m1[2]*this.data[10]+m1[3]*this.data[14];
				data[3]=m1[0]*this.data[3]+m1[1]*this.data[7]+m1[2]*this.data[11]+m1[3]*this.data[15];


				data[4]=m1[4]*this.data[0]+m1[5]*this.data[4]+m1[6]*this.data[8]+m1[7]*this.data[12];
				data[5]=m1[4]*this.data[1]+m1[5]*this.data[5]+m1[6]*this.data[9]+m1[7]*this.data[13];
				data[6]=m1[4]*this.data[2]+m1[5]*this.data[6]+m1[6]*this.data[10]+m1[7]*this.data[14];
				data[7]=m1[4]*this.data[3]+m1[5]*this.data[7]+m1[6]*this.data[11]+m1[7]*this.data[15];


				data[8]=m1[8]*this.data[0]+m1[9]*this.data[4]+m1[10]*this.data[8]+m1[11]*this.data[12];
				data[9]=m1[8]*this.data[1]+m1[9]*this.data[5]+m1[10]*this.data[9]+m1[11]*this.data[13];
				data[10]=m1[8]*this.data[2]+m1[9]*this.data[6]+m1[10]*this.data[10]+m1[11]*this.data[14];
				data[11]=m1[8]*this.data[3]+m1[9]*this.data[7]+m1[10]*this.data[11]+m1[11]*this.data[15];


				data[12]=m1[12]*this.data[0]+m1[13]*this.data[4]+m1[14]*this.data[8]+m1[15]*this.data[12];
				data[13]=m1[12]*this.data[1]+m1[13]*this.data[5]+m1[14]*this.data[9]+m1[15]*this.data[13];
				data[14]=m1[12]*this.data[2]+m1[13]*this.data[6]+m1[14]*this.data[10]+m1[15]*this.data[14];
				data[15]=m1[12]*this.data[3]+m1[13]*this.data[7]+m1[14]*this.data[11]+m1[15]*this.data[15];
				this.data=data;
				return data;
			}
			else if(this.kind===3){
				const data=[];
				data[0]=m1[0]*this.data[0]+m1[1]*this.data[3]+m1[2]*this.data[6];
				data[1]=m1[0]*this.data[1]+m1[1]*this.data[4]+m1[2]*this.data[7];
				data[2]=m1[0]*this.data[2]+m1[1]*this.data[5]+m1[2]*this.data[8];

				data[3]=m1[3]*this.data[0]+m1[4]*this.data[3]+m1[5]*this.data[6];
				data[4]=m1[3]*this.data[1]+m1[4]*this.data[4]+m1[5]*this.data[7];
				data[5]=m1[3]*this.data[2]+m1[4]*this.data[5]+m1[5]*this.data[8];

				data[6]=m1[6]*this.data[0]+m1[7]*this.data[3]+m1[8]*this.data[6];
				data[7]=m1[6]*this.data[1]+m1[7]*this.data[4]+m1[8]*this.data[7];
				data[8]=m1[6]*this.data[2]+m1[7]*this.data[5]+m1[8]*this.data[8];
				this.data=data;
				return data;
			}
			else if(this.kind===2){
				const data=[];
				data[0]=m1[0]*this.data[0]+m1[1]*this.data[2];
				data[1]=m1[0]*this.data[1]+m1[1]*this.data[3];

				data[2]=m1[2]*this.data[0]+m1[3]*this.data[2];
				data[3]=m1[2]*this.data[1]+m1[3]*this.data[3];
				this.data=data;
				return data;
			}
		}
		else{
			const kind1=Math.sqrt(m1.length);
			const kind2=Math.sqrt(m2.length);
			if(kind1!=kind2)
				return undefined;
			if(kind1===4){
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
				];
			}
			else if(kind1===3){
				return [
					m1[0]*m2[0]+m1[1]*m2[3]+m1[2]*m2[6],
					m1[0]*m2[1]+m1[1]*m2[4]+m1[2]*m2[7],
					m1[0]*m2[2]+m1[1]*m2[5]+m1[2]*m2[8],
					//
					m1[3]*m2[0]+m1[4]*m2[3]+m1[5]*m2[6],
					m1[3]*m2[1]+m1[4]*m2[4]+m1[5]*m2[7],
					m1[3]*m2[2]+m1[4]*m2[5]+m1[5]*m2[8],
					//
					m1[6]*m2[0]+m1[7]*m2[3]+m1[8]*m2[6],
					m1[6]*m2[1]+m1[7]*m2[4]+m1[8]*m2[7],
					m1[6]*m2[2]+m1[7]*m2[5]+m1[8]*m2[8]
				];
			}
			else if(kind1===2{
				return [
					m1[0]*m2[0]+m1[1]*m2[2],
					m1[0]*m2[1]+m1[1]*m2[3],
					//
					m1[2]*m2[0]+m1[3]*m2[2],
					m1[2]*m2[1]+m1[3]*m2[3]
				];
			}
			else
				return undefined;
		}
	}
	//MULTIPLY
	//
	//
	//TRANSLATE
	translate(x,y,z,m){
		x=Number(x);
		y=Number(y);
		z=Number(z);
		if(m===undefined){
			if(this.kind===4){
				return this.multiply([
					1,0,0,0,
					0,1,0,0,
					0,0,1,0,
					x,y,z,1
				]);
			}
			else if(this.kind===3){
				return this.multiply([
					1,0,0,
					0,1,0,
					x,y,1
				]);
			}
			else if(this.kind===2){
				return this.multiply([
					1,1,
					x,y
				]);
			}
			else
				return undefined;
		}
		else{
			const kind=Math.sqrt(m.length);
			if(kind===4){
				return this.multiply([
					1,0,0,0,
					0,1,0,0,
					0,0,1,0,
					x,y,z,1
				],m);
			}
			else if(this.kind===3){
				return this.multiply([
					1,0,0,
					0,1,0,
					x,y,1
				],m);
			}
			else if(this.kind===2){
				return this.multiply([
					1,1,
					x,y
				],m);
			}
			else
				return undefined;
		}
	}
	//TRANSLATE
	//
	//
	//ROTATE
	rotate(x,y,z,m){
		if(m===undefined)
	}
}
