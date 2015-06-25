describe("figure", function() {
  var targetFigure;
  beforeEach(function() {
    targetFigure = new Figure();
  });

  afterEach(function(){
    
  });
  
  it("should be create on center and top", function() {
    expect(targetFigure.posx).toEqual(5);
    expect(targetFigure.posy).toEqual(30);
  });

  it("in the come-down should be reduce posy", function(){
    targetFigure.come_down();
    expect(targetFigure.posy).toEqual(29);
  });
  
  it("on create should be random", function (){
    //todo may be
  });
  
  it("should be able to rotate", function(){
    expect(targetFigure.rotate).not.toThrow();
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