//v.1.1 в данном файле смещение идЄт по х, удобно считать пробег, но нет возможности пон€ть в какой клетке пакмен

onload = () => 
{

  canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500");	//создаем канву
  
	var pacmanIMG = new Image();		//новый объект
	pacmanIMG.src = "pacman.png";		//картинка

	var animationX = 0			//кадр по X
	var animationY = 0			//кадр по Y
	var x = 0;					//положение объекта по X
	var y = 0;					//положение объекта по Y
	let orientation = 3;			//1-влево, 2-вверх, 3-вправо, 4-вниз	- кожэффициент вращени€ с учЄтом того, что поворот может быть только в 4х направлени€х
	let frameSize = 50;				//размер кадра
	
	var context = canvas.getContext('2d');	//получаем ссылку на контектст

setInterval(() =>
{
context.clearRect(x, y, frameSize, frameSize);	//чистим фрейм (иначе произойдет наложение кадров)
//размещаем новый кадр: что, позици€ кадра по X Y, каких размеров фрейм Ў ¬...
context.drawImage (pacmanIMG, animationX, animationY, frameSize, frameSize, x, y, frameSize, frameSize);

animationX = (animationX+50)%500;		//если достигаем конца анимации, сбрасываем на начало

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//
//    image Ч объект Image() или элемент canvas;
//    sx, sy Ч координаты верхнего левого угла слайса относительно изображени€;
//    sWidth, sHeight Ч размеры слайса;
//    dx,dy Ч координаты верхнего левого угла обрезанного изображени€;
//    dWidth, dHeight Ч размеры обрезанного изображени€ на холсте.

},50)		//сам интервал

function move()	//1-влево, 2-вверх, 3-вправо, 4-вниз
{
	x+=50;
	console.log(x);
	//console.log(context);
	//весь прикол заключаетс€, что, если пакмен поворачиваетс€, х мен€ет своЄ направление, т.е. нет потребности в изменении Y, но следуем делать
}

function orientating(newOrientation)	//1-влево, 2-вверх, 3-вправо, 4-вниз
{
	let temp = newOrientation - orientation;				//вычисл€ем ориентацию: нова€ - стара€ = направление поворота
	//console.log("temp:"+temp+",newOrientation:"+newOrientation+",orientation:"+orientation);
	
	if(orientation!=newOrientation) {orientation = newOrientation;}	//если ориентаци€ изменилась, запоминаем новое направление
	
	return temp;										//возвращаем 'смещение' поворота
}

document.onkeydown = function (e) // анонимна€ функци€ (вс€, вместе с потрохами, но без имени)
	{
	
		e.preventDefault();						//отмена действи€ по умолчанию
		
		context.translate (x+0.5*50,y+0.5*50);		//смещаемось поворота (позици€+половина кадра)
		
		//console.log(e.keyCode);
		//console.log(x);
		

		
		//alert(e.keyCode);
		switch (e.keyCode)
		{
			case 37: context.rotate(orientating(1) * 90 * Math.PI / 180);break;		//влево
			case 38: context.rotate(orientating(2) * 90 * Math.PI / 180);break;		//вверх
			case 39: context.rotate(orientating(3) * 90 * Math.PI / 180);break;		//вправо
			case 40: context.rotate(orientating(4) * 90 * Math.PI / 180);break;		//вниз
			default:break;	//другое
		}
		 
		 		//двигаемс€
		 
		 context.translate (-(x+0.5*50),-(y+0.5*50));
		 
		 move();
		 
		 
	}
}



