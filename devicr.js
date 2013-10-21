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
};;function Devicr(devicr_image_selector) {
  this.image_selector = devicr_image_selector;
}

Devicr.prototype.adapt = function(devicr_image) {
  var source = this.image_selector.getBestSourceFor(devicr_image);
  devicr_image.replaceImageLoadedBy(source);
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

DevicrDevice.prototype.isInLandscapeMode = function() {
  return this.screen_device.getHeight() < this.screen_device.getWidth();
};

DevicrDevice.prototype.isInPortraitMode = function() {
  return this.screen_device.getHeight() >= this.screen_device.getWidth();
};

DevicrDevice.prototype.hasRetinaPixelRatio = function() {
  return this.screen_device.getDevicePixelRatio() > 1;
};
;function DevicrImage(image) {
  this.devices = ['retina', 'desktop', 'tablet', 'mobile'];
  this.image = image;
  this.image.removeAttribute('src');

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

DevicrImage.prototype.imageLoaded = function() {
  return this.image.getAttribute('src');
};

DevicrImage.prototype.getImageFor = function(device) {
  return this.image.getAttribute(device);
};

DevicrImage.prototype.replaceImageLoadedBy = function(image_path) {
  this.image.setAttribute('src', image_path);
};

DevicrImage.prototype.getAvailableDevices = function() {
  var devices = this.devices, available_devices = [], source = null;
  for (var device in devices) {
    source = this.getImageFor(devices[device]);
    if (source !== null && source !== '') {
      available_devices.push(devices[device]);
    }
  }
  return available_devices;
};

DevicrImage.prototype.getHigherAvailableDevicesThan = function(device) {
  var higher_devices = this.getHigherDevices(device);
  if (higher_devices.length > 0) {
    var available_devices = this.getAvailableDevices();
    return ArrayIntersect.intersect(higher_devices, available_devices);
  }
  return [];
};;function DevicrImageFinder(devicr_device) {
  this.devicr_device = devicr_device;
}

DevicrImageFinder.prototype.findHighestAvailableImage = function(devicr_image) {
  var available_devices = devicr_image.getAvailableDevices();
  if (available_devices.length === 0) {
    return null;
  }
  return devicr_image.getImageFor(available_devices.shift());
};

DevicrImageFinder.prototype.findFirstHigherAvailableImage = function(devicr_image) {
  var higher_available_devices = devicr_image.getHigherAvailableDevicesThan(this.devicr_device.getDevice());
  if (higher_available_devices.length === 0) {
    return null;
  }
  return devicr_image.getImageFor(higher_available_devices.pop());
};;function DevicrImageSelector(devicr_device, devicr_image_finder) {
  this.device = devicr_device;
  this.finder = devicr_image_finder;
}

DevicrImageSelector.prototype.getBestSourceFor = function(devicr_image) {
  var device = this.device.getDevice();

  if (this.device.isInLandscapeMode()) {
    return this.getBestLandscapeSourceFor(devicr_image);
  }
  return this.getBestPortraitSourceFor(devicr_image);
};

DevicrImageSelector.prototype.getBestLandscapeSourceFor = function(devicr_image) {
  if (this.device.hasRetinaPixelRatio()) {
    return this.getBestLandscapeSourceWithRetinaDisplayFor(devicr_image);
  }  
  return this.getBestLandscapeSourceWithoutRetinaDisplayFor(devicr_image);
};

DevicrImageSelector.prototype.getBestPortraitSourceFor = function(devicr_image) {
  var source = devicr_image.getImageFor(this.device.getDevice());
  if (source === null) {
    source = this.finder.findFirstHigherAvailableImage(devicr_image);
  }
  if (source === null) {
    return this.finder.findHighestAvailableImage(devicr_image);
  }
  return source;
};

DevicrImageSelector.prototype.getBestLandscapeSourceWithRetinaDisplayFor = function(devicr_image) {
  return this.finder.findHighestAvailableImage(devicr_image);
};

DevicrImageSelector.prototype.getBestLandscapeSourceWithoutRetinaDisplayFor = function(devicr_image) {
  var source = devicr_image.getImageFor('desktop');
  if (source === null) {
    return this.finder.findHighestAvailableImage(devicr_image);
  }
  return source;
};;function ScreenDevice() {

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
