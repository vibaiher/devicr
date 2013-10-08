function ScreenDevice() {

}

ScreenDevice.prototype.getHeight = function() {
  return window.innerHeight;
};

ScreenDevice.prototype.getWidth = function() {
  return window.innerWidth;
};

ScreenDevice.prototype.getDevicePixelRatio = function() {
  return window.devicePixelRatio;
};