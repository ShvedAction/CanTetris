var Figure, field, game;
var fieldHeight = 30, fieldWidth = 10;
$(document).ready(function(){
    game = new (can.Model.extend({},{
        score: 0,
        gameOver: function(){
            
        }
    }))();
    var ALL_TYPE_FIGURE = [
        [{x:-2 ,y:0},{x:-1 ,y:0},{x:0 ,y:0},{x:1 ,y:0}]   //палка
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
            this.reflectOnField();
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
                if (cell){
                    cell.attr("style_class", "empty");
                }
            });
        },
        rotate: function (rightOrLeft){
            var _this = this;
            var newCells = [];
            var nothingNoOccupied = true;
            can.each(_this.cells, function(val){
                var newVal;
                if (rightOrLeft == "right"){
                    newVal = {x: val.y, y: -val.x};
                }else{
                    newVal = {x: -val.y, y: val.x};
                }
                if (field.getXY(val.x+_this.posx, val.y+_this.posy).state != "empty"){
                    nothingNoOccupied = false;
                }
                newCells.push(newVal);
            });
            if (nothingNoOccupied){
                _this.eraseMeFromField();
                _this.attr("cells", newCells);
                _this.reflectOnField();
            }
        }
    });
    
    //create field
    field = new can.List([]);
    for (var i = 0; i < (fieldHeight*fieldWidth); i++){
        field.attr(i, new can.Model({style_class: "empty", state: "empty"}));
    }
    field.getXY = function(x,y){
        return this.attr(y*fieldWidth + x);
    }
});