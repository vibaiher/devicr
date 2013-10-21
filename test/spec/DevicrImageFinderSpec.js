describe("DevicrImageFinder", function() {

  describe("when is looking for the highest image quality available", function() {

    var image, finder, retina_source, desktop_source, tablet_source, mobile_source = null;

    beforeEach(function() {
      this.image = {
        getAvailableDevices: function() {
          return [];
        },
        getImageFor: function(device) {
          return "source";
        }
      }
      this.device = new DevicrDevice('whatever', {});
      this.finder = new DevicrImageFinder(this.device);
    });

    it("founds first a retina image than desktop, tablet or mobile images", function() {
      // Arrange
      spyOn(this.image, 'getAvailableDevices').andReturn(['retina', 'desktop', 'mobile', 'tablet']);
      spyOn(this.image, 'getImageFor');

      // Act
      this.finder.findHighestAvailableImage(this.image);

      // Expect
      expect(this.image.getAvailableDevices).toHaveBeenCalled();
      expect(this.image.getImageFor).toHaveBeenCalledWith('retina');
    });

    it("founds first a desktop image than tablet or mobile images", function() {
      // Arrange
      spyOn(this.image, 'getAvailableDevices').andReturn(['desktop', 'mobile', 'tablet']);
      spyOn(this.image, 'getImageFor');

      // Act
      this.finder.findHighestAvailableImage(this.image);

      // Expect
      expect(this.image.getAvailableDevices).toHaveBeenCalledWith();
      expect(this.image.getImageFor).toHaveBeenCalledWith('desktop');
    });

    it("founds first a tablet image than a mobile image", function() {
      // Arrange
      spyOn(this.image, 'getAvailableDevices').andReturn(['tablet', 'mobile']);
      spyOn(this.image, 'getImageFor');

      // Act
      this.finder.findHighestAvailableImage(this.image);

      // Expect
      expect(this.image.getAvailableDevices).toHaveBeenCalled();
      expect(this.image.getImageFor).toHaveBeenCalledWith('tablet');
    });

    it("founds mobile image if is not available any other", function() {
      // Arrange
      spyOn(this.image, 'getAvailableDevices').andReturn(['mobile']);
      spyOn(this.image, 'getImageFor');

      // Act
      this.finder.findHighestAvailableImage(this.image);

      // Expect
      expect(this.image.getAvailableDevices).toHaveBeenCalled();
      expect(this.image.getImageFor).toHaveBeenCalledWith('mobile');
    });

    it("returns null if any image is available", function() {
      // Arrange
      spyOn(this.image, 'getAvailableDevices').andReturn([]);
      spyOn(this.image, 'getImageFor');

      // Act
      var source = this.finder.findHighestAvailableImage(this.image);

      // Expect
      expect(this.image.getAvailableDevices).toHaveBeenCalled();
      expect(this.image.getImageFor).not.toHaveBeenCalled();
      expect(source).toEqual(null);
    });

  });

describe("when is looking for the first of the higher image quality available", function() {

    var image, finder, retina_source, desktop_source, tablet_source, mobile_source = null;

    beforeEach(function() {
      this.image = {
        getHigherAvailableDevicesThan: function(device) {
          return [];
        },
        getImageFor: function(device) {
          return "source";
        }
      }
      this.device = new DevicrDevice('whatever', {});
      this.finder = new DevicrImageFinder(this.device);
    });

    it("founds first the superior image of the current device than the higuest image quality available", function() {
      // Arrange
      spyOn(this.image, 'getHigherAvailableDevicesThan').andReturn(['retina', 'desktop', 'tablet']);
      spyOn(this.image, 'getImageFor');

      // Act
      var source = this.finder.findFirstHigherAvailableImage(this.image);

      // Expect
      expect(this.image.getHigherAvailableDevicesThan).toHaveBeenCalledWith(this.device.getDevice());
      expect(this.image.getImageFor).toHaveBeenCalledWith('tablet');
    });

    it("returns null if any higher image is available", function() {
      // Arrange
      spyOn(this.image, 'getHigherAvailableDevicesThan').andReturn([]);
      spyOn(this.image, 'getImageFor');

      // Act
      var source = this.finder.findFirstHigherAvailableImage(this.image);

      // Expect
      expect(this.image.getHigherAvailableDevicesThan).toHaveBeenCalledWith(this.device.getDevice());
      expect(this.image.getImageFor).not.toHaveBeenCalled();
      expect(source).toEqual(null);
    });

  });

});