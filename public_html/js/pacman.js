class Cube {


    constructor(x_ = 0, y_ = 0, pGo_ = false, gGo_ = false, content_ = null, pIndex_ = 0) {

        this.x = x_; //позицияX
        this.y = y_; //позицияY
        this.pGo = pGo_; //может проходит пакмен
        this.gGo = gGo_; //может проходит призрак
        this.content = content_; //есть доп.контент
        this.pIndex = pIndex_; //ин
    }

    static getCube(x, y, element, settings) {
        var pGo, gGo, content, pIndex;
        switch (element) {
            case settings.wall:
                {
                    pGo = false;gGo = false;content = null;pIndex = 1;
                };
                break;
            case settings.noWalk:
                {
                    pGo = false;gGo = true;content = null;pIndex = 3;
                };
                break;
            case settings.dotWalk:
                {
                    pGo = true;gGo = true;content = "point";pIndex = 6;
                };
                break;
            case settings.noDotWalk:
                {
                    pGo = true;gGo = true;content = null;pIndex = 6;
                };
                break;
            case settings.pacman:
                {
                    pGo = true;gGo = true;content = 'pacman';pIndex = 4;
                };
                break;
            case settings.ghostWalk:
                {
                    pGo = true;gGo = true;content = "ghost";pIndex = 6;
                };
                break;
            case settings.ghostNoWalk:
                {
                    pGo = false;gGo = true;content = "ghost";pIndex = 3;
                };
                break;
            case settings.bonus:
                {
                    pGo = true;gGo = true;content = "bonus";pIndex = 6;
                };
                break;
            default:
                console.log("Ошибка построения элемента карты// element:" + element + "\n pGo:" + pGo + "; gGo:" + gGo + "; content:" + content + "; pIndex:" + pIndex + ";");
        }
        return new Cube(x, y, pGo, gGo, content, pIndex);
    }

}

class World {

    constructor(world_ = null) {
        this.world = world_.split("\n"); //разрежем мир по строкам

        //применяем настройки
        this.settings = {
            wall: this.world[0][0],
            noWalk: this.world[0][1],
            dotWalk: this.world[0][2],
            noDotWalk: this.world[0][3],
            pacman: this.world[0][4],
            ghostWalk: this.world[0][5],
            ghostNoWalk: this.world[0][6],
            bonus: this.world[0][7],
            sizeX: this.world[1].length,
            sizeY: this.world.length - 1
        };

        //delete world[0]; - отрезаем настройки от мира
        this.world.splice(0, 1);


        for (var i = 0; i < this.settings.sizeY; i++) this.world[i] = Array.from(this.world[i]);

        for (var i = 0; i < this.world.length; i++)
            for (var j = 0; j < this.world[i].length; j++) {
                this.world[i][j] = Cube.getCube(j, i, this.world[i][j], this.settings);
            } //заполняем мир кубиками
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

    constructor(world_ = null) {
        let canvas = $("canvas", "border=1px solid #aaa;", "width=500;height=500"); //создаем канву
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
        this.frameSize = 50;

        let worlds = ["█▒░ ☺□■♥\n\
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
████████████████████████████",
"█▒░ ☺□■♥\n\
░░░░░░░░░░░░░░░░░░░░░░░░░░░\n\
░░░░░░░░░░░░░☺░░░░░░░░░░░░░\n\
███░██░██░███░████░██░██░██\n\
███░██░██░███░████░██░██░██\n\
█░░░░░░██░░░░░█░░░░██░░░░░░\n\
█░██████████░░█░██████████░\n\
█♥█████■■███░░█░██████████♥\n\
█░░░░░░░░░░░░░░░░░░░░░░░░░░"];


        //загружаем мир	
        this.pacmanWorld = new World(worlds[0]);

        document.querySelector('canvas').width = this.pacmanWorld.settings.sizeX * this.frameSize;
        document.querySelector('canvas').height = this.pacmanWorld.settings.sizeY * this.frameSize;

        this.elementsIMG = new Image(); //новый объект
        this.elementsIMG.src = "elements.png"; //картинка

        //создание игрового поля	
        this.context = canvas.getContext('2d'); //получаем ссылку на контектст
		
		//this.context.scale(0.5,0.5);
		
		var pacman;

        //отрисовка карты
        setTimeout(() => {

            for (var l = 0; l < this.pacmanWorld.settings.sizeY; l++) {
                for (var c = 0; c < this.pacmanWorld.settings.sizeX; c++) {
                    //console.log(this.pacmanWorld.world[l][c].pIndex);
                    //console.log(!!pacman);
					//console.log(this.pacmanWorld.world[l][c].content);
                    this.draw(c,l,this.context,this.elementsIMG,this.pacmanWorld,this.frameSize);

                    //если в ячейке должен быть пакмен и его ещё не создавали
                    if (this.pacmanWorld.world[l][c].content == 'pacman' && !pacman) {
                        pacman = new Pacman(this, c, l, this.pacmanWorld);
						console.log(!!pacman);
						console.log(this.pacmanWorld.world[l][c].content);
						//var pacman = new Pacman(0, 0);
                    }
                }
            }
			
			//если есть пакмэн, значит есть чем управлять
			if (!!pacman) {
				window.onkeydown = (e) => pacman.Go(e); //ходим	
				window.setInterval(() => pacman.Animation(this.context),25); //шевелимся
			}
			
        }, 25)

        

    } //конец конструктора Game
	
	draw(x_,y_,context = this.context,elementsIMG = this.elementsIMG,pacmanWorld = this.pacmanWorld, frameSize = this.frameSize)
	{
		context.drawImage(elementsIMG, pacmanWorld.world[y_][x_].pIndex * frameSize, 0, frameSize, frameSize, pacmanWorld.world[y_][x_].x * frameSize, pacmanWorld.world[y_][x_].y * frameSize, frameSize, frameSize);
		if(pacmanWorld.world[y_][x_].content == "point")
			{context.drawImage(elementsIMG, 0, 2*frameSize, frameSize, frameSize, pacmanWorld.world[y_][x_].x * frameSize, pacmanWorld.world[y_][x_].y * frameSize, frameSize, frameSize);}
	}

}


class Pacman {
    constructor(game, x_ = 0, y_ = 0,pacmanWorld = null) {
        this.pacmanIMG = new Image(); //новый объект
        this.pacmanIMG.src = "pacman.png"; //картинка
		
		this.game = game;
		
		this.pacmanWorld = pacmanWorld;
		
		this.frameSize = 50;
		
        this.X = x_; //позицияX
        this.Y = y_; //позицияY

        this.animationX = 0 //кадр по X
        this.animationY = 0 //кадр по Y
        this.rotateCorrectionX = 0 //кадр по X
        this.rotateCorrectionY = 0 //кадр по Y
        this.orientation = 0; //1-влево, 2-вверх, 3-вправо, 4-вниз	- кожэффициент вращения с учётом того, что поворот может быть только в 4х направлениях
    }

    rotateCorrection(_a, _b) //корректировка центра вращения
    {
        this.rotateCorrectionX = _a;
        this.rotateCorrectionY = _b;
    }

    Go(e) {

        e.preventDefault(); //отмена действия по умолчанию

		this.prevStepCleaner(this.X,this.Y);
		
		console.log (this.pacmanWorld.world[this.Y][this.pacmanWorld.settings.sizeX-1]);
		console.log (this.X);
		
        switch (e.keyCode) {
            case 37:
                
                if(this.X==0 && this.pacmanWorld.world[this.Y][this.pacmanWorld.settings.sizeX-1].pGo == true)
					{this.orientation = 2;this.X = this.pacmanWorld.settings.sizeX-1;this.rotateCorrection(1, 1);}
                else if(this.pacmanWorld.world[this.Y][this.X-1].pGo == true)
					{this.orientation = 2;--this.X;this.rotateCorrection(1, 1);}
                
                break; //влево
            case 38:
                
                if(this.Y==0 && this.pacmanWorld.world[this.pacmanWorld.settings.sizeY-1][this.X].pGo == true)
					{this.orientation = 3;this.Y = this.pacmanWorld.settings.sizeY-1;this.rotateCorrection(0, 1);}
                else if(this.pacmanWorld.world[this.Y-1][this.X].pGo == true)
					{this.orientation = 3;--this.Y;this.rotateCorrection(0, 1);}
                
                break; //вверх
            case 39:
                
                if(this.X==this.pacmanWorld.settings.sizeX-1 && this.pacmanWorld.world[this.Y][0].pGo == true)
					{this.orientation = 0;this.X = 0;this.rotateCorrection(0, 0);}
                else if(this.pacmanWorld.world[this.Y][this.X+1].pGo == true)
					{this.orientation = 0;++this.X;this.rotateCorrection(0, 0);}
                
                break; //вправо
            case 40:
                
				if(this.Y==this.pacmanWorld.settings.sizeY-1 && this.pacmanWorld.world[0][this.X].pGo == true)
					{this.orientation = 1;this.Y = 0;this.rotateCorrection(1, 0);}
                else if(this.pacmanWorld.world[this.Y+1][this.X].pGo == true)
					{this.orientation = 1;++this.Y;this.rotateCorrection(1, 0);}
                
                break; //вниз
            default:
                break; //другое
			
        }
		
		if(this.pacmanWorld.world[this.Y][this.X].content == "point"){this.pacmanWorld.world[this.Y][this.X].content = null};
		
        console.log("//*********************\n\
		X:Y :" + this.X + ":" + this.Y + "\n\
		now-шаг X :" + this.animationX + "\n\
		now-шаг Y :" + this.animationY + "\n\
		корректор X :" + this.rotateCorrectionX + "\n\
		корректор Y :" + this.rotateCorrectionY + "\n\
		угол поворота :" + this.orientation * 90 + "\n\
		резмер кадра :" + this.frameSize);
    }


    Animation(context) {
        context.save();

        this.prevStepCleaner();

        context.translate(this.X * this.frameSize, this.Y * this.frameSize);
        context.translate(this.rotateCorrectionX * this.frameSize, this.rotateCorrectionY * this.frameSize); //коррекция вращения
        context.rotate(this.orientation * 90 * Math.PI / 180);

        context.drawImage(this.pacmanIMG, this.animationX, this.animationY, this.frameSize, this.frameSize, 0, 0, this.frameSize, this.frameSize);

        this.animationX = (this.animationX + 50) % 500; //если достигаем конца анимации, сбрасываем на начало

        context.restore();
    }

    prevStepCleaner() {this.game.draw(this.X,this.Y);}
}
