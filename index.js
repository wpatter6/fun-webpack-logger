"use strict"
{

    let defaultOptions = {
        holidays: true,
        startMessage: "Webpack build started",
        successMessage: "Webpack build success",
        errorMessage: "Webpack build failed",
        startSymbols: ['🙏', '🙏', '🍩'],
        successSymbols: ['💯', '🙌', '🎉'],
        errorSymbols: ['😱', '😱', '💩'],
        onStart: [
            x => {
                console.log(Chalk.cyan(x));
            }
        ],
        onSuccess: [
            x => {
                ChalkAnimation.rainbow(x);
            }
        ],
        onError: [
            x => {
                ChalkAnimation.pulse(x)
            }
        ],
    }

    const Chalk = require('chalk'),
        ChalkAnimation = require('chalk-animation'),
        logDivider = '------------------------------------------------------------------',
        createMessage = (message, symbols) => {
            let strings = [], result = "";
            
            if(message instanceof Array) {
                strings = message;
            } else {
                strings.push(message);
            }
            
            strings.forEach((str, i) => {
                let current = i === 0 ? `${symbols.join(' ')}   ${str} ${symbols.reverse().join(' ')}` : str;
                result += (' '.repeat(Math.max(Math.ceil((logDivider.length - current.length) / 2 + (i === 0 ? 3 : 1)), 0))) + current + '\n';
            });

            return logDivider + '\n' + result + logDivider;
        };

        module.exports = class {
            constructor(options) {
                this.options = Object.assign({}, defaultOptions, options);
            };

            apply (compiler) {
                compiler.hooks.compile.tap('F9CompilePlugin', compilation => {
                    let msg = createMessage(this.options.startMessage, this.options.startSymbols);

                    if(this.options.onStart instanceof Array) {
                        this.options.onStart.forEach(func => func(msg))
                    } else {
                        this.options.onStart(msg);
                    }
                });

                compiler.hooks.done.tap('F9DonePlugin', stats => {
                    setTimeout(() => {
                        if(stats.compilation.errors.length === 0) {
                            let messages = [`${this.options.successMessage} (${parseFloat(stats.endTime - stats.startTime)/1000}s)`];

                            if (this.options.holidays) {
                                const holiday = require('fun-holidays')();
                                if(holiday) {
                                    messages.push(`Happy ${holiday.name}!`);
                                }
                            }

                            let msg = createMessage(messages, this.options.successSymbols);

                            if(this.options.onSuccess instanceof Array) {
                                this.options.onSuccess.forEach(func => func(msg))
                            } else {
                                this.options.onSuccess(msg);
                            }
                        } else {
                            let msg = createMessage(this.options.errorMessage, this.options.errorSymbols);

                            if(this.options.onError instanceof Array) {
                                this.options.onError.forEach(func => func(msg))
                            } else {
                                this.options.onError(msg);
                            }
                        }
                    }, 1);
                });
            };
        }
}