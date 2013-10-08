function DevicrDevice(device, screen_device) {
  this.device = device;
  this.screen_device = screen_device;
}

DevicrDevice.prototype.isMobile = function() {
  return this.device === 'mobile';
};

DevicrDevice.prototype.isTablet = function() {
  return this.device === 'tablet';
};

DevicrDevice.prototype.isDesktop = function() {
  return this.device === 'desktop';
};

DevicrDevice.prototype.isLandscape = function() {
  return this.screen_device.getHeight() < this.screen_device.getWidth();
};

DevicrDevice.prototype.isPortrait = function() {
  return this.screen_device.getHeight() >= this.screen_device.getWidth();
};

DevicrDevice.prototype.isRetina = function() {
  return this.screen_device.getDevicePixelRatio() > 1;
};