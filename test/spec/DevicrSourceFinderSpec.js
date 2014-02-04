describe("DevicrSourceFinder", function() {

  describe("when is looking for the highest element quality available", function() {

    var element, finder, retina_source, desktop_source, tablet_source, mobile_source = null;

    beforeEach(function() {
      this.element = {
        getAvailableDevices: function() {
          return [];
        },
        getSourceFor: function(device) {
          return "source";
        }
      };
      this.device = new DevicrDevice('whatever', {});
      this.finder = new DevicrSourceFinder(this.device);
    });

    it("founds first a retina element than desktop, tablet or mobile elements", function() {
      // Arrange
      spyOn(this.element, 'getAvailableDevices').andReturn(['retina', 'desktop', 'mobile', 'tablet']);
      spyOn(this.element, 'getSourceFor');

      // Act
      this.finder.findHighestAvailableImage(this.element);

      // Expect
      expect(this.element.getAvailableDevices).toHaveBeenCalled();
      expect(this.element.getSourceFor).toHaveBeenCalledWith('retina');
    });

    it("founds first a desktop element than tablet or mobile elements", function() {
      // Arrange
      spyOn(this.element, 'getAvailableDevices').andReturn(['desktop', 'mobile', 'tablet']);
      spyOn(this.element, 'getSourceFor');

      // Act
      this.finder.findHighestAvailableImage(this.element);

      // Expect
      expect(this.element.getAvailableDevices).toHaveBeenCalledWith();
      expect(this.element.getSourceFor).toHaveBeenCalledWith('desktop');
    });

    it("founds first a tablet element than a mobile element", function() {
      // Arrange
      spyOn(this.element, 'getAvailableDevices').andReturn(['tablet', 'mobile']);
      spyOn(this.element, 'getSourceFor');

      // Act
      this.finder.findHighestAvailableImage(this.element);

      // Expect
      expect(this.element.getAvailableDevices).toHaveBeenCalled();
      expect(this.element.getSourceFor).toHaveBeenCalledWith('tablet');
    });

    it("founds mobile element if is not available any other", function() {
      // Arrange
      spyOn(this.element, 'getAvailableDevices').andReturn(['mobile']);
      spyOn(this.element, 'getSourceFor');

      // Act
      this.finder.findHighestAvailableImage(this.element);

      // Expect
      expect(this.element.getAvailableDevices).toHaveBeenCalled();
      expect(this.element.getSourceFor).toHaveBeenCalledWith('mobile');
    });

    it("returns null if any element is available", function() {
      // Arrange
      spyOn(this.element, 'getAvailableDevices').andReturn([]);
      spyOn(this.element, 'getSourceFor');

      // Act
      var source = this.finder.findHighestAvailableImage(this.element);

      // Expect
      expect(this.element.getAvailableDevices).toHaveBeenCalled();
      expect(this.element.getSourceFor).not.toHaveBeenCalled();
      expect(source).toEqual(null);
    });

  });

describe("when is looking for the first of the higher element quality available", function() {

    var element, finder, retina_source, desktop_source, tablet_source, mobile_source = null;

    beforeEach(function() {
      this.element = {
        getHigherAvailableDevicesThan: function(device) {
          return [];
        },
        getSourceFor: function(device) {
          return "source";
        }
      };
      this.device = new DevicrDevice('whatever', {});
      this.finder = new DevicrSourceFinder(this.device);
    });

    it("founds first the superior element of the current device than the higuest element quality available", function() {
      // Arrange
      spyOn(this.element, 'getHigherAvailableDevicesThan').andReturn(['retina', 'desktop', 'tablet']);
      spyOn(this.element, 'getSourceFor');

      // Act
      var source = this.finder.findFirstHigherAvailableImage(this.element);

      // Expect
      expect(this.element.getHigherAvailableDevicesThan).toHaveBeenCalledWith(this.device.getDevice());
      expect(this.element.getSourceFor).toHaveBeenCalledWith('tablet');
    });

    it("returns null if any higher element is available", function() {
      // Arrange
      spyOn(this.element, 'getHigherAvailableDevicesThan').andReturn([]);
      spyOn(this.element, 'getSourceFor');

      // Act
      var source = this.finder.findFirstHigherAvailableImage(this.element);

      // Expect
      expect(this.element.getHigherAvailableDevicesThan).toHaveBeenCalledWith(this.device.getDevice());
      expect(this.element.getSourceFor).not.toHaveBeenCalled();
      expect(source).toEqual(null);
    });

  });

});
