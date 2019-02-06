---
title: Add Grunt and ESLint to a MVC Project
author: DuFeu
type: post
date: 2015-03-18T19:32:31+00:00
url: /blog/add-grunt-and-eslint-to-a-mvc-project/
categories:
  - JavaScript
redirect_from:
  - /add-grunt-and-eslint-to-a-mvc-project/
---

This is part two of getting started with ESLint using Grunt where I will show you how to configure ESLint to analyse a MVC .NET Project. In [part one][1] I set-up our environment with node.js, Grunt-cli and finally Grunt for our project, but you couldn&#8217;t do much with it.

In this post, I&#8217;ll install ESLint, disable all the default ESLint rules, enable one specific some rule and exclude some files from analysis.
![Add Grunt and ESLint to a MVC Project](../../images/2015/01/ESLint.png "Add Grunt and ESLint to a MVC Project")

To recap, I have a new ASP.NET MVC project in c:\myproject\WebApplication1 that also contains a **package.json** and **Gruntfile.js**:

```powershell
C:\myproject\WebApplication1> dir -name
node_modules
packages
WebApplication1
Gruntfile.js
package.json
WebApplication1.sln
C:\myproject\WebApplication1>
```

Let&#8217;s get started.

## Step 1 &#8211; Install ESLint and Grunt-ESLint

Like last time, npm makes installing things trivial. First, install ESLint:

```bash
npm install --save-dev eslint

```

Once that&#8217;s completed, install the ESLint grunt integration:

```bash
npm install --save-dev grunt-eslint

```

And finally install load-grunt-tasks, which saves a bit of typing in a minute:

```bash
npm install --save-dev load-grunt-tasks

```

## Step 2 &#8211; Configure ESLint

### eslint.json

To make our lives easier to change the configuration of ESLint, we&#8217;re going to use an **eslint.json** file. As you can probably tell from the name, it&#8217;s a text file containing some json that ESLint parses. The [ESLint documentation][3] is pretty good at explaining what all the options are, so I won&#8217;t do that here, but for now just create one containing the following:

```javascript
{
    "env": {
        "browser": true,
    },
	"globals": {
        "$": true,
    },
	"rules": {
        no-undef: 1,
    }
}
```

This ensures the browser and jQuery (\$) variables are recognised by ESLint so they don&#8217;t throw false positive. It also enables a single rule &#8220;**no-undef** &#8211; disallow use of undeclared variables unless mentioned in a /\*global \*/ block&#8221;.

As you will see in a minute, I personally like to disable \*\*all \*\* the rules, only enabling the ones I explicitly want to use. That&#8217;s personal preference, as on legacy systems you can end up with a lot of issues to address which can seem overwhelming.

### .eslintignore

The next file that we need to create is **.eslintignore**. As the name suggests, this is an easy way of telling ESLint to ignore certain files and directories. Again I refer you to the documentation for more details, but for now, create an .eslintignore file containing:

```bash
# ignore everything in the packages folders
**/packages

# ignore everything in Scripts except files beginning with "myapp"
**/Scripts
!**/Scripts/myapp*
```

This tells ESLint to ignore all files inside the _packages_ directory, i.e. anything you&#8217;ve got from nuget. The last two lines ensures all files except those following your applications naming convention &#8211; you have a naming convention right? &#8211; are also ignored, i.e. jquery.<ver>.min.js etc.

Finally, all that&#8217;s left is to configure Grunt to run ESLint.

## Step 3 &#8211; Configure Grunt to use ESLint

Before explaining the syntax, please edit your **Gruntfile.js** file to contain:

```javascript
module.exports = function(grunt) {
	# section 1 - require modules
	require('load-grunt-tasks')(grunt);

	# section 2 - configure grunt
	grunt.initConfig({
		eslint: {
			options: {
				config: 'eslint.json',
				reset: true
			},
			target: ['WebApplication1/**/*.js']
		}
	});

	# section 3 - register grunt tasks
	grunt.registerTask('default', ['eslint']);

};
```

The more you play with Grunt the more familiar this will be, but it&#8217;s basically made up of 3 sections. Section one lists any requirements (&#8220;require&#8221; calls), section 2 is where you initialize Grunt and section 3 where you register tasks.

In this instance, I&#8217;m configuring a single &#8220;target&#8221; called &#8220;eslint&#8221; and telling it to use the eslint.json file, turn off all the rules (reset: true) and to search for all JavaScript files inside the &#8220;target&#8221;.

Finally I register the &#8220;eslint&#8221; target to be the default task. This simply means I can execute &#8220;grunt&#8221; instead of &#8220;grunt eslint&#8221;.

Which if I do that, I get:

```powershell
C:\myproject\WebApplication1&gt; grunt
Running "eslint:target" (eslint) task

WebApplication1/Scripts/_references.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/bootstrap.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/bootstrap.min.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/jquery-1.10.2.intellisense.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/jquery-1.10.2.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/jquery-1.10.2.min.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/jquery.validate-vsdoc.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/jquery.validate.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/jquery.validate.min.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/jquery.validate.unobtrusive.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/jquery.validate.unobtrusive.min.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/modernizr-2.6.2.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/respond.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

WebApplication1/Scripts/respond.min.js
  0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override

? 14 problems (0 errors, 14 warnings)

And that's it! ESLint is now analysing the JavaScript files in my MVC project.
```

## Step 4 &#8211; Next Steps

If you&#8217;ve got this far, you&#8217;re set to go. You will definitely want to edit the [rules][4] you&#8217;re using, but I&#8217;ll leave that up to you.

Please leave a comment below or catch me on [twitter][5] if you&#8217;re having any problems.

[1]: http://localhost:8000/empty/getting-started-with-eslint-using-grunt/
[2]: ../../images/2015/01/ESLint.png
[3]: http://eslint.org/docs/configuring/
[4]: http://eslint.org/docs/rules/
[5]: https://www.twitter.com/mattdufeu
