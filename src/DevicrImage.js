function DevicrImage(image) {
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

