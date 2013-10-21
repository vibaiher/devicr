describe("DevicrImageSelector", function() {

  var device, image, image_finder, image_selector = null;

  beforeEach(function() {
    this.image = {
      getImageFor: function(device) {
        return src;
      }
    };
    this.image_finder = {
      findFirstHigherAvailableImage: function(image, device) {
        return retina_image;
      },
      findHighestAvailableImage: function(image) {
        return retina_image;
      }
    };
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
      this.image_selector = new DevicrImageSelector(this.device, this.image_finder);
    });

    it("gets the specific image device if it is available", function() {
      // Arrange
      var image_src = 'device.jpg';
      spyOn(this.image, 'getImageFor').andReturn(image_src);

      // Act
      var source = this.image_selector.getBestSourceFor(this.image);

      // Expect
      expect(this.image.getImageFor).toHaveBeenCalledWith(this.device.getDevice());
      expect(source).toEqual(image_src);
    });

    it("gets the first higher image available if specific image device is undefined", function() {
      // Arrange
      var image_src = 'higher_device.jpg';
      spyOn(this.image, 'getImageFor').andReturn(null);
      spyOn(this.image_finder, 'findFirstHigherAvailableImage').andReturn(image_src);

      // Act
      var source = this.image_selector.getBestSourceFor(this.image);

      // Expect
      expect(this.image_finder.findFirstHigherAvailableImage).toHaveBeenCalledWith(this.image);
      expect(source).toEqual(image_src);
    });

    it("gets the highest image available if specific image device and the first higher image are undefined", function() {
      // Arrange
      var image_src = 'tablet_device.jpg';
      spyOn(this.image, 'getImageFor').andReturn(null);
      spyOn(this.image_finder, 'findFirstHigherAvailableImage').andReturn(null);
      spyOn(this.image_finder, 'findHighestAvailableImage').andReturn(image_src);

      // Act
      var source = this.image_selector.getBestSourceFor(this.image);

      // Expect
      expect(this.image_finder.findHighestAvailableImage).toHaveBeenCalledWith(this.image);
      expect(source).toEqual(image_src);
    });

  });

  describe("for landscape screen devices", function() {

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
        this.image_selector = new DevicrImageSelector(this.device, this.image_finder);
      });

      it("gets the highest image available", function() {
        // Arrange
        var image_src = 'tablet_device.jpg';
        spyOn(this.image_finder, 'findHighestAvailableImage').andReturn(image_src);

        // Act
        var source = this.image_selector.getBestSourceFor(this.image);

        // Expect
        expect(this.image_finder.findHighestAvailableImage).toHaveBeenCalledWith(this.image);
        expect(source).toEqual(image_src);
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
        this.image_selector = new DevicrImageSelector(this.device, this.image_finder);
      });
      
      it("gets desktop image", function() {
        // Arrange
        var image_src = 'desktop_device.jpg';
        spyOn(this.image, 'getImageFor').andReturn(image_src);

        // Act
        var source = this.image_selector.getBestSourceFor(this.image);

        // Expect
        expect(this.image.getImageFor).toHaveBeenCalledWith('desktop');
        expect(source).toEqual(image_src);
      });

      it("gets the highest image available if desktop image is undefined", function() {
        // Arrange
        var image_src = 'tablet_device.jpg';
        spyOn(this.image, 'getImageFor').andReturn(null);
        spyOn(this.image_finder, 'findHighestAvailableImage').andReturn(image_src);

        // Act
        var source = this.image_selector.getBestSourceFor(this.image);

        // Expect
        expect(this.image_finder.findHighestAvailableImage).toHaveBeenCalledWith(this.image);
        expect(source).toEqual(image_src);
      });

    });

  });

});