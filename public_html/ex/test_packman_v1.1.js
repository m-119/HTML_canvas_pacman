//v.1.1 � ������ ����� �������� ��� �� �, ������ ������� ������, �� ��� ����������� ������ � ����� ������ ������

onload = () => 
{

  canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500");	//������� �����
  
	var pacmanIMG = new Image();		//����� ������
	pacmanIMG.src = "pacman.png";		//��������

	var animationX = 0			//���� �� X
	var animationY = 0			//���� �� Y
	var x = 0;					//��������� ������� �� X
	var y = 0;					//��������� ������� �� Y
	let orientation = 3;			//1-�����, 2-�����, 3-������, 4-����	- ������������ �������� � ������ ����, ��� ������� ����� ���� ������ � 4� ������������
	let frameSize = 50;				//������ �����
	
	var context = canvas.getContext('2d');	//�������� ������ �� ���������

setInterval(() =>
{
context.clearRect(x, y, frameSize, frameSize);	//������ ����� (����� ���������� ��������� ������)
//��������� ����� ����: ���, ������� ����� �� X Y, ����� �������� ����� � �...
context.drawImage (pacmanIMG, animationX, animationY, frameSize, frameSize, x, y, frameSize, frameSize);

animationX = (animationX+50)%500;		//���� ��������� ����� ��������, ���������� �� ������

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//
//    image � ������ Image() ��� ������� canvas;
//    sx, sy � ���������� �������� ������ ���� ������ ������������ �����������;
//    sWidth, sHeight � ������� ������;
//    dx,dy � ���������� �������� ������ ���� ����������� �����������;
//    dWidth, dHeight � ������� ����������� ����������� �� ������.

},50)		//��� ��������

function move()	//1-�����, 2-�����, 3-������, 4-����
{
	x+=50;
	console.log(x);
	//console.log(context);
	//���� ������ �����������, ���, ���� ������ ��������������, � ������ ��� �����������, �.�. ��� ����������� � ��������� Y, �� ������� ������
}

function orientating(newOrientation)	//1-�����, 2-�����, 3-������, 4-����
{
	let temp = newOrientation - orientation;				//��������� ����������: ����� - ������ = ����������� ��������
	//console.log("temp:"+temp+",newOrientation:"+newOrientation+",orientation:"+orientation);
	
	if(orientation!=newOrientation) {orientation = newOrientation;}	//���� ���������� ����������, ���������� ����� �����������
	
	return temp;										//���������� '��������' ��������
}

document.onkeydown = function (e) // ��������� ������� (���, ������ � ���������, �� ��� �����)
	{
	
		e.preventDefault();						//������ �������� �� ���������
		
		context.translate (x+0.5*50,y+0.5*50);		//���������� �������� (�������+�������� �����)
		
		//console.log(e.keyCode);
		//console.log(x);
		

		
		//alert(e.keyCode);
		switch (e.keyCode)
		{
			case 37: context.rotate(orientating(1) * 90 * Math.PI / 180);break;		//�����
			case 38: context.rotate(orientating(2) * 90 * Math.PI / 180);break;		//�����
			case 39: context.rotate(orientating(3) * 90 * Math.PI / 180);break;		//������
			case 40: context.rotate(orientating(4) * 90 * Math.PI / 180);break;		//����
			default:break;	//������
		}
		 
		 		//���������
		 
		 context.translate (-(x+0.5*50),-(y+0.5*50));
		 
		 move();
		 
		 
	}
}



