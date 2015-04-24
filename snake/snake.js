var snake = {
	direction:"right",
	gk:{
		name:"第一关",
		row:30,
		column:30,
		width:10,
		height:10,
		snake:[2,1],
		food:[250],
		interval:null
	},
	interval:null,
	initGame:function (){
		$("#board").css({
			"width":this.gk.column*this.gk.width+"px",
			"height":this.gk.row*this.gk.height+"px"
		});
		$(".snake").css({
			"width":this.gk.width+"px",
			"height":this.gk.height+"px"
		});
		$(".food").css({
			"width":this.gk.width+"px",
			"height":this.gk.height+"px"
		});
	},
	putPerson:function  (person,position) {
		var row=Math.floor(position/(this.gk.column));
		var column=(position%(this.gk.column));
		if (column==0) {column=this.gk.column};
		var oSnake=$("<div>").addClass(person).css({left:column*this.gk.width-this.gk.width,top:row*this.gk.height});
		$(oSnake).appendTo($("#board"));
	},
	putSnakeFood:function () {
		var _this = this;
		$("#board").html('');
		$.each(this.gk.snake,function (index,value) {
			_this.putPerson("snake",value);
		});
		$.each(this.gk.food,function (index,value) {
			_this.putPerson("food",value);
		});
		this.initGame();
	},
	nextPositon:function () {
		var nextPositon;
		row=Math.ceil(this.gk.snake[0]/(this.gk.column));
		column=(this.gk.snake[0]%(this.gk.column));
		if (this.direction=="right") {
			if (column!=(this.gk.column-1)) {
				nextPositon=this.gk.snake[0]+1;
			}else if(column==(this.gk.column-1)){
				nextPositon=this.gk.snake[0]-(this.gk.column-1);
			};
		};
		if (this.direction=="left") {
			if (column!=0) {
				nextPositon=this.gk.snake[0]-1;
			}else if(column==0){
				nextPositon=this.gk.snake[0]+(this.gk.column-1);
			};
		};
		if (this.direction=="up") {
			if (row!=1) {
				nextPositon=this.gk.snake[0]-this.gk.column;
			}else if(row==1){
				nextPositon=this.gk.snake[0]+this.gk.column*(this.gk.row-1);
			};
		};
		if (this.direction=="down") {
			if (row!=(this.gk.row)) {
				nextPositon=this.gk.snake[0]+this.gk.column;
			}else if(row==(this.gk.row)){
				nextPositon=this.gk.snake[0]-this.gk.column*(this.gk.row-1);
			};
		};
		return nextPositon;

	},
	moveSnake:function () {
		this.gk.snake.unshift(this.nextPositon());
		this.gk.snake.pop();
		this.checkImpact();
		this.putSnakeFood();
	},
	changeDirection:function (e) {
		e = e|| window.event;
		if(e.keyCode==37&&this.direction!='right') this.direction = 'left';
		else if(e.keyCode==38&&this.direction!='down') this.direction = 'up';
		else if(e.keyCode==39&&this.direction!='left') this.direction = 'right';
		else if(e.keyCode==40&&this.direction!='up') this.direction = 'down';
	},
	checkImpact:function () {
		var _this=this;
		$.each(this.gk.food,function (index,value) {
			if (_this.gk.snake[0]==value) {
				_this.gk.snake.unshift(_this.nextPositon());
				_this.gk.food[index]=Math.floor(Math.random()*(_this.gk.row*_this.gk.column));
			};
		})
	},
	startGame:function () {
		var _this=this;
		this.interval=setInterval(function () {
			_this.moveSnake();
		},100);
	},
	stopGame:function(){
		clearInterval(this.interval);
	},
	main:function () {
		var _this=this;
		var gk= arguments[0] ? arguments[0] : null;
		if (gk!=null) {
			this.gk=gk;
		};
		this.putSnakeFood();
		$(window).keydown(function (event) {
			_this.changeDirection(event);
			if(event && event.preventDefault) {  
		    　　//阻止默认浏览器动作(W3C)  
		    　　event.preventDefault();  
		    } else {  
		    　　//IE中阻止函数器默认动作的方式   
		    　　window.event.returnValue = false;   
		    }  
		    return false;  
		});		
	}
}