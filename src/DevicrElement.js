function DevicrElement(element) {
  this.devices = ['retina', 'desktop', 'tablet', 'mobile'];
  this.element = element;
  this.element.removeAttribute('src');

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

DevicrElement.prototype.imageLoaded = function() {
  return this.element.getAttribute('src');
};

DevicrElement.prototype.getImageFor = function(device) {
  return this.element.getAttribute(device);
};

DevicrElement.prototype.replaceImageLoadedBy = function(image_path) {
  this.element.setAttribute('src', image_path);
};

DevicrElement.prototype.getAvailableDevices = function() {
  var devices = this.devices, available_devices = [], source = null;
  for (var device in devices) {
    source = this.getImageFor(devices[device]);
    if (source !== null && source !== '') {
      available_devices.push(devices[device]);
    }
  }
  return available_devices;
};

DevicrElement.prototype.getHigherAvailableDevicesThan = function(device) {
  var higher_devices = this.getHigherDevices(device);
  if (higher_devices.length > 0) {
    var available_devices = this.getAvailableDevices();
    return ArrayIntersect.intersect(higher_devices, available_devices);
  }
  return [];
};
