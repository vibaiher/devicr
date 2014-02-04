describe("DevicrElement", function() {

  var element, devicr_element = null;

  beforeEach(function() {
    this.element = new Image();
    this.element.setAttribute('src', 'any-src.jpg');
    this.devicr_element = new DevicrElement(this.element);
  });

  var prepareImageAttributes = function(image, expected_devices) {
    var device = null;
    for (device in expected_devices) {
      image.setAttribute(expected_devices[device], expected_devices[device] + '.jpg');
    }
  };

  it("initially unsets current source image", function() {
    // Arrange

    // Act

    // Assert
    expect(this.devicr_element.sourceLoaded()).toBeNull();
  });

  it("get specific device source if it is available", function() {
    // Arrange
    var device = 'my_device';
    var device_source = 'patata.jpg';
    this.element.setAttribute(device, device_source);

    // Act
    var source = this.devicr_element.getSourceFor(device);

    // Assert
    expect(source).toEqual(device_source);
  });

  it("replaces current image source for new image source", function() {
    // Arrange
    var new_image_source = "patata-2.jpeg";

    // Act
    this.devicr_element.replaceSourceLoadedBy(new_image_source);
    
    // Assert
    expect(this.devicr_element.sourceLoaded()).toEqual(new_image_source);
  });

  describe("when look for available devices", function() {

    it("gets all devices ordered by device priority if all devices have an image assigned", function() {
      // Arrange
      var device = null;
      var expected_devices = ['retina', 'desktop', 'tablet', 'mobile'];
      prepareImageAttributes(this.element, expected_devices);

      // Act
      var devices = this.devicr_element.getAvailableDevices();

      // Assert
      expect(devices).toEqual(expected_devices);
    });

    describe("gets only available devices ordered by device priority", function() {

      it("if any device is not present", function() {
        // Arrange
        var device = null;
        var expected_devices = ['retina', 'tablet', 'mobile'];
        prepareImageAttributes(this.element, expected_devices);

        // Act
        var devices = this.devicr_element.getAvailableDevices();

        // Assert
        expect(devices).toEqual(expected_devices);
      });

      it("if all devices are present but any have not an image assigned", function() {
        // Arrange
        var device = null;
        var expected_devices = ['retina', 'desktop', 'tablet', 'mobile'];
        prepareImageAttributes(this.element, expected_devices);
        var deleted_device = expected_devices.pop();
        this.element.setAttribute(deleted_device, '');

        // Act
        var devices = this.devicr_element.getAvailableDevices();

        // Assert
        expect(devices).toEqual(expected_devices);
      });

    });

    it("returns an empty array if gets only the available devices ordered by device priority if any device is not present in the image", function() {
      // Arrange
      var expected_devices = [];

      // Act
      var devices = this.devicr_element.getAvailableDevices();

      // Assert
      expect(devices).toEqual(expected_devices);
    });

  });

  describe("when look for the first higher device available for the current device", function() {

    it("gets all superior devices availables", function() {
      // Arrange
      var device = null;
      var expected_devices = ['retina', 'desktop', 'tablet'];
      prepareImageAttributes(this.element, ['retina', 'desktop', 'tablet', 'mobile']);

      // Act
      var higher_devices = this.devicr_element.getHigherAvailableDevicesThan('mobile');

      // Assert
      expect(higher_devices).toEqual(expected_devices);
    });

    it("returns an empty array if not exists ane higher device with image", function() {
      // Arrange

      // Act
      var higher_devices = this.devicr_element.getHigherAvailableDevicesThan('mobile');

      // Assert
      expect(higher_devices).toEqual([]);
    });

  });

});
