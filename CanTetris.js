var Figure, field;
var fieldHeight = 30, fieldWidth = 10;
$(document).ready(function(){
  var ALL_TYPE_FIGURE = [
      [{x:-2 ,y:0},{x:-1 ,y:0},{x:0 ,y:0},{x:1 ,y:0}]   //палка
    ];
    
  Figure = can.Model.extend({},{
    posx: 5,
    posy: 30,
    init: function(){
      var randIndex = Math.floor(Math.random() * (ALL_TYPE_FIGURE.length - 1));
      this.attr('cells', ALL_TYPE_FIGURE[randIndex]);
    },
    come_down: function(){
      this.posy--;
    },
    rotate: function(){ return 0;}
  });
  
  //create field
  field = new can.List([]);
  for (var i = 0; i < (fieldHeight*fieldWidth); i++){
    field.attr(i, new can.Model({state: "empty"}));
  }
  field.getXY = function(x,y){
    return this.attr(y*fieldWidth + x);
  }
});