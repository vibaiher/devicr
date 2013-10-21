function DevicrImageFinder(devicr_device) {
  this.devicr_device = devicr_device;
}

DevicrImageFinder.prototype.findHighestAvailableImage = function(devicr_image) {
  var available_devices = devicr_image.getAvailableDevices();
  if (available_devices.length === 0) {
    return null;
  }
  return devicr_image.getImageFor(available_devices.shift());
};

DevicrImageFinder.prototype.findFirstHigherAvailableImage = function(devicr_image) {
  var higher_available_devices = devicr_image.getHigherAvailableDevicesThan(this.devicr_device.getDevice());
  if (higher_available_devices.length === 0) {
    return null;
  }
  return devicr_image.getImageFor(higher_available_devices.pop());
};