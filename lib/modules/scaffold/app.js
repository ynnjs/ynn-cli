const path = require( 'path' );
const fs = require( 'fs-extra' );
const isEmptyDir = require( 'empty-dir' );
const inquirer = require( 'inquirer' );
const config = require( './config' );
const write = require( './write' );
const utils = require( '../../utils' );

function init( dest, options = {} ) {
    if( !fs.pathExistsSync( dest ) ) {
        fs.mkdirpSync( dest );
    }

    const src = path.join( dest, 'src' );

    const controllerDir = path.resolve( src, options.controllerDir || config.controllerDir );
    const serviceDir = path.resolve( src, options.serviceDir || config.serviceDir );
    const configDir = path.resolve( src, options.configDir || config.configDir );
    const testDir = path.resolve( dest, options.testDir || config.testDir );

    fs.mkdirpSync( controllerDir );
    fs.mkdirpSync( serviceDir );
    fs.mkdirpSync( configDir );
    fs.mkdirpSync( testDir );

    const templateDir = options.templateDir || config.templateDir;

    write( 
        path.join( templateDir, 'main.sca' ),
        path.join( dest, 'index.js' ),
        options
    );

    //write(
        //path.join( templateDir, 'controller.sca' ),
        //path.join( controllerDir, 'index.js' ),
        //{
            //name : 'index',
            //actions : [ {
                //name : 'index',
                //body : 'return \'Hello Ynn!\''
            //} ]
        //}
    //);
}

module.exports = {
    create( name, options = {} ) {
        let dest = process.cwd(); 

        if( !name || name === '.' ) {
            if( !isEmptyDir.sync( dest ) ) {
                return inquirer.prompt( {
                    type : 'confirm',
                    name : 'confirm',
                    message : 'Current directory is\'t empty, would you like to create Ynn project in this directory?'
                } ).then( answers => {
                    if( answers.confirm ) {
                        return init( dest, options );
                    } else process.exit( 1 );
                } );
            } else return init( dest, options );
        } else {
            dest = path.join( dest, name );

            if( !fs.pathExistsSync( dest ) ) {
                init( dest, options );
            } else {
                if( utils.isdir( dest ) ) {
                    return inquirer.prompt( {
                        type : 'confirm',
                        name : 'confirm',
                        message : 'The directory has already existed, would you like to create Ynn project in it?'
                    } ).then( answers => {
                        if( answers.confirm ) {
                            return init( dest, options );
                        } else process.exit( 1 );
                    } );
                } else {
                    console.error( `The path "${dest}" is not a directory.` );
                    process.exit( 1 );
                }
            }
        }
    }
}
