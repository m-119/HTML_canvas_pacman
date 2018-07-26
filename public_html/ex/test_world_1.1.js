

class Cube {


	constructor (x_ = 0, y_ = 0, pGo_ = false, gGo_ = false, content_ = null, pIndex_ = 0)
	{
		
		this.x = x_;					//позицияX
		this.y = y_;					//позицияY
		this.pGo = pGo_;				//может проходит пакмен
		this.gGo = gGo_;				//может проходит призрак
		this.content = content_;		//есть доп.контент
		this.pIndex = pIndex_;			//ин
	}
	
	static getCube(x,y,element,settings)
	{
		var pGo,gGo,content,pIndex;
		switch (element)
			{
			case settings.wall:	{pGo = false;	gGo = false;	content = null;	pIndex = 1;}	; break;
			case settings.noWalk:	{pGo = false;	gGo = true;	content = null;	pIndex = 3;}	; break;
			case settings.dotWalk:	{pGo = true;	gGo = true;	content = "point";	pIndex = 3;}	; break;
			case settings.noDotWalk:	{pGo = true;	gGo = true;	content = null;	pIndex = 5;}	; break;
			case settings.pacman:	{pGo = true;	gGo = true;	content = "packman";	pIndex = 5;}	; break;
			case settings.ghostWalk:	{pGo = true;	gGo = true;	content = "ghost";	pIndex = 5;}	; break;
			case settings.ghostNoWalk:	{pGo = false;	gGo = true;	content = "ghost";	pIndex = 3;}	; break;
			case settings.bonus:	{pGo = true;	gGo = true;	content = "bonus";	pIndex = 5;}	; break;
			default: console.log ("Ошибка построения элемента карты// element:" +element+ "\n pGo:" +pGo+ "; gGo:" +gGo+ "; content:" +content+ "; pIndex:" +pIndex+ ";");
			}
		return new Cube(x,y,pGo,gGo,content,pIndex);
	}

}

class World {

	constructor (world_ = null)
	{
		this.world = world_.split("\n");		//разрежем мир по строкам
		
			//применяем настройки
		this.settings = {wall:this.world[0][0],
						noWalk:this.world[0][1],
						dotWalk:this.world[0][2],
						noDotWalk:this.world[0][3],
						pacman:this.world[0][4],
						ghostWalk:this.world[0][5],
						ghostNoWalk:this.world[0][6],
						bonus:this.world[0][7],
						sizeX:this.world[1].length,
						sizeY:this.world.length-1};
						
		//delete world[0]; - отрезаем настройки от мира
		this.world.splice(0, 1);
		
		
		for (var i = 0; i < this.settings.sizeY; i++) this.world[i] = Array.from(this.world[i]);
		
		for (var i = 0; i < this.world.length; i++)
			for (var j = 0; j < this.world[i].length; j++)
				{this.world[i][j] = Cube.getCube(j,i,this.world[i][j],this.settings);}	//заполняем мир кубиками
												//

	/*for (var i = 0; i < pacmanWorld.sizeX; i++)
	{
		for (var j = 0; j < pacmanWorld.sizeY; j++)
			{
				
				context.save();
				//context.translate(frameSize*c.x,frameSize*c.y);
				context.drawImage (elementsIMG, 50, 0, frameSize, frameSize, 0, 0, frameSize, frameSize);
				//context.drawImage (elementsIMG, c.pIndex*frameSize, c.pIndex*frameSize, frameSize, frameSize, 0, 0, frameSize, frameSize);
				context.restore();
			}
	}
	
	}*/
	


}

}








onload = () => new Game();

	


class Game {

	constructor (world_ = null)
	{
		let canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500");	//создаем канву
		//var canvas = document.createElement("canvas");
		//document.body.appendChild(canvas);

		/*
█ - стена
▒ - нет стены и прохода
░ - проход с точкой
  - проход без точки
☺ - pacman
□ - призрак с проходом через клетку
■ - призрак без прохода
♥ - бонусы
*/
let frameSize = 50;

let worlds=["█▒░ ☺□■♥\n\
████████████████████████████\n\
█░░░░░░░░░░░░██░░░░░░░░░░░░█\n\
█░████░█████░██░█████░████░█\n\
█♥████░█████░██░█████░████♥█\n\
█░████░█████░██░█████░████░█\n\
█░░░░░░░░░░░░░░░░░░░░░░░░░░█\n\
█░████░██░████████░██░████░█\n\
█░████░██░████████░██░████░█\n\
█░░░░░░██░░░░██░░░░██░░░░░░█\n\
██████░█████░██░█████░██████\n\
██████░█████░██░█████░██████\n\
██████░██░░░░░░░░░░██░██████\n\
██████░██░███▒▒███░██░██████\n\
██████░██░███▒▒███░██░██████\n\
░░░░░░░░░░██■■■■██░░░░░░░░░░\n\
██████░██░████████░██░██████\n\
██████░██░████████░██░██████\n\
██████░██░░░░░░░░░░██░██████\n\
██████░██░████████░██░██████\n\
██████░██░████████░██░██████\n\
█░░░░░░░░░░░░██░░░░░░░░░░░░█\n\
█░████░█████░██░█████░████░█\n\
█░████░█████░██░█████░████░█\n\
█░░░██░░░░░░░☺░░░░░░░░██░░░█\n\
███░██░██░████████░██░██░███\n\
███░██░██░████████░██░██░███\n\
█░░░░░░██░░░░██░░░░██░░░░░░█\n\
█░██████████░██░██████████░█\n\
█♥██████████░██░██████████♥█\n\
█░░░░░░░░░░░░░░░░░░░░░░░░░░█\n\
████████████████████████████"];
		
		
		
		
		
		//загружаем мир	
	let pacmanWorld = new World(worlds[0]);
	
	document.querySelector('canvas').width = pacmanWorld.settings.sizeX*frameSize;
	document.querySelector('canvas').height = pacmanWorld.settings.sizeY*frameSize;
	
	let elementsIMG = new Image();		//новый объект
	elementsIMG.src = "elements.png";		//картинка

	//создаем поле
	//canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500");	//создаем канву
	//console.log(world);
	//console.log(settings.wall);
	
	//создание игрового поля	
	let context = canvas.getContext('2d');	//получаем ссылку на контектст

	//отрисовка карты
	setTimeout(() =>
	{

		for (var l = 0; l < pacmanWorld.settings.sizeY; l++)
		{
			for (var c = 0; c < pacmanWorld.settings.sizeX; c++)
				{
					console.log(pacmanWorld.world[l][c].pIndex);
					console.log(l + " " + c);
					context.drawImage (elementsIMG, pacmanWorld.world[l][c].pIndex*frameSize, 0, frameSize, frameSize, pacmanWorld.world[l][c].x*frameSize, pacmanWorld.world[l][c].y*frameSize, frameSize, frameSize);
					//context.drawImage (elementsIMG, pacmanWorld.world[j][i].pIndex, 0, frameSize, frameSize, j*frameSize, i*frameSize, frameSize, frameSize);
				}
		}
	},25)

		
	}
	
}




