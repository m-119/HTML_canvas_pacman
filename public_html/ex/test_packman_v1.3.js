//v.1.1 � ������ ����� �������� ��� �� �, ������ ������� ������, �� ��� ����������� ������ � ����� ������ ������

onload = () => 
{

  canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500");	//������� �����
  
	var pacmanIMG = new Image();		//����� ������
	pacmanIMG.src = "pacman.png";		//��������

	var animationX = 0			//���� �� X
	var animationY = 0			//���� �� Y
	var rotateCorrectionX = 0			//���� �� X
	var rotateCorrectionY = 0			//���� �� Y
	var X = 0;					//��������� ������� �� X
	var Y = 0;					//��������� ������� �� Y
	let orientation = 0;			//1-�����, 2-�����, 3-������, 4-����	- ������������ �������� � ������ ����, ��� ������� ����� ���� ������ � 4� ������������
	let frameSize = 50;				//������ �����
	
	var context = canvas.getContext('2d');	//�������� ������ �� ���������

setInterval(() =>
{

context.save();
context.clearRect(X*frameSize, Y*frameSize, frameSize, frameSize);	//������ ����� (����� ���������� ��������� ������)

context.translate (X*frameSize,Y*frameSize);

context.translate (rotateCorrectionX*frameSize,rotateCorrectionY*frameSize);		//��������� ��������
context.rotate(orientation * 90 * Math.PI / 180);

//��������� ����� ����: ���, ������� ����� �� X Y, ����� �������� ����� � �...
context.drawImage (pacmanIMG, animationX, animationY, frameSize, frameSize, 0, 0, frameSize, frameSize);

animationX = (animationX+50)%500;		//���� ��������� ����� ��������, ���������� �� ������

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//
//    image � ������ Image() ��� ������� canvas;
//    sx, sy � ���������� �������� ������ ���� ������ ������������ �����������;
//    sWidth, sHeight � ������� ������;
//    dx,dy � ���������� �������� ������ ���� ����������� �����������;
//    dWidth, dHeight � ������� ����������� ����������� �� ������.
context.restore();

},50)		//��� ��������

function rotateCorrection(_a,_b)		//������������� ������ ��������
{
	rotateCorrectionX = _a;
	rotateCorrectionY = _b;
}

document.onkeydown = function (e) // ��������� ������� (���, ������ � ���������, �� ��� �����)
	{
	
		e.preventDefault();						//������ �������� �� ���������
		
		//console.log(e.keyCode);
		//console.log(x);
		

		
		//alert(e.keyCode);
		switch (e.keyCode)
		{
			case 37: orientation = 2; --X; rotateCorrection(1,1); break;		//�����
			case 38: orientation = 3; --Y; rotateCorrection(0,1); break;		//�����
			case 39: orientation = 0; ++X; rotateCorrection(0,0); break;		//������
			case 40: orientation = 1; ++Y; rotateCorrection(1,0); break;		//����
			default:break;	//������
		}
		 
		 
		 
		 //context.translate (-(x+0.5*50),-(y+0.5*50));
		 
		 
		 
		 
	}
}



