describe("Devicr", function() {

  var devicr, devicr_element, devicr_source_selector = null;

  beforeEach(function () {
    this.devicr_element = {
      replaceSourceLoadedBy: function(src) {
        return undefined;
      }
    };
    this.devicr_source_selector = {
      getBestSourceFor: function(devicr_element) {
        return source;
      }
    };
    this.devicr = new Devicr(this.devicr_source_selector);
  });

  it("gets the best source for a image for the current device", function() {
    // Arrange
    spyOn(this.devicr_source_selector, 'getBestSourceFor');

    // Act
    this.devicr.adapt(this.devicr_element);

    // Expect
    expect(this.devicr_source_selector.getBestSourceFor).toHaveBeenCalledWith(this.devicr_element);
  });

  it("replaces current image with the best image for the current device", function() {
    // Arrange
    var devicr_src_image = 'mobile.jpg';
    spyOn(this.devicr_element, 'replaceSourceLoadedBy');
    spyOn(this.devicr_source_selector, 'getBestSourceFor').andReturn(devicr_src_image);
    
    // Act
    this.devicr.adapt(this.devicr_element);

    // Expect
    expect(this.devicr_element.replaceSourceLoadedBy).toHaveBeenCalledWith(devicr_src_image);
  });

});