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
