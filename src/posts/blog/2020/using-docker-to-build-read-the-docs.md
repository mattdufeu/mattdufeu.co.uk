---
title: Using docker to build Read the Docs
author: DuFeu
type: post
date: 2020-09-29T12:00:00+00:00
url: /blog/using-docker-to-build-read-the-docs
categories:
  - Docker
excerpt: <p>I started working on a old side-project that was using an out-of-date version of IdentityServer (2.0.0). Rather than jump two major versions, I decided to go slowly, use this as a learning exercise, and go to the highest major version I could find (2.5.4).</p><p>Unfortunately the online docs didn't have 2.5.4, so I decided to build them myself. As always, I didn't want to install a lot of stuff that would be used just once. Another perfect scenario for docker.</p>
---

## The Problem

<Alert>THIS IS AN ALERT</Alert>

An old side-project was using an out-of-date version of IdentityServer4 (2.0.0). The project was mainly a learning project, so before jumping to the latest, I wanted to see what changed between 2.0.0 and 2.5.4.

Unfortunately, the documentation at <https://identityserver4.readthedocs.io/> didn't have anything from the version 2 days. So I decided to build them myself in docker.

## Building the docs in docker

IdentityServer uses "Read the Docs", which is built with [Sphinx document generator](https://www.sphinx-doc.org/en/master/). To make things slightly simpler, there are already [Sphinx docker images up on docker Hub](https://hub.docker.com/r/sphinxdoc/sphinx). Even better, they include instructions on how to mount a volume and perform a build. So I tried it.

First things first, cloning the repo and checkout out the version I wanted to build:

```powershell
git clone https://github.com/IdentityServer/IdentityServer4.git
cd IdentityServer4
git checkout tags/2.5.4 -b tag_2_5_4
```

## Missing dependencies

Taking the command directly from docker hub I hit a snag:

```powershell{17}
 docker run --rm -v C:\Play\Repos\IdentityServer4\docs:/docs sphinxdoc/sphinx make html

 Running Sphinx v3.2.1

Configuration error:
There is a programmable error in your configuration file:

Traceback (most recent call last):
  File "/usr/local/lib/python3.8/site-packages/sphinx/config.py", line 319, in eval_config_file
    execfile_(filename, namespace)
  File "/usr/local/lib/python3.8/site-packages/sphinx/util/pycompat.py", line 89, in execfile_
    exec(code, _globals)
  File "/docs/conf.py", line 139, in <module>
    import sphinx_rtd_theme
ModuleNotFoundError: No module named 'sphinx_rtd_theme'
make: *** [Makefile:53: html] Error 2
```

As you can see from the highlighted line above, the image was missing a module needed. That type of thing must happen a lot, as the docker hub site includes a "tips" section on how to build your own image.

## Building your own image

Following the tip, I created a Dockerfile with the following contents:

```yaml
FROM sphinxdoc/sphinx

WORKDIR /docs
RUN pip install sphinx_rtd_theme
```

Built my image:

```powershell
docker build -t "sphinxdocs" .
```

And ran the same command, but this time with my image:

```
docker run --rm -v C:\Play\Repos\IdentityServer4\docs:/docs sphinxdocs make html
```

## Success

I won't include all the output as it's long, but once that's finished, you should have a `_build\html\index.html` file in the `docs` directory containing the IdentityServer documentation as per 2.5.4.
