# Angular from scratch

Eduardo Mosqueda (bbaaxx (arroba) gmail.com)

This repository is a history of my attempt to build a single page application 
using angular js and starting from zero following some popular best practices 
fond on the internet at the present (this project was started on October 2015).

Is a notebook/tutorial/reference kind of thing to help me learn the basics of
modern build systems, common angular patterns and best practices.

*DISCLAIMER:* I'm a complete newbie with Angular so as a suggestion from an 
amazing developer and my Angular mentor I will take John Papa's Style Guide 
and his amazing hottowel template and once I have something similar working
I will take it from there.

## First Steps I - Seting up basic tools and reference project

I am using Cloud9 Editor for this to be publicly available as reference
and because is very cool. I really like linux.

First let's make sure we have `git` and `nvm` installed, with this I can install 
NodeJs, I will be using the latest stable version bfore 4.0 which at this 
time is 0.12.7 :

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

