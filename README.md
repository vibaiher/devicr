devicr
======

JavaScript library to load different images suiting the device

## Development

You need to install **[NodeJS](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)** and **bower** to manage dependencies and run grunt tasks like tests, jshint, concat and uglify:

1. Install development dependencies: `npm install`
2. Install runtime dependencies: `npm install -g bower` and `bower install`
3. You can run tests using: `npm test`
4. To minify your code you can use the default task of grunt executing: `grunt`

## How can I use it?


1. Add a script tag in your html and load **devicr.min.js**
2. Add a javascript tag like this:
    ```javascript
    var device = new DevicrDevice(categorizr(), new ScreenDevice(window));
    var selector = new DevicrSourceSelector(device, new DevicrSourceFinder(device));
    var devicr = new Devicr(selector);
    $('img.devicr').each(function() {
      devicr.adapt(new DevicrElement(this));
    });
    ```
3. Add class devicr to your html, and a source for all devices you want like:
    ```html
    <img class="devicr" mobile="/mobile.jpeg" tablet="/tablet.jpeg" desktop="/desktop.jpeg" retina="/retina.jpeg"></a>
    ```

## or...

If you want you can use devicr to change the background-url of a element:

1. Add a script tag in your html and load **devicr.min.js**
2. Add a javascript tag like this:
    ```javascript
    var device = new DevicrDevice(categorizr(), new ScreenDevice(window));
    var selector = new DevicrSourceSelector(device, new DevicrSourceFinder(device));
    var devicr = new Devicr(selector);
    $('.backgroundr').each(function() {
      backgroundr.adapt(new DevicrElement(this));
    });
    ```
3. Add class backgroundr to your html, and a source for all devices you want like:
    ```html
    <a class="backgroundr" mobile="/mobile.jpeg" tablet="/tablet.jpeg" desktop="/desktop.jpeg" retina="/retina.jpeg"></a>
    ```
