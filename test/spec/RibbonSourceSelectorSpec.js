describe("RibbonSourceSelector", function() {

  var device, element, source_finder, source_selector = null;

  beforeEach(function() {
    this.element = {
      getSourceFor: function(device) {
        return src;
      }
    };
    this.source_finder = {
      findFirstHigherAvailableSource: function(element, device) {
        return retina_element;
      },
    findHighestAvailableSource: function(element) {
      return retina_element;
    }
    };
  });

  describe("for mobile devices in landscape mode", function() {

    beforeEach(function () {
      var screen_portrait_mode = {
        getHeight: function() {
          return 400;
        },
        getWidth: function() {
          return 600;
        },
        getDevicePixelRatio: function() {
          return 1;
        }
      };
      this.device = new DevicrDevice('mobile', screen_portrait_mode);
      this.source_selector = new RibbonSourceSelector(this.device, this.source_finder);
    });

    it("gets the tablet element", function() {
      // Arrange
      var element_src = 'device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(element_src);

      // Act
      var source = this.source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.element.getSourceFor).toHaveBeenCalledWith('tablet');
      expect(source).toEqual(element_src);
    });

  });

  describe("for tablet devices in landscape mode", function() {

    beforeEach(function () {
      var screen_portrait_mode = {
        getHeight: function() {
          return 400;
        },
        getWidth: function() {
          return 600;
        },
        getDevicePixelRatio: function() {
          return 1;
        }
      };
      this.device = new DevicrDevice('tablet', screen_portrait_mode);
      this.source_selector = new RibbonSourceSelector(this.device, this.source_finder);
    });

    it("gets the retina element", function() {
      // Arrange
      var element_src = 'device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(element_src);

      // Act
      var source = this.source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.element.getSourceFor).toHaveBeenCalledWith('retina');
      expect(source).toEqual(element_src);
    });

  });

  describe("for desktop or retina devices in landscape mode", function() {

    beforeEach(function () {
      var screen_portrait_mode = {
        getHeight: function() {
          return 400;
        },
        getWidth: function() {
          return 600;
        },
        getDevicePixelRatio: function() {
          return 1;
        }
      };
      this.device = new DevicrDevice('whatever', screen_portrait_mode);
      this.source_selector = new RibbonSourceSelector(this.device, this.source_finder);
    });

    it("gets the specific element device if it is available", function() {
      // Arrange
      var element_src = 'device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(element_src);

      // Act
      var source = this.source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.element.getSourceFor).toHaveBeenCalledWith(this.device.getDevice());
      expect(source).toEqual(element_src);
    });

    it("gets the first higher element available if specific element device is undefined", function() {
      // Arrange
      var element_src = 'higher_device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(null);
      spyOn(this.source_finder, 'findFirstHigherAvailableSource').andReturn(element_src);

      // Act
      var source = this.source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.source_finder.findFirstHigherAvailableSource).toHaveBeenCalledWith(this.element);
      expect(source).toEqual(element_src);
    });

    it("gets the highest element available if specific element device and the first higher element are undefined", function() {
      // Arrange
      var element_src = 'tablet_device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(null);
      spyOn(this.source_finder, 'findFirstHigherAvailableSource').andReturn(null);
      spyOn(this.source_finder, 'findHighestAvailableSource').andReturn(element_src);

      // Act
      var source = this.source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.source_finder.findHighestAvailableSource).toHaveBeenCalledWith(this.element);
      expect(source).toEqual(element_src);
    });

  });

  describe("for portrait screen devices", function() {

    beforeEach(function () {
      var screen_portrait_mode = {
        getHeight: function() {
          return 600;
        },
        getWidth: function() {
          return 400;
        },
        getDevicePixelRatio: function() {
          return 1;
        }
      };
      this.device = new DevicrDevice('whatever', screen_portrait_mode);
      this.source_selector = new RibbonSourceSelector(this.device, this.source_finder);
    });

    it("gets the specific element device if it is available", function() {
      // Arrange
      var element_src = 'device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(element_src);

      // Act
      var source = this.source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.element.getSourceFor).toHaveBeenCalledWith(this.device.getDevice());
      expect(source).toEqual(element_src);
    });

    it("gets the first higher element available if specific element device is undefined", function() {
      // Arrange
      var element_src = 'higher_device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(null);
      spyOn(this.source_finder, 'findFirstHigherAvailableSource').andReturn(element_src);

      // Act
      var source = this.source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.source_finder.findFirstHigherAvailableSource).toHaveBeenCalledWith(this.element);
      expect(source).toEqual(element_src);
    });

    it("gets the highest element available if specific element device and the first higher element are undefined", function() {
      // Arrange
      var element_src = 'tablet_device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(null);
      spyOn(this.source_finder, 'findFirstHigherAvailableSource').andReturn(null);
      spyOn(this.source_finder, 'findHighestAvailableSource').andReturn(element_src);

      // Act
      var source = this.source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.source_finder.findHighestAvailableSource).toHaveBeenCalledWith(this.element);
      expect(source).toEqual(element_src);
    });   

  });

});
