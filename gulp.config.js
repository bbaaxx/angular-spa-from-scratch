module.exports = function () {
    var client = './src/client/';
    var server = './src/server/';
    var clientApp = client + 'app/';
    var report = './report/';
    var root = './';
    var specRunnerFile = 'specs.html';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/',
        ignorePath: '../..'
    };
    var nodeModules = 'node_modules';
    
    var config = {
        
        /**
         * File paths
         */
        client: client,
        server: server,
        temp: temp,
        root: root,
        source: 'src/',
        build: './build/',
        
        /**
         * javascript
         */
        // Stuff to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        // app js, with no specs
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        // js insert order
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        // stubs
        stubsjs: [
            bower.directory + 'angular-mocks/angular-mocks.js',
            client + 'stubs/**/*.js'
        ],
        
        /**
         * Html, templates and assets
         */
        fonts: bower.directory + 'font-awesome/fonts/**/*.*',
        html: client + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        
        /**
         * plato
         */
        plato: {js: clientApp + '**/*.js'},
        report: report,
        /**
         * less
         */
        css: temp + 'styles.css',
        less: client + 'styles/styles.less',
        
        
        /**
         * Node settings
         */
        nodeServer: server + 'app.js',
        defaultPort: '8001'
        
    };

    return config;
};