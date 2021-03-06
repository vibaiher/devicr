describe("StreamrSourceSelector", function() {

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

  describe("for tablets in portrait mode with screens greater than 750px (width)", function() {

    describe("wich accepts retina", function() {
      
      beforeEach(function () {
        var screen_portrait_mode = {
          getHeight: function() {
            return 2048;
          },
          getWidth: function() {
            return 1536;
          },
          getDevicePixelRatio: function() {
            return 2;
          }
        };
        this.device = new DevicrDevice('tablet', screen_portrait_mode);
        this.source_selector = new StreamrSourceSelector(this.device, this.source_finder);
      });

      it("gets the highest element available", function() {
        // Arrange
        var element_src = 'retina_device.jpg';
        spyOn(this.source_finder, 'findHighestAvailableSource').andReturn(element_src);

        // Act
        var source = this.source_selector.getBestSourceFor(this.element);

        // Expect
        expect(this.source_finder.findHighestAvailableSource).toHaveBeenCalledWith(this.element);
        expect(source).toEqual(element_src);
      });

    });

    describe("wich not accepts retina", function() {
      
      beforeEach(function () {
        var screen_portrait_mode = {
          getHeight: function() {
            return 2048;
          },
          getWidth: function() {
            return 1536;
          },
          getDevicePixelRatio: function() {
            return 1;
          }
        };
        this.device = new DevicrDevice('tablet', screen_portrait_mode);
        this.source_selector = new StreamrSourceSelector(this.device, this.source_finder);
      });

      it("gets the first higher element available", function() {
        // Arrange
        var element_src = 'higher_device.jpg';
        spyOn(this.source_finder, 'findFirstHigherAvailableSource').andReturn(element_src);

        // Act
        var source = this.source_selector.getBestSourceFor(this.element);

        // Expect
        expect(this.source_finder.findFirstHigherAvailableSource).toHaveBeenCalledWith(this.element);
        expect(source).toEqual(element_src);
      });

      it("gets the highest element available if the first higher element is undefined", function() {
        // Arrange
        var element_src = 'tablet_device.jpg';
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
      this.source_selector = new StreamrSourceSelector(this.device, this.source_finder);
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

  describe("for landscape screen devices that are mobile devices", function() {

    it("gets mobile element", function() {
      // Arrange
      var device = new DevicrDevice('mobile', {});
      var source_selector = new StreamrSourceSelector(device, this.source_finder);
      var element_src = 'mobile_device.jpg';
      spyOn(this.element, 'getSourceFor').andReturn(element_src);

      // Act
      var source = source_selector.getBestSourceFor(this.element);

      // Expect
      expect(this.element.getSourceFor).toHaveBeenCalledWith('mobile');
      expect(source).toEqual(element_src);
    });

  });

  describe("for landscape screen devices that aren't mobile devices", function() {

    describe("which accepts retina ratio", function() {

      beforeEach(function () {
        var screen_landscape_mode_with_retina_ratio = {
          getHeight: function() {
            return 400;
          },
          getWidth: function() {
            return 600;
          },
          getDevicePixelRatio: function() {
            return 2;
          }
        };
        this.device = new DevicrDevice('whatever', screen_landscape_mode_with_retina_ratio);
        this.source_selector = new StreamrSourceSelector(this.device, this.source_finder);
      });

      it("gets the highest element available", function() {
        // Arrange
        var element_src = 'tablet_device.jpg';
        spyOn(this.source_finder, 'findHighestAvailableSource').andReturn(element_src);

        // Act
        var source = this.source_selector.getBestSourceFor(this.element);

        // Expect
        expect(this.source_finder.findHighestAvailableSource).toHaveBeenCalledWith(this.element);
        expect(source).toEqual(element_src);
      });

    });

    describe("which does not accept retina ratio", function() {

      beforeEach(function () {
        var screen_landscape_mode = {
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
        this.device = new DevicrDevice('whatever', screen_landscape_mode);
        this.source_selector = new StreamrSourceSelector(this.device, this.source_finder);
      });
      
      it("gets desktop element", function() {
        // Arrange
        var element_src = 'desktop_device.jpg';
        spyOn(this.element, 'getSourceFor').andReturn(element_src);

        // Act
        var source = this.source_selector.getBestSourceFor(this.element);

        // Expect
        expect(this.element.getSourceFor).toHaveBeenCalledWith('desktop');
        expect(source).toEqual(element_src);
      });

      it("gets the highest element available if desktop element is undefined", function() {
        // Arrange
        var element_src = 'tablet_device.jpg';
        spyOn(this.element, 'getSourceFor').andReturn(null);
        spyOn(this.source_finder, 'findHighestAvailableSource').andReturn(element_src);

        // Act
        var source = this.source_selector.getBestSourceFor(this.element);

        // Expect
        expect(this.source_finder.findHighestAvailableSource).toHaveBeenCalledWith(this.element);
        expect(source).toEqual(element_src);
      });

    });

  });

});
