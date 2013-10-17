function Devicr(devicr_image_selector) {
  this.image_selector = devicr_image_selector;
}

Devicr.prototype.adapt = function(devicr_image) {
  var source = this.image_selector.obtainBestSourceFor(devicr_image);
  devicr_image.replaceSourceWith(source);
};