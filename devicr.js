function ArrayIntersect() {
}

ArrayIntersect.intersect = function(one, two) {
  var index_one = 0, index_two = 0;
  var result = [];

  while( index_one < one.length && index_two < two.length )
  {
    if (one[index_one] < two[index_two]) {
      index_one++;
    }
    else if (one[index_one] > two[index_two]) {
      index_two++;
    }
    else /* they're equal */
    {
      result.push(one[index_one]);
      index_one++;
      index_two++;
    }
  }

  return result;
};;function Backgroundr(devicr_element_selector) {
  this.source_selector = devicr_element_selector;
}

Backgroundr.prototype.adapt = function(devicr_element) {
  var source = this.source_selector.getBestSourceFor(devicr_element);
  devicr_element.replaceBackgroundSourceBy(source);
};
;function Devicr(devicr_source_selector) {
  this.source_selector = devicr_source_selector;
}

Devicr.prototype.adapt = function(devicr_element) {
  var source = this.source_selector.getBestSourceFor(devicr_element);
  devicr_element.replaceSourceLoadedBy(source);
};;function DevicrDevice(device, screen_device) {
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
;function DevicrElement(element) {
  this.devices = ['retina', 'desktop', 'tablet', 'mobile'];
  this.element = element;
  this.element.removeAttribute('src');

  this.getHigherDevices = function(device) {
    var device_index = this.devices.indexOf(device), higher_devices = [];
    if (device_index > 0) {
      for (var i = 0; i < device_index; i++) {
        higher_devices[i] = this.devices[i];
      }
    }
    return higher_devices;
  };
}

DevicrElement.prototype.sourceLoaded = function() {
  return this.element.getAttribute('src');
};

DevicrElement.prototype.backgroundSourceLoaded = function() {
  return this.element.style.backgroundImage;
};

DevicrElement.prototype.getSourceFor = function(device) {
  return this.element.getAttribute(device);
};

DevicrElement.prototype.replaceSourceLoadedBy = function(source) {
  this.element.setAttribute('src', source);
};

DevicrElement.prototype.replaceBackgroundSourceBy = function(source) {
  this.element.setAttribute('style', 'background-image: url(' + source + ');');
};

DevicrElement.prototype.getAvailableDevices = function() {
  var devices = this.devices, available_devices = [], source = null;
  for (var device in devices) {
    source = this.getSourceFor(devices[device]);
    if (source !== null && source !== '') {
      available_devices.push(devices[device]);
    }
  }
  return available_devices;
};

DevicrElement.prototype.getHigherAvailableDevicesThan = function(device) {
  var higher_devices = this.getHigherDevices(device);
  if (higher_devices.length > 0) {
    var available_devices = this.getAvailableDevices();
    return ArrayIntersect.intersect(higher_devices, available_devices);
  }
  return [];
};
;function DevicrSourceFinder(devicr_device) {
  this.devicr_device = devicr_device;
}

DevicrSourceFinder.prototype.findHighestAvailableSource = function(devicr_element) {
  var available_devices = devicr_element.getAvailableDevices();
  if (available_devices.length === 0) {
    return null;
  }
  return devicr_element.getSourceFor(available_devices.shift());
};

DevicrSourceFinder.prototype.findFirstHigherAvailableSource = function(devicr_element) {
  var higher_available_devices = devicr_element.getHigherAvailableDevicesThan(this.devicr_device.getDevice());
  if (higher_available_devices.length === 0) {
    return null;
  }
  return devicr_element.getSourceFor(higher_available_devices.pop());
};
;function DevicrSourceSelector(devicr_device, devicr_source_finder) {
  this.device = devicr_device;
  this.finder = devicr_source_finder;
}

DevicrSourceSelector.prototype.getBestSourceFor = function(devicr_element) {
  var device = this.device.getDevice();

  if (this.device.isInLandscapeMode()) {
    return this.getBestLandscapeSourceFor(devicr_element);
  }
  return this.getBestPortraitSourceFor(devicr_element);
};

DevicrSourceSelector.prototype.getBestLandscapeSourceFor = function(devicr_element) {
  if (this.device.hasRetinaPixelRatio()) {
    return this.getBestLandscapeSourceWithRetinaDisplayFor(devicr_element);
  }  
  return this.getBestLandscapeSourceWithoutRetinaDisplayFor(devicr_element);
};

DevicrSourceSelector.prototype.getBestPortraitSourceFor = function(devicr_element) {
  var source = devicr_element.getSourceFor(this.device.getDevice());
  if (source === null) {
    source = this.finder.findFirstHigherAvailableSource(devicr_element);
  }
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};

DevicrSourceSelector.prototype.getBestLandscapeSourceWithRetinaDisplayFor = function(devicr_element) {
  return this.finder.findHighestAvailableSource(devicr_element);
};

DevicrSourceSelector.prototype.getBestLandscapeSourceWithoutRetinaDisplayFor = function(devicr_element) {
  var source = devicr_element.getSourceFor('desktop');
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
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
;function StreamrSourceSelector(devicr_device, devicr_source_finder) {
  this.device = devicr_device;
  this.finder = devicr_source_finder;
}

StreamrSourceSelector.prototype.getBestSourceFor = function(devicr_element) {
  if (this.device.getDevice() != 'mobile' && this.device.isInLandscapeMode()) {
    return this.getBestLandscapeSourceFor(devicr_element);
  }
  return this.getBestPortraitSourceFor(devicr_element);
};

StreamrSourceSelector.prototype.getBestLandscapeSourceFor = function(devicr_element) {
  if (this.device.hasRetinaPixelRatio()) {
    return this.getBestLandscapeSourceWithRetinaDisplayFor(devicr_element);
  }  
  return this.getBestLandscapeSourceWithoutRetinaDisplayFor(devicr_element);
};

StreamrSourceSelector.prototype.getBestPortraitSourceFor = function(devicr_element) {
  if (this.device.isATabletWithBigScreen()) {
    return this.getBestPortraitSourceForBigTablets(devicr_element);
  }
  var source = devicr_element.getSourceFor(this.device.getDevice());
  if (source === null) {
    source = this.finder.findFirstHigherAvailableSource(devicr_element);
  }
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};

StreamrSourceSelector.prototype.getBestLandscapeSourceWithRetinaDisplayFor = function(devicr_element) {
  return this.finder.findHighestAvailableSource(devicr_element);
};

StreamrSourceSelector.prototype.getBestLandscapeSourceWithoutRetinaDisplayFor = function(devicr_element) {
  var source = devicr_element.getSourceFor('desktop');
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};

StreamrSourceSelector.prototype.getBestPortraitSourceForBigTablets = function(devicr_element) {
  var source = null;
  if (!this.device.hasRetinaPixelRatio()) {
    source = this.finder.findFirstHigherAvailableSource(devicr_element);
  }
  if (source === null) {
    return this.finder.findHighestAvailableSource(devicr_element);
  }
  return source;
};
