const path = require( 'path' );


const config = {
    templateDir : path.join( __dirname, 'templates/ynn-0.0.0' ),
    controllerDir : 'controller',
    serviceDir : 'service',
    configDir : 'config',
    testDir : 'test'
};

module.exports = config;
