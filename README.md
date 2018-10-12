A simple configurable logger that will indicate when a webpack build has started, succeeded or failed, with colors and emojis!


Example: 

```javascript
const funLogger = require('fun-webpack-logger'),
	Chalk = require('chalk'),//these libraries (or others) can be used to color the output however you like with custom options below
    ChalkAnimation = require('chalk-animation');

let logger = new funLogger({//these are all of the default options and their values.
        holidays: true,//if false, holiday greetings will not be displayed in the success output
        startMessage: "Webpack build started",//Message to be displayed when a build begins
        successMessage: "Webpack build success",//Message to be displayed when a build succeeds
        errorMessage: "Webpack build failed",//Message to be displayed when a build fails
        startSymbols: ['🙏', '🙏', '🍩'],//symbols to display surrounding the start message
        successSymbols: ['💯', '🙌', '🎉'],//symbols to display surrounding the success message
        errorSymbols: ['😱', '😱', '💩'],//symbols to display surrounding the error message
        animationTimeout: 1000 * 60 * 5,//Stop the animation after this many milliseconds, default 5 minutes
        //action to perform when start message is displayed.  
        //Multiple can be included in the array, or a single function only.  
        //If this is populated, the default behavior will not be performed.
        //'this' is the options object, first parameter is the full message that will display.
        onStart: [
            function (x) {
                console.log(Chalk.cyan(x));
            }
        ],
        onSuccess: [//action to perform when success message is displayed.  Same rules as onStart apply.
            function(x) {
                let animation = ChalkAnimation.rainbow(x);
                setTimeout(() => animation.stop(), this.animationTimeout);
            }
        ],
        onError: [//action to perform when error message is displayed.  Same rules as onStart apply.
            function (x) {
                let animation = ChalkAnimation.pulse(x);
                setTimeout(() => animation.stop(), this.animationTimeout);
            }
        ],
    });

module.exports = {
	...
	"plugins": [
		logger
	]
}
```

This will output the following:

**Beginning:**  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
                🙏🙏🍩   Webpack build started 🍩🙏🙏  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
  
**Success:**  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
           💯🙌🎉   Webpack build success (47.606s) 🎉🙌💯  
                  Happy National Crunchy Taco Day!  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
  
**Failure:**  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
                😱😱💩   Webpack build failed 💩😱😱  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  