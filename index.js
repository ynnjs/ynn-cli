const semver = require( 'semver' );
const program = require( 'commander' );
const modules = require( './lib/modules' );
const pkg = require( './package.json' );

if( !semver.satisfies( process.version, pkg.engines.node ) ) {
    console.log( `ynn-cli requires node version ${pkg.engines.node}.` );
    process.exit( 0 );
}

program
    .version( pkg.version )
    .usage( '<command> [options]' );

program
    .command( 'init' )
    .description( 'initialize a Ynn project in current dir' )
    .option( '--pm', 'package manager for node' )

program
    .command( 'new [name]' )
    .description( 'create a new Ynn project' )
    .option( '-t, --template-dir, <template>', 'to specify a customized template directory.' )
    .option( '--no-install-ynn', 'skip install the Ynn package' )
    .option( '--config-dir <configDir>', 'config directory name.' )
    .option( '--controller-dir <controllerDir>', 'controller directory name.' )
    .option( '--service-dir <serviceDir>', 'service directory name.' )
    .option( '--test-dir <testDir>', 'directory for test cases.' )
    .option( '--plugins <plugins>', 'dependent plugins' )
    .option( '--no-routers-file <routersFile>', 'don not create a router.js' )
    .action( ( name, cmd ) => {
        return modules.scaffold.app.create( name, cmd.opts() );
    } );


program
    .command( 'list [options]' )
    .description( 'Lists the files files' )

program
    .command( 'controller <controller file name>' )
    .description( 'create a new controller script file' )
    
program
    .command( 'service <service file name>' )
    .description( 'create a new service script file' )

program
    .command( 'mount <module name> <module path>' )
    .description( 'install and mount a Ynn project as a module' ) 

program
    .command( 'plugin <plugin name> <plugin path>' )
    .description( 'install and add a Ynn plugin' )


program
    .parse( process.argv );
