A simple logger that will indicate when a webpack build has started, succeeded or failed, with colors and emojis!


Example: 

```javascript
const funLogger = require('fun-webpack-logger');

module.exports = {
	...
	"plugins": [
		funLogger
	]
}
```

This will output the following:

**Beginning:**
------------------------------------------------------------------
                🙏 🙏 🍩   Webpack build started 🍩 🙏 🙏
------------------------------------------------------------------

**Success:**
------------------------------------------------------------------
           💯 🙌 🎉   Webpack build success (47.606s) 🎉 🙌 💯
                  Happy National Crunchy Taco Day!
------------------------------------------------------------------

**Failure:**
------------------------------------------------------------------
                😱 😱 💩   Webpack build failed 💩 😱 😱
------------------------------------------------------------------