//v.1.1 в данном файле смещение идЄт по х, удобно считать пробег, но нет возможности пон€ть в какой клетке пакмен

onload = () => 
{

  canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500");	//создаем канву
  
	var pacmanIMG = new Image();		//новый объект
	pacmanIMG.src = "pacman.png";		//картинка

	var animationX = 0			//кадр по X
	var animationY = 0			//кадр по Y
	var X = 3;					//положение объекта по X
	var Y = 3;					//положение объекта по Y
	
	let orientation = 0;			//0-вправо, 1-вниз, 2 влево, 3-вверх
	
	let frameSize = 50;				//размер кадра
	
	var context = canvas.getContext('2d');	//получаем ссылку на контектст
//движение
function move(_X,_Y)	//1-влево, 2-вверх, 3-вправо, 4-вниз
{
	X+=_X;
	Y+=_Y;
	console.log(X);
	//console.log(context);
	//весь прикол заключаетс€, что, если пакмен поворачиваетс€, х мен€ет своЄ направление, т.е. нет потребности в изменении Y, но следуем делать
}

setInterval(() =>
{
context.save();

console.log(X+":"+Y);

//размещаем новый кадр: что, позици€ кадра по X Y, каких размеров фрейм Ў ¬...
//context.translate (0.5*frameSize,0.5*frameSize);		//смещаемось поворота (позици€+половина кадра)

context.clearRect(X*frameSize, Y*frameSize, frameSize, frameSize);	//чистим фрейм (иначе произойдет наложение кадров)

context.translate (frameSize,0);

context.rotate(0 * 90 * Math.PI / 180);

context.drawImage (pacmanIMG, animationX, animationY, frameSize, frameSize, X*frameSize, Y*frameSize, frameSize, frameSize);

animationX = (animationX+frameSize)%500;		//если достигаем конца анимации, сбрасываем на начало



//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//
//    image Ч объект Image() или элемент canvas;
//    sx, sy Ч координаты верхнего левого угла слайса относительно изображени€;
//    sWidth, sHeight Ч размеры слайса;
//    dx,dy Ч координаты верхнего левого угла обрезанного изображени€;
//    dWidth, dHeight Ч размеры обрезанного изображени€ на холсте.

context.restore();

},50)		//сам интервал





document.onkeydown = function (e) // анонимна€ функци€ (вс€, вместе с потрохами, но без имени)
	{
	
		e.preventDefault();						//отмена действи€ по умолчанию
				
		//alert(e.keyCode);
		switch (e.keyCode)
		{
			case 37: move(-1,0); orientation = 2; break;		//влево
			case 38: move(0,-1); orientation = 3; break;		//вверх
			case 39: move(1,0); orientation = 0; break;		//вправо
			case 40: move(0,1); orientation = 1; break;		//вниз
			default:break;	//другое
		}		 
		 
	}
}



