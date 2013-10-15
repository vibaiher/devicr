describe("DevicrImage", function() {
  
  var mobile_image, tablet_image, desktop_image, image, devicr_image = null;

  beforeEach(function () {
    this.fallback_image = 'image.fallback.jpg';
    this.mobile_image = 'image.mobile.jpg';
    this.tablet_image = 'image.tablet.jpg';
    this.desktop_image = 'image.desktop.jpg';
    this.retina_image = 'image.retina.jpg';

    this.image = new Image();
    this.image.setAttribute('src', this.fallback_image);
    this.image.setAttribute('mobile', this.mobile_image);
    this.image.setAttribute('tablet', this.tablet_image);
    this.image.setAttribute('desktop', this.desktop_image);
    this.image.setAttribute('retina', this.retina_image);

    this.devicr_image = new DevicrImage(this.image);
  });

  it("initially has no image", function() {
    expect(this.devicr_image.imageLoaded()).toBeNull();
  });

  it("has a special image for mobile devices", function() {
    expect(this.devicr_image.mobile()).toEqual(this.mobile_image);
  });

  it("has a special image for tablet devices", function() {
    expect(this.devicr_image.tablet()).toEqual(this.tablet_image);
  });

  it("has a special image for desktop devices", function() {
    expect(this.devicr_image.desktop()).toEqual(this.desktop_image);
  });

  it("has a special image for retina devices", function() {
    expect(this.devicr_image.retina()).toEqual(this.retina_image);
  });

  it("replaces current image for new image", function() {
    new_image = "patata.jpeg";

    this.devicr_image.replaceImageLoadedBy(new_image);
    
    expect(this.devicr_image.imageLoaded()).toEqual(new_image);
  });

});