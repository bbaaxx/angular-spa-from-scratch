# Angular from scratch

_Eduardo Mosqueda (bbaaxx (arroba) gmail.com) October 4, 2015_

This repository is a history of my attempt to build a single page application 
using angular js and starting from zero following some popular best practices 
fond on the internet at the present (this project was started on October 2015).

Is a notebook/tutorial/reference kind of thing to help me learn the basics of
modern build systems, common angular patterns and best practices.

*DISCLAIMER:* I'm a complete newbie with Angular so as a suggestion from an 
amazing developer and my Angular mentor I will take John Papa's Style Guide 
and his amazing hottowel template and once I have something similar working
I will take it from there.

## First steps: No Hello World ! just yet.

### Seting up basic tools and reference project

I am using Cloud9 Editor for this to be publicly available as reference
and because is very cool. I really like linux.

First let's make sure we have `git`, `curl` and `nvm` installed; With this I 
can now install NodeJs, I will be using the latest stable version 
before 4.0 which at this time is 0.12.7 :

    $ nvm install 0.12.7
    $ nvm unalias default
    $ nvm alias default 0.12
    $ nvm use default

Then I will install some global npm packages I know I will require for this:

    $ npm install -g gulp yo nodemon bower 

Also, some stuff I like to try:

    npm install -g generator-hottowel phantomjs karma
    
With all this I will create a folder to store the hottowel template
that I'll call `htwr` and generate the template using yeoman:

    $ mkdir htwr && cd htwr
    $ yo hottowel htwr

I want this to be the base for my project so I will prepare the repository
and commit stuff. To do this I will first initialize a repository by:

    $ git init 

And then will create a `.gitignore` file to prevent the `.c9` folder from
Code9 to get included in the repository

    $ echo ".c9" > .gitignore
    $ git add .gitignore
    $ git add .
    $ git commit -m "Initial commit"

At this point is time to create our fancy new repository at github.

    $ git remote add origin https://github.com/bbaaxx/angular-spa-from-scratch.git
    $ git pull origin master
    $ git push origin master

Make sure everything is as expected with:

    $ git status
    >On branch master
    >nothing to commit, working directory clean
    

### Initializing the project and adding base packages

I will go ahead and initialize the project from the npm and bower perspectives
by issuing the respective init commands and answering the prompts accordingly:

    $ npm init
    [ ... ]
    $ bower init
    [ ... ]
    
Now I can install my packages to start working on the build system, let's try:

    $ npm install --save-dev gulp gulp-load-plugins gulp-task-listing yargs

At this point I forgot to add the `node_modules` and `bower_components` folders
to the `.gitignore` file so lets do that:

    $ echo "node_modules" >> .gitignore
    $ echo "bower_components" >> .gitignore
    $ git add .gitignore

That should do. Now, let's create a `gulpfile.js` and see... but first I will
install all the packages from hottowel just for hicks:

    npm install --save-dev 
        browser-sync 
        chai 
        chai-as-promised 
        chalk dateformat 
        debug del glob 
        gulp 
        gulp-angular-templatecache 
        gulp-autoprefixer 
        gulp-bump gulp-bytediff 
        gulp-concat gulp-filter 
        gulp-header gulp-if 
        gulp-imagemin gulp-inject 
        gulp-jscs gulp-jshint 
        gulp-less gulp-load-plugins 
        gulp-minify-css gulp-minify-html 
        gulp-ng-annotate gulp-nodemon 
        gulp-order 
        gulp-plumber 
        gulp-print 
        gulp-rev 
        gulp-rev-replace 
        gulp-sourcemaps 
        gulp-task-listing 
        gulp-uglify 
        gulp-useref 
        gulp-util 
        jshint-stylish 
        karma 
        karma-chai 
        karma-chai-sinon 
        karma-chrome-launcher 
        karma-coverage 
        karma-firefox-launcher 
        karma-growl-reporter 
        karma-mocha 
        karma-phantomjs-launcher 
        karma-safari-launcher 
        karma-sinon 
        lodash 
        method-override 
        minimist 
        mocha 
        node-notifier 
        phantomjs 
        plato 
        q 
        sinon 
        sinon-chai 
        wiredep 
        yargs
        


    
That's was a lot of stuff, you may want to know that this can fail a couple
times depending on how you have your computer set up, 

#### If you are using xNIX =)
I am a xNIX fan and I usually develop on a linux home server, things are really 
easy in there. In order for everything to compile we just need to make sure
that we have python and the C compilers.

    $ sudo apt-get install build-essential checkinstall

#### If you are using Windows =S
Windows on the other hand is like taking a trip to hell but ... good luck and
have a look at 
[John Papa's tips for running node on windows](http://www.johnpapa.net/tips-for-running-node-and-npm-on-windows)

It usually involves installing some version of visual studio compilers and
dealing with enviromental variables, google a lot and you will do just fine.

## Next on : The gulpiest side of gulp

### Environment considerations
Is better to have Gulp installed globally as suggested previously to use its
cli, gulp is still required locally as we will require it from the Gulpfile
below.

The local install is required in the Gulpfile which we will get into in
a little while. But it can also be used to execute locally using npm scripts
take a look in [here](https://docs.npmjs.com/cli/run-script).

### Beginning with gulp tubes, pipes and streams.
If you know what this does: `ls -la | grep somefile` then 
[GulpJs](http://gulpjs.com/) will be  easy to understand, gulp acts in the 
principle of pipes using the amazing NodeJs 
[stream api](https://nodejs.org/api/stream.html).

Basically you create named tasks that you can later require as prerequisites
to other tasks. Here is a task definition:

    gulp.task('someTask', function(){
        // Task body
    });

This tasks are copmosed of ... lets say *tubes* that will
_pipe down_ an input that can be a bunch of files or a string of some kind
and many other things. As these inputs will effectively become streams, you
create a gulp stream using the `gulp.src()` function and passing a glob
parameter that can be an array.

    gulp
        .src(['./*.js', './app/**/*.js']);

These inputs will be processed by gulp plugins and other stream treating
functions as they travel across the tube. This is an example of a task:

    gulp.task('vet', function() {
        log('Analyzing source with JSHint and JSCS');
    
        return gulp
            .src(config.alljs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe($.jshint.reporter('fail'))
            .pipe($.jscs());
    });
    
In the case of this task, the stream consists of a bunch of js files that
will be processed by the `gulp-print` plugin if a `--verbose` parameter is
passed and then to `gulp-jshint` and its reporters and last to the `gulp-jscs`
thingie for code style. In this case the output is whatever `print`, `jshint`,
and `jscs` want to do with the streams which is to display at the console.

But sometimes the tube will need to put the stream as an output on a folder or
file, for this we use `gulp.dest()` function as in the example below:

    gulp.task('styles', ['clean-styles'], function() {
        log('Compiling Less --> CSS');
    
        return gulp
            .src(config.less)
            .pipe($.plumber()) // exit gracefully if something fails after this
            .pipe($.less())
    //      .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
            .pipe(gulp.dest(config.temp));
    });
    
This one other task will compile the less files defined in the `config.less`
variable and autoprefix them before placing them at the location defined in 
the `config.temp` variable.

*NOTE ON PLUMBER*: The [gulp-plumber](https://github.com/floatdrop/gulp-plumber)
plugin allows or prepares the tube to handle breaking plugins or 
functions in a graceful manner.

Those were 5 minutes with Gulp, now additional details on Gulp can be learned
at the [GulpJs](http://gulpjs.com/) site.

## Enter jspm and ES6
At this point I decided that the whole thing will be even nicer if it helps
me learn ES6 syntax so before going on with dependecies and stuff, I will
install jspm which makes babel a pie to use so:

    $ npm install jspm -g
    $ npm install jspm --save
    
Next we init the jspm project. Just say yes to everything except for the
base path that should point to /src/client and the ES6 transpiler to be
babel

