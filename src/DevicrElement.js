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

DevicrElement.prototype.sourceLoaded = function() {
  return this.element.getAttribute('src');
};

DevicrElement.prototype.backgroundSourceLoaded = function() {
  return this.element.style.backgroundImage;
};

DevicrElement.prototype.getSourceFor = function(device) {
  return this.element.getAttribute(device);
};

DevicrElement.prototype.replaceSourceLoadedBy = function(source) {
  this.element.setAttribute('src', source);
};

DevicrElement.prototype.replaceBackgroundSourceBy = function(source) {
  this.element.setAttribute('style', 'background-image: url(' + source + ');');
};

DevicrElement.prototype.getAvailableDevices = function() {
  var devices = this.devices, available_devices = [], source = null;
  for (var device in devices) {
    source = this.getSourceFor(devices[device]);
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
