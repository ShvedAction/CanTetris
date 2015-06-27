var Figure, field;
var fieldHeight = 30, fieldWidth = 10;
$(document).ready(function(){
    var ALL_TYPE_FIGURE = [
        [{x:-2 ,y:0},{x:-1 ,y:0},{x:0 ,y:0},{x:1 ,y:0}]   //�����
    ];
    
    Figure = can.Model.extend({},{
        posx: 5,
        posy: 29,
        init: function(){
            var randIndex = Math.floor(Math.random() * (ALL_TYPE_FIGURE.length - 1));
            this.attr('cells', ALL_TYPE_FIGURE[randIndex]);
            this.reflectOnField();
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
            can.each(_this.getPosCells(), function(val){
                field.getXY(val.x, val.y).attr("state", "red");
            });
        },
        eraseMeFromField: function(){
            var _this = this;
            can.each(_this.getPosCells(), function(val){
                field.getXY(val.x, val.y).attr("state", "empty");
            });
        },
        rotate: function (rightOrLeft){
            var _this = this;
            var newCells = [];
            var nothingNoOccupied = true;
            can.each(this.cells, function(val){
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
                this.eraseMeFromField();
                this.attr("cells", newCells);
                this.reflectOnField();
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