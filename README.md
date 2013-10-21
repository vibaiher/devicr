#Devicr

Library to lazy load images depending of device (mobile, tablet or desktop) and mode (landscape, portrait or retina)

##How to install?

You don't need to install anything to use the library but you need install **NodeJS** to run grunt tasks (tests, jshint, concat and uglify)

1. Run `npm install`
2. Run `grunt`
3. Enjoy

##How can I use it?

1. Add a script tag in your html and load **devicr.min.js**
2. Add a javascript tag like this:
    ```javascript
    var device = new DevicrDevice(categorizr(), new ScreenDevice(window));
    var selector = new DevicrImageSelector(device, new DevicrImageFinder(device));
    var devicr = new Devicr(selector);
    $('img.devicr').each(function() {
        devicr.adapt(new DevicrImage(this));
    });
    ```
3. Add class devicr to your html, and a source for all devices you want like:
    ```html
    <a class="devicr" mobile="/mobile.jpeg" tablet="/tablet.jpeg" desktop="/desktop.jpeg" retina="/retina.jpeg"></a>
    ```
