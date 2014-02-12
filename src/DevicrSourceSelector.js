function DevicrSourceSelector(devicr_device, devicr_source_finder) {
  this.device = devicr_device;
  this.finder = devicr_source_finder;
}

DevicrSourceSelector.prototype.getBestSourceFor = function(devicr_element) {
  var device = this.device.getDevice();

  if (this.device.isInLandscapeMode()) {
    return this.getBestLandscapeSourceFor(devicr_element);
  }
  return this.getBestPortraitSourceFor(devicr_element);
};

DevicrSourceSelector.prototype.getBestLandscapeSourceFor = function(devicr_element) {
  if (this.device.hasRetinaPixelRatio()) {
    return this.getBestLandscapeSourceWithRetinaDisplayFor(devicr_element);
  }  
  return this.getBestLandscapeSourceWithoutRetinaDisplayFor(devicr_element);
};

DevicrSourceSelector.prototype.getBestPortraitSourceFor = function(devicr_element) {
  if (this.device.isATabletWithBigScreen()) {
    return this.getBestPortraitSourceForBigTablets(devicr_element);
  }
  var source = devicr_element.getSourceFor(this.device.getDevice());
  if (source === null) {
    source = this.finder.findFirstHigherAvailableSource(devicr_element);
  }
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};

DevicrSourceSelector.prototype.getBestLandscapeSourceWithRetinaDisplayFor = function(devicr_element) {
  return this.finder.findHighestAvailableSource(devicr_element);
};

DevicrSourceSelector.prototype.getBestLandscapeSourceWithoutRetinaDisplayFor = function(devicr_element) {
  var source = devicr_element.getSourceFor('desktop');
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};

DevicrSourceSelector.prototype.getBestPortraitSourceForBigTablets = function(devicr_element) {
  var source = null;
  if (!this.device.hasRetinaPixelRatio()) {
    source = this.finder.findFirstHigherAvailableSource(devicr_element);
  }
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};
