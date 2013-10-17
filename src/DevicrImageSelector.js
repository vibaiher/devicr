function DevicrImageSelector(devicr_device) {
  this.devicr_device = devicr_device;
}

DevicrImageSelector.prototype.obtainBestSourceFor = function(devicr_image) {
  var device = this.devicr_device.getDevice();
  var source = undefined;

  if (this.devicr_device.isInLandscapeMode()) {
    if (this.devicr_device.hasRetinaPixelRatio()) {
      source = devicr_image.getHighestImageAvailable();
    }
    else {
      source = devicr_image.getImageFor('desktop');
      if (source === undefined) {
        source = devicr_image.getHighestImageAvailable();
      }
    }
  }
  else {
    source = devicr_image.getImageFor(device);
    if (source === undefined) {
      source = devicr_image.getFirstHigherImageAvailable();
    }
    if (source === undefined) {
      source = devicr_image.getHighestImageAvailable();
    } 
  }

  return source;
};