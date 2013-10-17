function DevicrImageSelector(devicr_device) {
  this.devicr_device = devicr_device;
}

DevicrImageSelector.prototype.getBestSourceFor = function(devicr_image) {
  var device = this.devicr_device.getDevice();

  if (this.devicr_device.isInLandscapeMode()) {
    return this.getBestLandscapeSourceFor(devicr_image);
  }
  return this.getBestPortraitSourceFor(devicr_image);
};

DevicrImageSelector.prototype.getBestLandscapeSourceFor = function(devicr_image) {
  if (this.devicr_device.hasRetinaPixelRatio()) {
    return this.getBestLandscapeSourceWithRetinaDisplayFor(devicr_image);
  }  
  return this.getBestLandscapeSourceWithoutRetinaDisplayFor(devicr_image);
};

DevicrImageSelector.prototype.getBestPortraitSourceFor = function(devicr_image) {
  var source = devicr_image.getImageFor(this.devicr_device.getDevice());
  if (source === undefined) {
    source = devicr_image.getFirstHigherImageAvailable();
  }
  if (source === undefined) {
    return devicr_image.getHighestImageAvailable();
  }
  return source;
};

DevicrImageSelector.prototype.getBestLandscapeSourceWithRetinaDisplayFor = function(devicr_image) {
  return devicr_image.getHighestImageAvailable();
};

DevicrImageSelector.prototype.getBestLandscapeSourceWithoutRetinaDisplayFor = function(devicr_image) {
  var source = devicr_image.getImageFor('desktop');
  if (source === undefined) {
    return devicr_image.getHighestImageAvailable();
  }
  return source;
};