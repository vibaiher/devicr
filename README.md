devicr
======

JavaScript library to load different images suiting the device

##How to install for development?

You need to install **[NodeJS](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)** and **bower** to manage dependencies and run grunt tasks like tests, jshint, concat and uglify:

1. Run `npm install`
2. Run `npm install -g bower`
3. Run `bower install`
4. Run `grunt`
5. Enjoy

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
