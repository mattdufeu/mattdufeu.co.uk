---
title: How to split git repo and keep history of multiple projects
author: DuFeu
type: post
date: 2021-01-20T12:00:00+00:00
url: /blog/how-to-split-git-repo-while-keeping-history-of-multiple-projects/
categories:
  - .NET
description: Here's how I split a off multiple projects from a large solution into a new git repository and kept the history.
featuredImage: "../../../images/2021/git-filter-repo-fi.png"
keywords:
  - git
  - .NET
  - microservice
  - Breaking apart a monolith
  - Splitting apart a monolith
  - Split git repo
  - Split repo keep history
excerpt: <p>Like them or loathe them, microservices are still all the rage. I'm seeing more and more companies go down this route. In particular, a common start to the journey into microservices is breaking up an existing monolith.</p><p>In this post, I'll show how you can split off several pieces of a large repository into a single, smaller repo while maintaining the git history. I'll be using AutoMapper as an example, but the same steps should apply if you need to split several project from a larger solution and keep the history.</p>
---

![How to split git repo and keep history of multiple projects](../../../images/2021/git-filter-repo-fi.png#width=400px;margin=auto)

Like them or loathe them, microservices are still all the rage. I'm seeing more and more companies go down this route. In particular, a common start to the journey into microservices is breaking up an existing monolith.

In this post, I'll show how you can split off several pieces of a large repository into a single, smaller repo while maintaining the git history. I'll be using AutoMapper as an example, but the same steps should apply if you need to split several project from a larger solution and keep the history.

At the end of this process you should have:

- A new repository containing all the files, projects, test etc that you want to spliut
- Full git history of the split off code
- Any branches and tags you want to keep

## Background Info

The tool we're going to use, [git filter-repo](https://github.com/newren/git-filter-repo), works by playing back every commit from the old repo into a new repo, keeping only the bits you tell it to. We're going to do this "filtering" on a "path" basis, i.e. if the commit contained a file that was changed in a path we're interested in, keep it, otherwise ignore it.

To demonstrate this, without using an overly contrived example, let's use the [AutoMapper](https://github.com/AutoMapper/AutoMapper) repo. At the time of writing, the top level directory contains a number of files and folders called "docs", "lib" and "src". Inside src there are more folders called "AutoMapper", "BenchMark", "IntegrationTests" and "UnitTests":

![AutoMapper top level folder structure](../../../images/2021/AutoMapperFolderStructure.jpg#width=250px;margin=auto)

We're going to pretend that we want to split off a new repo containing ".editorconfig", ".readthedocs.yml", "docs" and everything in "src/Benchmark". Totally meaningless and non-functioning, but it's something you can do as you read along and demonstrates the technique.

## Step 0 - Install git-filter-repo

First we need to install [git filter-repo](https://github.com/newren/git-filter-repo). I found the installation instructions a little difficult to follow as I don't use Scoop (a package manager on Windows I'd never heard of), so if you're struggle, I did the following:

1. Install Python via chocolatey - I think you can uses the Windows Store too
1. Clone git filter-repo
1. Update the first line of git-filter-repo so it's "python" instead of "python3"
1. Run `cp git-filter-repo $(git --exec-path)`

## Step 1 - Identify the files/folders to keep

In our scenario, I've already decided what we want to keep in the new repo. If you're doing this for a real project, it's a little harder. I think there are two choices:

- Option 1 - Start a new solution, copy across the "runnable" project you want and see if it runs. If it doesn't, add the missing projects it mentions and try again. Repeat this till it's does.
- Option 2 - Copy the current solution and delete projects until it breaks

Once that's done, it's probably a good idea to run all your tests to make sure everything has come across.

Once you're happy the new solution works, you need to create a new text file, say "files-to-keep.txt" containing a file/folder one per line of what's left. In our scenario we would have:

```
.editorconfig
.readthedocs.yml
docs
src/Benchmark
```

## Step 2 - Creating the new repo

If you're on windows, do all the following commands in "git bash" which should've been installed with git.

### 1. Clone the original repo

For various safety reasons, git filter-repo must be run on a fresh clone. You'll likely be repeating these steps many times, so I also took a zip of the freshly cloned repo to speed up the repeat process (especially if you have poor download speeds).

### 2. Analyse the repo

It's a good idea to "analyse" the repo as there might be some gotchas. So run `git filter-repo --analyze`.

**Pay attention to any warnings in the output**. For example, I got the following warning:

```
$ git filter-repo --analyze
Processed 59324 blob sizes
Processed 1908 commitswarning: inexact rename detection was skipped due to too many files.
warning: you may want to set your diff.renameLimit variable to at least 476 and retry the command.
Processed 2089 commits
Writing reports to .git\filter-repo\analysis...done.
```

Which can be solved by running `git config diff.renameLimit 476`.

Keep repeating the analyze command and resolving them until there are no more warnings.

### 3. Perform the filter

Finally, run the following command to perform the actual filter:

```
git filter-repo --paths-from-file <path_to_file_from_previous_step>
```

You now have a new fresh repo with just the files/folders we want to keep with the history intact. Try checking the logs with something like `git log --pretty=oneline --abbrev-commit` and confirm it's worked.

## Step 3 - Creating and Testing new solution file

So far so good, but we need to confirm what we've copied across works. To do this, we need to create a new solution file, add all the projects to it and confirm it runs.

Depending on the number of projects you moved across, you might want to script this task. I used:

- echo "dotnet new sln" > add_to_solution.sh
- find . -name "\*.csproj" -exec echo "dotnet sln add {}" \\; >> add_to_solution.sh
- ./add_to_solution.sh

Note: The solution file created will take the name of the folder, so rename it if need be.

Open the solution in Visual Studio and confirm it builds, runs and all the tests pass. (We can't do that in this example)

Be warned, I had this step fail several times because I missed something while constructing the list of files/folders I was interested in. Hopefully you've had better luck.

## (Optional) Step 4 - Clearing out unwanted git refs

One issue you might have, is that the tool creates _all_ the current branches, tags, refs etc including "replace" refs. To see what you have run `git show-ref`.

I didn't want _all_ of mine, but thankfully it's possible to automate the removal by running:

- `git show-ref | grep -v '\/tags\|\/dev\|\/release' | sed -e s/[0-9a-f]*/delete/ > show-ref-delete-commands.txt` - This will delete all branches and replace refs that are not tags, dev, release/\*. You might want to compare this file with the output of `git show-ref` to be absolutely sure
- `cat show-ref-delete-commands.txt | git update-ref --stdin`

You should now have a working new solution with only the branches and tags you're interested in. All that's left is pushing to a new origin.

## Step 5 - Push to a new origin

I was using Azure DevOps, so when I created a new repoit contained instructions on how to push an existing repo. Hopefully yours does too, but if not, it's something like:

```
git remote add origin "new_origin"
git push -u origin --all
```

That should push the tags too, but if not, `git push --tags` will.

## Final step - Test a fresh clone

Take a fresh clone of this repo and retest. You should now have a new repo, with the history intact, of the piece of the monolith split off.

If you don't, you will hopefully be able to "fall forward" by starting again at step 1 and adding more files.
