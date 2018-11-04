const fs = require( 'fs' );
const path = require( 'path' );

function isdirSync( ...args ) {
    const dir = path.resolve( ...args );
    try {
        const lstat = fs.lstatSync( dir );
        return lstat.isDirectory();
    } catch( e ) {
        return false;
    }
    
}

module.exports = { isdirSync };
