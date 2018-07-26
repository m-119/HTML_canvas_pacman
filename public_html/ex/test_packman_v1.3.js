//v.1.1 в данном файле смещение идЄт по х, удобно считать пробег, но нет возможности пон€ть в какой клетке пакмен

onload = () => 
{

  canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500");	//создаем канву
  
	var pacmanIMG = new Image();		//новый объект
	pacmanIMG.src = "pacman.png";		//картинка

	var animationX = 0			//кадр по X
	var animationY = 0			//кадр по Y
	var rotateCorrectionX = 0			//кадр по X
	var rotateCorrectionY = 0			//кадр по Y
	var X = 0;					//положение объекта по X
	var Y = 0;					//положение объекта по Y
	let orientation = 0;			//1-влево, 2-вверх, 3-вправо, 4-вниз	- кожэффициент вращени€ с учЄтом того, что поворот может быть только в 4х направлени€х
	let frameSize = 50;				//размер кадра
	
	var context = canvas.getContext('2d');	//получаем ссылку на контектст

setInterval(() =>
{

context.save();
context.clearRect(X*frameSize, Y*frameSize, frameSize, frameSize);	//чистим фрейм (иначе произойдет наложение кадров)

context.translate (X*frameSize,Y*frameSize);

context.translate (rotateCorrectionX*frameSize,rotateCorrectionY*frameSize);		//коррекци€ вращени€
context.rotate(orientation * 90 * Math.PI / 180);

//размещаем новый кадр: что, позици€ кадра по X Y, каких размеров фрейм Ў ¬...
context.drawImage (pacmanIMG, animationX, animationY, frameSize, frameSize, 0, 0, frameSize, frameSize);

animationX = (animationX+50)%500;		//если достигаем конца анимации, сбрасываем на начало

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//
//    image Ч объект Image() или элемент canvas;
//    sx, sy Ч координаты верхнего левого угла слайса относительно изображени€;
//    sWidth, sHeight Ч размеры слайса;
//    dx,dy Ч координаты верхнего левого угла обрезанного изображени€;
//    dWidth, dHeight Ч размеры обрезанного изображени€ на холсте.
context.restore();

},50)		//сам интервал

function rotateCorrection(_a,_b)		//корректировка центра вращени€
{
	rotateCorrectionX = _a;
	rotateCorrectionY = _b;
}

document.onkeydown = function (e) // анонимна€ функци€ (вс€, вместе с потрохами, но без имени)
	{
	
		e.preventDefault();						//отмена действи€ по умолчанию
		
		//console.log(e.keyCode);
		//console.log(x);
		

		
		//alert(e.keyCode);
		switch (e.keyCode)
		{
			case 37: orientation = 2; --X; rotateCorrection(1,1); break;		//влево
			case 38: orientation = 3; --Y; rotateCorrection(0,1); break;		//вверх
			case 39: orientation = 0; ++X; rotateCorrection(0,0); break;		//вправо
			case 40: orientation = 1; ++Y; rotateCorrection(1,0); break;		//вниз
			default:break;	//другое
		}
		 
		 
		 
		 //context.translate (-(x+0.5*50),-(y+0.5*50));
		 
		 
		 
		 
	}
}



