function DevicrSourceFinder(devicr_device) {
  this.devicr_device = devicr_device;
}

DevicrSourceFinder.prototype.findHighestAvailableImage = function(devicr_element) {
  var available_devices = devicr_element.getAvailableDevices();
  if (available_devices.length === 0) {
    return null;
  }
  return devicr_element.getImageFor(available_devices.shift());
};

DevicrSourceFinder.prototype.findFirstHigherAvailableImage = function(devicr_element) {
  var higher_available_devices = devicr_element.getHigherAvailableDevicesThan(this.devicr_device.getDevice());
  if (higher_available_devices.length === 0) {
    return null;
  }
  return devicr_element.getImageFor(higher_available_devices.pop());
};
