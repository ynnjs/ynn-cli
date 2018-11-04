const fs = require( 'fs' );
const nunjucks = require( 'nunjucks' );

nunjucks.configure( { autoescape : false } );

module.exports = ( tpl, dest, data = {} ) => {
    const template = fs.readFileSync( tpl ).toString();
    fs.writeFileSync( dest, nunjucks.renderString( template, data ) );
};
