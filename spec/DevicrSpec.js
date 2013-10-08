describe("Devicr", function() {

  describe("for mobile devices", function() {
    var screen_device, devicr, devicr_image = null;

    beforeEach(function() {
      this.devicr_image = {
        replaceImageLoadedBy: function(src) {
        },
        mobile: function() {
          return 'mobile.jpg';
        },
        desktop: function() {
          return 'desktop.jpg';
        }
      }
      spyOn(this.devicr_image, 'mobile').andCallThrough();
      spyOn(this.devicr_image, 'desktop').andCallThrough();
      spyOn(this.devicr_image, 'replaceImageLoadedBy');
    });

    it("in portrait mode renders mobile image", function() {
      var device = new DevicrDevice('mobile', screenPortraitMode());
      devicr = new Devicr(device);

      devicr.loadImage(this.devicr_image);

      expect(this.devicr_image.mobile).toHaveBeenCalled();
      expect(this.devicr_image.replaceImageLoadedBy).toHaveBeenCalledWith('mobile.jpg');
    });

    it("in landscape mode renders desktop image", function() {
      var device = new DevicrDevice('mobile', screenLandscapeMode());
      devicr = new Devicr(device);

      devicr.loadImage(this.devicr_image);

      expect(this.devicr_image.desktop).toHaveBeenCalled();
      expect(this.devicr_image.replaceImageLoadedBy).toHaveBeenCalledWith('desktop.jpg');
    });

  });

  describe("for tablet devices", function() {
    var screen_device, devicr, devicr_image = null;

    beforeEach(function() {
      this.devicr_image = {
        replaceImageLoadedBy: function(src) {
        },
        tablet: function() {
          return 'tablet.jpg';
        },
        desktop: function() {
          return 'desktop.jpg';
        }
      }
      spyOn(this.devicr_image, 'tablet').andCallThrough();
      spyOn(this.devicr_image, 'desktop').andCallThrough();
      spyOn(this.devicr_image, 'replaceImageLoadedBy');
    });

    it("in portrait mode renders tablet image", function() {
      var device = new DevicrDevice('tablet', screenPortraitMode());
      devicr = new Devicr(device);

      devicr.loadImage(this.devicr_image);

      expect(this.devicr_image.tablet).toHaveBeenCalled();
      expect(this.devicr_image.replaceImageLoadedBy).toHaveBeenCalledWith('tablet.jpg');
    });

    it("in landscape mode renders desktop image", function() {
      var device = new DevicrDevice('tablet', screenLandscapeMode());
      devicr = new Devicr(device);

      devicr.loadImage(this.devicr_image);

      expect(this.devicr_image.desktop).toHaveBeenCalled();
      expect(this.devicr_image.replaceImageLoadedBy).toHaveBeenCalledWith('desktop.jpg');
    });

  });

  describe("for desktop devices", function() {
    var screen_device, devicr, devicr_image = null;

    beforeEach(function() {
      this.devicr_image = {
        replaceImageLoadedBy: function(src) {
        },
        desktop: function() {
          return 'desktop.jpg';
        },
        retina: function() {
          return 'retina.jpg';
        },
      }
      spyOn(this.devicr_image, 'desktop').andCallThrough();
      spyOn(this.devicr_image, 'retina').andCallThrough();
      spyOn(this.devicr_image, 'replaceImageLoadedBy');
    });

    it("in normal ratio renders desktop image", function() {
      var device = new DevicrDevice('desktop', screenLandscapeMode());
      devicr = new Devicr(device);

      devicr.loadImage(this.devicr_image);

      expect(this.devicr_image.desktop).toHaveBeenCalled();
      expect(this.devicr_image.replaceImageLoadedBy).toHaveBeenCalledWith('desktop.jpg');
    });

    it("in retina ratio renders retina desktop image", function() {
      var device = new DevicrDevice('desktop', screenLandscapeModeWithRetinaRatio());
      devicr = new Devicr(device);

      devicr.loadImage(this.devicr_image);

      expect(this.devicr_image.retina).toHaveBeenCalled();
      expect(this.devicr_image.replaceImageLoadedBy).toHaveBeenCalledWith('retina.jpg');
    });

  });

  screenPortraitMode = function() {
    return { getHeight: function() { return 600; }, getWidth: function() { return 400; }, getDevicePixelRatio: function() { return 1; } };
  }

  screenLandscapeMode = function() {
    return { getHeight: function() { return 400; }, getWidth: function() { return 600; }, getDevicePixelRatio: function() { return 1; } };
  }

  screenLandscapeModeWithRetinaRatio = function() {
    return { getHeight: function() { return 400; }, getWidth: function() { return 600; }, getDevicePixelRatio: function() { return 2; } };
  }

});