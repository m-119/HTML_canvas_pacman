//v.1.4

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
	let orientation = 0;			//1-влево, 2-вверх, 3-вправо, 4-вниз	- кожэффициент вращения с учётом того, что поворот может быть только в 4х направлениях
	let frameSize = 50;				//размер кадра
	
	var context = canvas.getContext('2d');	//получаем ссылку на контектст

setInterval(() =>
{

context.save();

prevStepCleaner();

context.translate (X*frameSize,Y*frameSize);

context.translate (rotateCorrectionX*frameSize,rotateCorrectionY*frameSize);		//коррекция вращения
context.rotate(orientation * 90 * Math.PI / 180);

//размещаем новый кадр: что, позиция кадра по X Y, каких размеров фрейм Ш В...
context.drawImage (pacmanIMG, animationX, animationY, frameSize, frameSize, 0, 0, frameSize, frameSize);

animationX = (animationX+50)%500;		//если достигаем конца анимации, сбрасываем на начало

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//
//    image — объект Image() или элемент canvas;
//    sx, sy — координаты верхнего левого угла слайса относительно изображения;
//    sWidth, sHeight — размеры слайса;
//    dx,dy — координаты верхнего левого угла обрезанного изображения;
//    dWidth, dHeight — размеры обрезанного изображения на холсте.
context.restore();

},25)		//сам интервал

function rotateCorrection(_a,_b)		//корректировка центра вращения
{
	rotateCorrectionX = _a;
	rotateCorrectionY = _b;
}

//очистка предыдущего шага анимации
function prevStepCleaner() { context.clearRect(X*frameSize, Y*frameSize, frameSize, frameSize); }

document.onkeydown = function (e) // анонимная функция (вся, вместе с потрохами, но без имени)
	{
	
		e.preventDefault();						//отмена действия по умолчанию
		
		//console.log(e.keyCode);
		//console.log(x);
		

		
		//alert(e.keyCode);
		switch (e.keyCode)
		{
			case 37: prevStepCleaner(); orientation = 2; --X; rotateCorrection(1,1); break;		//влево
			case 38: prevStepCleaner(); orientation = 3; --Y; rotateCorrection(0,1); break;		//вверх
			case 39: prevStepCleaner(); orientation = 0; ++X; rotateCorrection(0,0); break;		//вправо
			case 40: prevStepCleaner(); orientation = 1; ++Y; rotateCorrection(1,0); break;		//вниз
			default:break;	//другое
		}
		 
		 
console.log(	"//*********************\n\
	X:Y :" +X+":"+Y + "\n\
	now-шаг X :" + animationX + "\n\
	now-шаг Y :" + animationY + "\n\
	корректор X :" + rotateCorrectionX + "\n\
	корректор Y :" + rotateCorrectionY + "\n\
	угол поворота :" + orientation*90 + "\n\
	резмер кадра :" + frameSize);
		 
		 //context.translate (-(x+0.5*50),-(y+0.5*50));

		 
		 
	}
}



