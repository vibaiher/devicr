describe("Backgroundr", function() {

  var backgroundr, devicr_element, devicr_source_selector = null;

  beforeEach(function () {
    this.devicr_element = {
      replaceBackgroundImageBy: function(src) {
        return undefined;
      }
    };
    this.devicr_source_selector = {
      getBestSourceFor: function(devicr_element) {
        return source;
      }
    };
    this.backgroundr = new Backgroundr(this.devicr_source_selector);
  });

  it("gets the best image source for a element to the current device", function() {
    // Arrange
    spyOn(this.devicr_source_selector, 'getBestSourceFor');

    // Act
    this.backgroundr.adapt(this.devicr_element);

    // Expect
    expect(this.devicr_source_selector.getBestSourceFor).toHaveBeenCalledWith(this.devicr_element);
  });

  it("replaces current image with the best image for the current device", function() {
    // Arrange
    var devicr_src_image = 'mobile.jpg';
    spyOn(this.devicr_element, 'replaceBackgroundImageBy');
    spyOn(this.devicr_source_selector, 'getBestSourceFor').andReturn(devicr_src_image);
    
    // Act
    this.backgroundr.adapt(this.devicr_element);

    // Expect
    expect(this.devicr_element.replaceBackgroundImageBy).toHaveBeenCalledWith(devicr_src_image);
  });

});
