"use strict"
{
    const Chalk = require('chalk'),
        ChalkAnimation = require('chalk-animation'),
        logDivider = '------------------------------------------------------------------',
        //what symbols should show before and after the various log output text.
        startSymbols = ['🙏', '🙏', '🍩'],
        successSymbols = ['💯', '🙌', '🎉'],
        errorSymbols = ['😱', '😱', '💩'],
        holiday = require('fun-holidays')(),
        startLog = x => {
            console.log(Chalk.cyan(x));
        },//ChalkAnimation.neon(x), -- animation doesn't seem to work well unless it's the final log
        successLog = x => {
            ChalkAnimation.rainbow(x);
        },
        errorLog = x => {
            ChalkAnimation.pulse(x)
        },
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

        module.exports = {
            apply: compiler => {
                compiler.hooks.compile.tap('F9CompilePlugin', compilation => {
                    let startMessage = createMessage("Webpack build started", startSymbols);
                    startLog(startMessage);
                });

                compiler.hooks.done.tap('F9DonePlugin', stats => {
                    setTimeout(() => {
                        if(stats.compilation.errors.length === 0) {
                            let messages = [`Webpack build success (${parseFloat(stats.endTime - stats.startTime)/1000}s)`];

                            if (holiday) {
                                messages.push(`Happy ${holiday.name}!`);
                            }

                            let successMessage = createMessage(messages, successSymbols);
                            successLog(successMessage);
                        } else {
                            let errorMessage = createMessage("Webpack build failed", errorSymbols);

                            errorLog(errorMessage);
                        }
                    }, 1);
                });
            }
        }
}