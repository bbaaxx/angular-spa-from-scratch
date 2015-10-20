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