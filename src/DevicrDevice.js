function DevicrDevice(device, screen_device) {
  this.device = device;
  this.screen_device = screen_device;
}

DevicrDevice.prototype.getDevice = function() {
  return this.device;
};

DevicrDevice.prototype.isMobile = function() {
  return this.device === 'mobile';
};

DevicrDevice.prototype.isTablet = function() {
  return this.device === 'tablet';
};

DevicrDevice.prototype.isDesktop = function() {
  return this.device === 'desktop';
};

DevicrDevice.prototype.isATabletWithBigScreen = function() {
  return this.isTablet() && (this.screen_device.getWidth() > 750);
};

DevicrDevice.prototype.isInLandscapeMode = function() {
  return this.screen_device.getHeight() < this.screen_device.getWidth();
};

DevicrDevice.prototype.isInPortraitMode = function() {
  return this.screen_device.getHeight() >= this.screen_device.getWidth();
};

DevicrDevice.prototype.hasRetinaPixelRatio = function() {
  return this.screen_device.getDevicePixelRatio() > 1;
};
