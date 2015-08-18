var Figure, field, game, figure, ALL_TYPE_FIGURE;
var fieldHeight = 30, fieldWidth = 10;
$(document).ready(function(){
    game = new (can.Model.extend({},{
        score: 0,
        gameOver: function(){
            
        },
		start: function(){
			figure = new Figure({});
			figure.come_down();
			this.intervalId = setInterval(function(){
				figure.come_down();
			}, 1000);
		},
		stop: function (){
			clearInterval(this.intervalId);
		}
    }))();
    ALL_TYPE_FIGURE = [
        [{x:-2 ,y:0},{x:-1 ,y:0},{x:0 ,y:0},{x:1 ,y:0}]   //РїР°Р»РєР°
    ];
    
    Figure = can.Model.extend({},{
        posx: 5,
        posy: 29,
        init: function(){
            var randIndex = Math.floor(Math.random() * (ALL_TYPE_FIGURE.length - 1));
            this.attr('cells', ALL_TYPE_FIGURE[randIndex]);
            if(!this.reflectOnField()){
                game.gameOver();
            }
        },
        come_down: function(){
            this.eraseMeFromField();
            this.attr("posy", this.posy-1);
            if(!this.reflectOnField()){
                this.eraseMeFromField();
                this.attr("posy", this.posy+1);
                this.reflectOnField();
                can.each(this.getPosCells(), function(val){
                    var fillCell = field.getXY(val.x, val.y);
                    fillCell.attr("state", val.style_classs)
                });
                figure = new Figure({});
            }
        },
        moveHorizontal: function(deltX){
            this.eraseMeFromField();
            this.attr("posx", this.posx+deltX);
            if(!this.reflectOnField()){
                this.moveHorizontal(-deltX);
            }
        },
        getPosCells: function(){
            var result = [], _this = this;
            this.cells.each(function(cell){
                result.push({x: cell.x + _this.posx, y: cell.y + _this.posy});
            });
            return result;
        },
        reflectOnField: function (){
            var _this = this;
            var allCellIsFree = true;
            can.each(_this.getPosCells(), function(val){
                var cell = field.getXY(val.x, val.y);
                if (cell){
                    if (cell.state != "empty"){
                        allCellIsFree = false;
                    }
                    cell.attr("style_class", "red");
                }
            });
            return allCellIsFree;
        },
        eraseMeFromField: function(){
            var _this = this;
            can.each(_this.getPosCells(), function(val){                
                var cell = field.getXY(val.x, val.y);
                if (cell && cell.state === "empty"){
                    cell.attr("style_class", "empty");
                }
            });
        },
        rotate: function (rightOrLeft){  //1 - right;   -1 - left
            var _this = this;
            var newCells = [];
            var nothingNoOccupied = true;
            can.each(_this.cells, function(val){
                var newVal;
                newVal = {x: rightOrLeft*val.y, y: -rightOrLeft*val.x};
                var x = newVal.x+_this.posx;
                var y = newVal.y+_this.posy;
                var cellOnField = field.getXY(x, y);
                if (cellOnField && cellOnField.state != "empty"){
                    nothingNoOccupied = false;
                }
                newCells.push(newVal);
            });
            if (nothingNoOccupied){
                _this.eraseMeFromField();
                _this.attr("cells", newCells);
                if(!_this.reflectOnField()){
                    _this.rotate(-rightOrLeft);
                }
            }
        }
    });
    
    //create field
    field = new can.List([]);
    for (var i = 0; i < (fieldHeight*fieldWidth); i++){
        field.attr(i, new can.Model({style_class: "empty", state: "empty"}));
    }
    field.getXY = function(x,y){
        if((x <= 0) || (x > fieldWidth) || (y < 0)){
            return {state: "not field", attr: function(){}}
        }
        return this.attr(fieldHeight*fieldWidth - (y*fieldWidth + x));
    }
    
    $("#field").html(can.view('templateOfField', field));
    game.start();
    var onceClickOnceEvent = true; 
    $(document).delegate("*","keydown", function(key){
        //console.log(key.keyCode);
        onceClickOnceEvent = !onceClickOnceEvent; //Дважды вызывается зараза.
        if(onceClickOnceEvent){
            return false;
        }
        if (key.keyCode == 39){
            figure.moveHorizontal(-1);
        }
        if (key.keyCode == 37){
            figure.moveHorizontal(1);
        }
        if (key.keyCode == 38){
            figure.rotate(1);
        }
        if (key.keyCode == 40){
            figure.come_down();
        }
        
    });
});
