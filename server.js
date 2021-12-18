const express=require('express');


const app=express();


app.use((req,res,next)=>{
	console.log(req.url);
	next();
});


app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/dist/index.html');
});


app.get('/lookat',(req,res)=>{
	res.sendFile(__dirname+'/dist/lookat.html');
});


app.get('/lookat.js',(req,res)=>{
	res.sendFile(__dirname+'/dist/lookat.js');
});


app.get('/touch',(req,res)=>{
	res.sendFile(__dirname+'/dist/touch.html');
});


app.get('/touch.js',(req,res)=>{
	res.sendFile(__dirname+'/dist/touch.js');
});


app.get('/webgl.js',(req,res)=>{
	res.sendFile(__dirname+'/dist/webgl.js');
});


app.get('/button',(req,res)=>{
	res.sendFile(__dirname+'/dist/button.html');
});


app.get('/button.js',(req,res)=>{
	res.sendFile(__dirname+'/dist/button.js');
});


app.get('/animation',(req,res)=>{
	res.sendFile(__dirname+'/dist/animation.html');
});


app.get('/animation.js',(req,res)=>{
	res.sendFile(__dirname+'/dist/animation.js');
});


app.get('/sphere',(req,res)=>{
	res.sendFile(__dirname+'/dist/sphere.html');
});


app.get('/sphere.js',(req,res)=>{
	res.sendFile(__dirname+'/dist/sphere.js');
});


app.get('/art',(req,res)=>{
	res.sendFile(__dirname+'/dist/art.html');
});


app.get('/art1.jpg',(req,res)=>{
	res.sendFile(__dirname+'/dist/art1.jpg');
});


app.get('/art2.jpg',(req,res)=>{
	res.sendFile(__dirname+'/dist/art2.jpg');
});


app.get('/art3.jpg',(req,res)=>{
	res.sendFile(__dirname+'/dist/art3.jpg');
});


app.get('/art.js',(req,res)=>{
	res.sendFile(__dirname+'/dist/art.js');
});


app.get('/void',(req,res)=>{
	res.sendFile(__dirname+'/dist/void.html');
});


app.get('/void.js',(req,res)=>{
	res.sendFile(__dirname+'/dist/void.js');
});


app.listen(4848,'127.0.0.1',()=>{
	console.log('\x1b[1;32mServer is working...\x1b[0m');
});
