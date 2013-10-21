function DevicrImage(image) {
  this.devices = ['retina', 'desktop', 'tablet', 'mobile'];
  this.image = image;
  this.image.removeAttribute('src');

  this.getHigherDevices = function(device) {
    var device_index = this.devices.indexOf(device), higher_devices = [];
    if (device_index > 0) {
      for (var i = 0; i < device_index; i++) {
        higher_devices[i] = this.devices[i];
      }
    }
    return higher_devices;
  };
}

DevicrImage.prototype.imageLoaded = function() {
  return this.image.getAttribute('src');
};

DevicrImage.prototype.getImageFor = function(device) {
  return this.image.getAttribute(device);
};

DevicrImage.prototype.replaceImageLoadedBy = function(image_path) {
  this.image.setAttribute('src', image_path);
};

DevicrImage.prototype.getAvailableDevices = function() {
  var devices = this.devices, available_devices = [], source = null;
  for (var device in devices) {
    source = this.getImageFor(devices[device]);
    if (source !== null && source !== '') {
      available_devices.push(devices[device]);
    }
  }
  return available_devices;
};

DevicrImage.prototype.getHigherAvailableDevicesThan = function(device) {
  var higher_devices = this.getHigherDevices(device);
  if (higher_devices.length > 0) {
    var available_devices = this.getAvailableDevices();
    return ArrayIntersect.intersect(higher_devices, available_devices);
  }
  return [];
};