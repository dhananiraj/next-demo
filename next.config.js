const withPwa = require('next-pwa');

module.exports =
    withPwa(
        {

            // other configs...
            pwa: {
                dest: 'public',
                register: true,
                scope: '/',
                sw: 'service-worker.js'
            }
        }
    )