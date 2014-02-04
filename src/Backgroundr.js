function Backgroundr(devicr_element_selector) {
  this.source_selector = devicr_element_selector;
}

Backgroundr.prototype.adapt = function(devicr_element) {
  var source = this.source_selector.getBestSourceFor(devicr_element);
  devicr_element.replaceBackgroundImageBy(source);
};
