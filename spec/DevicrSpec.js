describe("Devicr", function() {

  var devicr, devicr_image, devicr_image_selector = null;

  beforeEach(function () {
    this.devicr_image = {
      replaceSourceWith: function(src) {}
    };
    this.devicr_image_selector = {
      getBestSourceFor: function(devicr_image) {
        return source;
      }
    };
    this.devicr = new Devicr(this.devicr_image_selector);
  });

  it("gets the best source for a image for the current device", function() {
    // Arrange
    spyOn(this.devicr_image_selector, 'getBestSourceFor');

    // Act
    this.devicr.adapt(this.devicr_image);

    // Expect
    expect(this.devicr_image_selector.getBestSourceFor).toHaveBeenCalledWith(this.devicr_image);
  });

  it("replaces current image with the best image for the current device", function() {
    // Arrange
    var devicr_src_image = 'mobile.jpg';
    spyOn(this.devicr_image, 'replaceSourceWith');
    spyOn(this.devicr_image_selector, 'getBestSourceFor').andReturn(devicr_src_image);
    
    // Act
    this.devicr.adapt(this.devicr_image);

    // Expect
    expect(this.devicr_image.replaceSourceWith).toHaveBeenCalledWith(devicr_src_image);
  });

});