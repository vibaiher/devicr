function RibbonSourceSelector(devicr_device, devicr_source_finder) {
  this.device = devicr_device;
  this.finder = devicr_source_finder;
}

RibbonSourceSelector.prototype.getBestSourceFor = function(devicr_element) {
  var device = this.device.getDevice();

  if (this.device.isInLandscapeMode()) {
    return this.getBestLandscapeSourceFor(devicr_element);
  }
  return this.getBestPortraitSourceFor(devicr_element);
};

RibbonSourceSelector.prototype.getBestLandscapeSourceFor = function(devicr_element) {
  var source = null;
  var device = this.device.getDevice();
  switch(device) {
    case 'mobile':
      source = devicr_element.getSourceFor('tablet');
      break;
    case 'tablet':
      source = devicr_element.getSourceFor('retina');
      break;
    default:
      source = devicr_element.getSourceFor(this.device.getDevice());
  }
  if (source === null) {
    source = this.finder.findFirstHigherAvailableSource(devicr_element);
  }
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};

RibbonSourceSelector.prototype.getBestPortraitSourceFor = function(devicr_element) {
  var source = devicr_element.getSourceFor(this.device.getDevice());
  if (source === null) {
    source = this.finder.findFirstHigherAvailableSource(devicr_element);
  }
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};
