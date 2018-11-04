const server = require( './server' );

module.exports = {
    cmd : [ 'start-server' ],
    run( options, env, config ) {
        const args = options._;
        const cmd = args[ 0 ];

        switch( cmd ) {
            case 'start-server' :
                server( options, env, config );
                break;
        }
    }
}
