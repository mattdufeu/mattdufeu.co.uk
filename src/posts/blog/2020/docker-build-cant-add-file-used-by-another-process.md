---
title: Docker build "Can't add file used by another process"
author: DuFeu
type: post
date: 2020-07-07T12:00:00+00:00
url: /blog/docker-build-cant-add-file-used-by-another-process
tags:
  - Docker
categories:
  - .NET
  - Docker
excerpt: <p>My recent attempt to put an older .NET Framework app inside a container also hit another snag. Embarassingly for me, if I'd read the actual error it would've been a quick fix. Unfortunately I got caught up with a previous docker vs anti-virus issue and went down a rabbit hole I hope others can avoid.</p><p>In my case it was Visual Studio locking a ".dbml" file of a database project. If you get a error with "can't add file...The process cannot access the file because it us being used by another process", save yourself sometime and read the first part of the error.</p>
---

## Problem - Docker build fails to setup the context

One of the first things `docker build` does is setup the "Context". I'm sure it's more complex than this, but it seems to copy all the non-ignored files to somewhere for later use.

I hit the following problem however:

```powershell
time="2020-06-16T14:14:41+01:00" level=error msg="Can't add file \\\\?\\C:\\repos\\TestBed\\Data\\Database.dbmdl to tar: open \\\\?\\C:\\repos\\TestBed\\Data\\Database.dbmdl: The process cannot access the file because it is being used by another process."
...
<1 line per file in the folder>
...
ERROR: Error processing tar file(exit status 1): unexpected EOF
```

## Solution - .dockerignore dbml files

After a lot of dead ends, I ended up finding <https://stackoverflow.com/questions/48529766/docker-image-unable-to-build-when-solution-is-open-in-visual-studio-2017>. I'm going to forgive myself though, as that question even points out how overwhelming the error message is.

    It first glance, the error message listed as a result of this is not easy to interpret, it lists all the files within the solution as having issues, when in reality the first problem it encounters causes a splurge of errors.

Like a lot of things in technology, simple when you know how.
