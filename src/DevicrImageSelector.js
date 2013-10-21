function DevicrImageSelector(devicr_device, devicr_image_finder) {
  this.device = devicr_device;
  this.finder = devicr_image_finder;
}

DevicrImageSelector.prototype.getBestSourceFor = function(devicr_image) {
  var device = this.device.getDevice();

  if (this.device.isInLandscapeMode()) {
    return this.getBestLandscapeSourceFor(devicr_image);
  }
  return this.getBestPortraitSourceFor(devicr_image);
};

DevicrImageSelector.prototype.getBestLandscapeSourceFor = function(devicr_image) {
  if (this.device.hasRetinaPixelRatio()) {
    return this.getBestLandscapeSourceWithRetinaDisplayFor(devicr_image);
  }  
  return this.getBestLandscapeSourceWithoutRetinaDisplayFor(devicr_image);
};

DevicrImageSelector.prototype.getBestPortraitSourceFor = function(devicr_image) {
  var source = devicr_image.getImageFor(this.device.getDevice());
  if (source === null) {
    source = this.finder.findFirstHigherAvailableImage(devicr_image, this.device.getDevice());
  }
  if (source === null) {
    return this.finder.findHighestAvailableImage(devicr_image);
  }
  return source;
};

DevicrImageSelector.prototype.getBestLandscapeSourceWithRetinaDisplayFor = function(devicr_image) {
  return this.finder.findHighestAvailableImage(devicr_image);
};

DevicrImageSelector.prototype.getBestLandscapeSourceWithoutRetinaDisplayFor = function(devicr_image) {
  var source = devicr_image.getImageFor('desktop');
  if (source === null) {
    return this.finder.findHighestAvailableImage(devicr_image);
  }
  return source;
};