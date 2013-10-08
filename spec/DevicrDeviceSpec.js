describe("DevicrDevice", function() {

  describe("gets screen height", function() {

    var screen_device, devicr = null;

    beforeEach(function() {
      screen_device = {
        getHeight: function() {
          return 2;
        },
        getWidth: function() {
          return 3;
        },
      }

      spyOn(screen_device, 'getHeight');
      spyOn(screen_device, 'getWidth');
    });

    it("to calculate if screen is in landscape mode", function() {
      devicr = new DevicrDevice('mobile', screen_device);

      devicr.isLandscape();

      expect(screen_device.getHeight).toHaveBeenCalled();
    });

    it("to calculate if screen is in portrait mode", function() {
      devicr = new DevicrDevice('mobile', screen_device);

      devicr.isPortrait();
      
      expect(screen_device.getHeight).toHaveBeenCalled();
    });

  });

  describe("gets screen width", function() {

    var screen_device, devicr = null;

    beforeEach(function() {
      screen_device = {
        getHeight: function() {
          return 2;
        },
        getWidth: function() {
          return 3;
        },
      }

      spyOn(screen_device, 'getHeight');
      spyOn(screen_device, 'getWidth');
    });

    it("to calculate if screen is in landscape mode", function() {
      devicr = new DevicrDevice('mobile', screen_device);

      devicr.isLandscape();

      expect(screen_device.getWidth).toHaveBeenCalled();
    });

    it("to calculate if screen is in portrait mode", function() {
      devicr = new DevicrDevice('mobile', screen_device);

      devicr.isPortrait();
      
      expect(screen_device.getWidth).toHaveBeenCalled();
    });
    
  });

  describe("describe a landscape display mode as", function() {
    var screen_device, devicr = null;

    it("a device that the width is greater than the height", function() {
      screen_device = {
        getHeight: function() {
          return 2;
        },
        getWidth: function() {
          return 3;
        },
      }

      devicr = new DevicrDevice('mobile', screen_device);
      
      expect(devicr.isLandscape()).toBeTruthy();
    });

  });

  describe("describe a portrait display mode as", function() {
    var screen_device, devicr = null;

    it("a device that the width is equal to the height", function() {
      screen_device = {
        getHeight: function() {
          return 2;
        },
        getWidth: function() {
          return 1;
        },
      }

      devicr = new DevicrDevice('mobile', screen_device);
      
      expect(devicr.isPortrait()).toBeTruthy();
    });

    it("a device that the width is equal to the height", function() {
      screen_device = {
        getHeight: function() {
          return 2;
        },
        getWidth: function() {
          return 2;
        },
      }

      devicr = new DevicrDevice('mobile', screen_device);
      
      expect(devicr.isPortrait()).toBeTruthy();
    });

  });

  describe("describe a landscape display mode as", function() {
    var screen_device, devicr = null;

    it("a device that the width is greater than the height", function() {
      screen_device = {
        getHeight: function() {
          return 2;
        },
        getWidth: function() {
          return 3;
        },
      }

      devicr = new DevicrDevice('mobile', screen_device);
      
      expect(devicr.isLandscape()).toBeTruthy();
    });

  });

});