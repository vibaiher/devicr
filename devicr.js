function Devicr(devicr_device) {
  this.devicr_device = devicr_device;
}

Devicr.prototype.loadImage = function(devicr_image) {
  var image;
  if (this.devicr_device.isDesktop()) {
    image = (this.devicr_device.isRetina() ? devicr_image.retina() : devicr_image.desktop());
  }
  else {
    image = (this.devicr_device.isPortrait() ? (this.devicr_device.isMobile() ? devicr_image.mobile() : devicr_image.tablet()) : devicr_image.desktop());
  }
  devicr_image.replaceImageLoadedBy(image);
};
;function DevicrDevice(device, screen_device) {
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
;function DevicrImage(image) {
  var createFallbackImage = function() {
    image.setAttribute('fallback', image.getAttribute('src'));
  };

  var deleteSourceImage = function() {
    image.removeAttribute('src');
  };

  this.image = image;
  createFallbackImage();
  deleteSourceImage();
}

DevicrImage.prototype.imageLoaded = function() {
  return this.image.getAttribute('src');
};

DevicrImage.prototype.mobile = function() {
  return this.image.getAttribute('mobile');
};

DevicrImage.prototype.tablet = function() {
  return this.image.getAttribute('tablet');
};

DevicrImage.prototype.desktop = function() {
  return this.image.getAttribute('desktop');
};

DevicrImage.prototype.retina = function() {
  return this.image.getAttribute('retina');
};

DevicrImage.prototype.replaceImageLoadedBy = function(image_path) {
  this.image.setAttribute('src', image_path);
};
;function ScreenDevice() {

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
