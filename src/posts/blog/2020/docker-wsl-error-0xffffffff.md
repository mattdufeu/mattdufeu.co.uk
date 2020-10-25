---
title: Docker WSL 2 error 0xffffffff
author: DuFeu
type: post
date: 2020-08-22T12:00:00+00:00
url: /blog/docker-wsl-error-0xffffffff/
categories:
  - Docker
description: In this post I describe how I solved docker error 0xffffffff when lauching a WSL prompt.
excerpt: <p>Since upgrading Windows 10 to version 2004 and upgrading docker for Windows to use WSL 2 I've been getting a very unhelpful "error 0xffffffff" when launcing a bash prompt.</p><p>I'm sure it will get fixed at some point, but for the mean time it seems something is hogging port 53 and causing conflicts. Thankfully there's some PowerShell to fix it.</p>
---

The problem doesn't happen everytime, but when it does, launching a WSL bash prompt shows a 0xffffffff error:

![WSL bash prompt with error 0xffffffff](../../../images/2020/WSL-Port53.jpg "WSL bash prompt with error 0xffffffff")

Docker for Windows create a crash report dialog.

![Docker for Windows with error 0xffffffff](../../../images/2020/Docker-Port53.jpg "Docker for Windows with error 0xffffffff")

There's [an open issue in the github WSL repo](https://github.com/microsoft/WSL/issues/4364) so hopefully it'll be solved soon. In the mean time, both of them seem to be related to port 53 being used by another program. PowerShell to the rescue:

```powershell
Get-Process -Id (Get-NetUDPEndpoint -LocalPort 53).OwningProcess

C:\> Get-Process -Id (Get-NetUDPEndpoint -LocalPort 53).OwningProces

Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id     SI ProcessName
-------  ------    -----      -----     ------     --     -- -----------
      0       0       60          8                 7463   0 docker
      0       0       60          8                 8463   0 svchost
```

In my case I got two hits, so take a note of the Id and terminate both processes with:

```powershell
Stop-Process -Id <ID>
```

Once I had to add an `--force` onto the end of that command to make sure.

After that, I was now to restart Docker and WSL without any problems until the next reboot.
