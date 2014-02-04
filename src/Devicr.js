function Devicr(devicr_source_selector) {
  this.source_selector = devicr_source_selector;
}

Devicr.prototype.adapt = function(devicr_element) {
  var source = this.source_selector.getBestSourceFor(devicr_element);
  devicr_element.replaceSourceLoadedBy(source);
};