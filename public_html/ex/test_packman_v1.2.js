//v.1.1 � ������ ����� �������� ��� �� �, ������ ������� ������, �� ��� ����������� ������ � ����� ������ ������

onload = () => 
{

  canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500");	//������� �����
  
	var pacmanIMG = new Image();		//����� ������
	pacmanIMG.src = "pacman.png";		//��������

	var animationX = 0			//���� �� X
	var animationY = 0			//���� �� Y
	var X = 3;					//��������� ������� �� X
	var Y = 3;					//��������� ������� �� Y
	
	let orientation = 0;			//0-������, 1-����, 2 �����, 3-�����
	
	let frameSize = 50;				//������ �����
	
	var context = canvas.getContext('2d');	//�������� ������ �� ���������
//��������
function move(_X,_Y)	//1-�����, 2-�����, 3-������, 4-����
{
	X+=_X;
	Y+=_Y;
	console.log(X);
	//console.log(context);
	//���� ������ �����������, ���, ���� ������ ��������������, � ������ ��� �����������, �.�. ��� ����������� � ��������� Y, �� ������� ������
}

setInterval(() =>
{
context.save();

console.log(X+":"+Y);

//��������� ����� ����: ���, ������� ����� �� X Y, ����� �������� ����� � �...
//context.translate (0.5*frameSize,0.5*frameSize);		//���������� �������� (�������+�������� �����)

context.clearRect(X*frameSize, Y*frameSize, frameSize, frameSize);	//������ ����� (����� ���������� ��������� ������)

context.translate (frameSize,0);

context.rotate(0 * 90 * Math.PI / 180);

context.drawImage (pacmanIMG, animationX, animationY, frameSize, frameSize, X*frameSize, Y*frameSize, frameSize, frameSize);

animationX = (animationX+frameSize)%500;		//���� ��������� ����� ��������, ���������� �� ������



//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//
//    image � ������ Image() ��� ������� canvas;
//    sx, sy � ���������� �������� ������ ���� ������ ������������ �����������;
//    sWidth, sHeight � ������� ������;
//    dx,dy � ���������� �������� ������ ���� ����������� �����������;
//    dWidth, dHeight � ������� ����������� ����������� �� ������.

context.restore();

},50)		//��� ��������





document.onkeydown = function (e) // ��������� ������� (���, ������ � ���������, �� ��� �����)
	{
	
		e.preventDefault();						//������ �������� �� ���������
				
		//alert(e.keyCode);
		switch (e.keyCode)
		{
			case 37: move(-1,0); orientation = 2; break;		//�����
			case 38: move(0,-1); orientation = 3; break;		//�����
			case 39: move(1,0); orientation = 0; break;		//������
			case 40: move(0,1); orientation = 1; break;		//����
			default:break;	//������
		}		 
		 
	}
}



