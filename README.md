# auto-load-dir
A simple module to auto load modules from a dir. It was originally intended for loading express routes from `routes/`, but it could be used to load models as well.

---
## Installation

  npm install --save auto-load-dir

---
## Usage
Most interaction is done via the `Loader` class. As a convinence, a helper method is provided as module.exports, which simply creates a new `Loader` with the provided arguments.

    var Loader = require('auto-load-dir').Loader;
    // Or
    var Loader = require('auto-load-dir');
    
    // Later
      
    var routesLoader = new Loader(__dirname + '/routes', [app, express], function(){
      // Yay! Routes are loaded.
    });
    
    // Even later
    
    var modelLoader = new Loader(__dirname + '/models', function(model){
        model.init(mongoose, models);
        model.start();
        model.blowUpPluto(); // Who knows.
    }

---
## Docs
### new Loader(dir, args | handler, [callback])
`dir` is the directory to load all js files in.
`args` is an Array of arguments that get passed into module.exports for each module
OR
`handler` is a function that gets called with one argument, the already required module.
`callback` (optional) gets called with no paramaters if loading is sucessful, or an error if it's not.

---
## Developing
PRs are welcome! This was a simple file that I had in a project that needed encapsulating. Please add functionality and open a PR! It uses the [AirBnB JavaScript style guide](https://github.com/airbnb/javascript/tree/master/es5).

### Running tests

    git clone https://github.com/ariporad/auto-load-dir
    cd auto-load-dir
    npm install
    grunt test
    # (Also avalible is grunt lint)

---  
## License
http://ariporad.mit-license.org
