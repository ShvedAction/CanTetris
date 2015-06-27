describe("figure", function() {
    var targetFigure;
    beforeEach(function() {
        targetFigure = new Figure();
    });
    
    afterEach(function(){
    
    });
    
    function isReflectOnField(figure){
        can.each(figure.getPosCells(), function(val, index){
            expect(field.getXY(val.x, val.y).state).not.toEqual("empty");
        });
    }
    
    it("should be create on center and top", function() {
        expect(targetFigure.posx).toEqual(5);
        expect(targetFigure.posy).toEqual(29);
        isReflectOnField(targetFigure);
    });
    
    it("in the come-down should be reduce posy", function(){
        targetFigure.come_down();
        expect(targetFigure.posy).toEqual(28);
        isReflectOnField(targetFigure);
    });
    
    it("on create should be random", function (){
        //todo may be
    });
    
    it("should be able to rotate", function(){
        expect(function (){targetFigure.rotate("left");}).not.toThrow();
        isReflectOnField(targetFigure);
    });
    
    it("should be able to return the occupied cells, by method: getPosCells", function(){
        var i = 0;
        can.each(targetFigure.getPosCells(),function(posCell, index){
            expect(posCell.x).toEqual(targetFigure.cells[index].x + targetFigure.posx);
            expect(posCell.y).toEqual(targetFigure.cells[index].y + targetFigure.posy);
        });
    });
    
    describe("should be reflect on field", function(){
        it("when creating the figure cells underneath the field must be filled", function(){
            targetFigure = new Figure();
            isReflectOnField(targetFigure);
        });
    });
});

describe("field", function(){
    it("should be the double array 5x30 collapsed to the list: length == 300", function(){
        expect(field.attr("length")).toEqual(300);
    });
    
    it("should be able to getXY",function(){
        expect(function(){return field.getXY(3,12);}).not.toThrow();
        expect(field.attr(32)).toBe(field.getXY(2,3));
    });
 });