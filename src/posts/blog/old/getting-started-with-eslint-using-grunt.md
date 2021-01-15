---
title: Getting Started with ESLint using Grunt
author: DuFeu
type: post
date: 2015-03-11T18:31:54+00:00
url: /blog/getting-started-with-eslint-using-grunt/
categories:
  - JavaScript
---

![Getting Started with ESLint using Grunt](../../../images/2015/01/ESLint.png "Getting Started with ESLint using Grunt")

I recently had the chance to add [ESLint][2] to our workflow. I considered using it standalone, but as [Grunt is becoming a first class citizen in Visual Studio 2015][3], I wanted to get more familiar with it now.

This is the first of a two part guide to getting started with ESLint using grunt. I&#8217;ll also help you understand how to enable other ESLint rules as well as include/exclude files from analysis. I&#8217;m going assume you have little to no experience of node.js, Grunt or ESLint and are running windows. In this post I&#8217;ll cover the setting up of your environment and next time we&#8217;ll go about installing and configuring ESLint to work on a ASP.NET MVC project. This guide could also be used to add ESLint any project that contains JavaScript or even a different operating system, but I haven&#8217;t tested that, so won&#8217;t make any promises.

Once we&#8217;ve finished, you should be able to type &#8220;grunt&#8221; from a command prompt and ESLint will analyse your JavaScript, so let&#8217;s get started.

### Step 1 &#8211; Install Node.js

Installing Node.js, which includes npm (node package manager &#8211; think nuget for node), is as simple as going to the [Node.js homepage][4], clicking the &#8220;Install&#8221; button and executing the .msi file that downloads.

Once the install has finished, open a command prompt and type &#8220;npm&#8221;. If you&#8217;re presented something like this, you&#8217;re good to go. If you have any problems, let me know in the comments.

```csharp
Usage: npm <command>

where <command> is one of:
    add-user, adduser, apihelp, author, bin, bugs, c, cache,
    completion, config, ddp, dedupe, deprecate, docs, edit,
    explore, faq, find, find-dupes, get, help, help-search,
    home, i, info, init, install, isntall, issues, la, link,
    list, ll, ln, login, ls, outdated, owner, pack, prefix,
    prune, publish, r, rb, rebuild, remove, repo, restart, rm,
    root, run-script, s, se, search, set, show, shrinkwrap,
    star, stars, start, stop, submodule, t, tag, test, tst, un,
    uninstall, unlink, unpublish, unstar, up, update, v,
    version, view, whoami

npm <cmd> -h     quick help on <cmd>
npm -l           display full usage info
npm faq          commonly asked questions
npm help <term>  search for help on <term>
npm help npm     involved overview

Specify configs in the ini-formatted file:
    C:\Users\Matthew\.npmrc
or on the command line via: npm <command> --key value
Config info can be viewed via: npm help config
```

### Step 2 &#8211; Install the Grunt Command Line tools (grunt-cli) globally

![Getting Started with ESLint using Grunt](../../../images/2015/01/grunt.png "Getting Started with ESLint using Grunt")

The next step is to install the Grunt Command Line tools globally using npm. Thankfully that&#8217;s as simple as typing the following in a command prompt:

```bash
npm install -g grunt-cli
```

### Step 3 &#8211; Prepare your project for Grunt

For grunt to run on our project, you need a &#8220;package.json&#8221; file and a &#8220;gruntfile.js&#8221; file.

### package.json

You could create this file by hand, but npm can talk you through the process, so in the root of your project type:

```powershell
PS C:\myproject> npm init
```

You will get asked a series of questions, which if you don&#8217;t know the answer to, just hit enter to skip it. The file is editable, so can be changed later if need be. Depending on what you answer, you&#8217;ll end up with a package.json file containing:

```javascript
{
  "name": "npminit",
  "version": "1.0.0",
  "description": "Description",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "author": "Matt Dufeu",
  "license": "ISC"
}
```

This file will also be automatically updated by npm when we start installing other packages, as we&#8217;ll see in step 4.

### Gruntfile.js

Gruntfile.js is similar to a makefile (showing my age) and is used by grunt to see what to do when you issue grunt commands. To get started, create a file that contains:

```javascript
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json")
  });
};
```

Don&#8217;t worry about what this means at the moment, we&#8217;ll be modifying this later.

### Step 4 &#8211; Install Grunt locally

The final setup step is to install Grunt locally. Again, npm comes to the rescue, but this time we specify &#8220;&#8211;save-dev&#8221;.

```powershell
PS C:\myproject> npm install grunt --save-dev
```

This will do two things; firstly, it will create a folder called &#8220;node*modules&#8221; to your project. This is basically the folder npm stores all the packages for \_this* project, so think of it as a libraries folder.

Secondly, it will install Grunt as a dependency to your project. Take a look at your Gruntfile.js now and you will see a new section like this:

```javascript
...
"devDependencies": {
  "grunt": "^0.4.5"
}
....
```

&#8220;devDependencies&#8221; simply lists the packages the project is dependent upon and their version number. It gives you the option of moving the project to a different location _without_ the node_modules folder and typing &#8220;npm install&#8221; to get npm to download the required dependencies.

### Step 5 &#8211; Verify it&#8217;s working

To check that&#8217;s working as expected, simply execute grunt, and you should see the below. It&#8217;s basically saying &#8220;there&#8217;s nothing to do&#8221;, but at this stage that&#8217;s expected.

```powershell
PS C:\myproject> grunt
Warning: Task "default" not found. Use --force to continue.

Aborted due to warnings.
PS C:\myproject>
```

### Summary

We&#8217;ve installed node.js, npm, the Grunt command line tools and setup our project.json and Gruntfile.js files. We&#8217;re now ready to start adding ESLint to our project, so next time, I&#8217;ll be adding ESLint, showing you how to enable/disable ESLint rules and finally exclude certain files from analysis.

Please leave a comment below or catch me on [twitter][6] if you&#8217;re having any problems.

[Update: [part 2][7] is now available.]

[1]: ../../../images/2015/01/ESLint.png
[2]: http://eslint.org
[3]: http://www.asp.net/vnext/overview/aspnet-vnext/grunt-and-bower-in-visual-studio-2015
[4]: http://nodejs.org/
[5]: ../../../images/2015/01/grunt.png
[6]: https://www.twitter.com/mattdufeu
[7]: http://localhost:8000/empty/add-grunt-and-eslint-to-a-mvc-project/
