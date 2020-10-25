---
title: Docker - the user has not been granted the requested logon type at this computer.
author: DuFeu
type: post
date: 2020-07-16T12:00:00+00:00
url: /blog/docker-user-not-granted-requested-logon-type/
categories:
  - Docker
excerpt: <p>Sometimes when I start working with docker for the day, I get a "Logon failure:the user has not been granted the requested logon type at this computer." error.</p><p>I haven't been able to reliably reproduce this issue, so I don't really know the cause. Thankfully a reboot generally fixed it, but there's also a quicker way.</p>
---

It's quite frustrating to sit down for the day, and something that worked the day before no longer works. I was hitting the following problem with `docker build`:

```powershell
---> Running in 143123d54e5b
hcsshim::CreateComputeSystem 143123d54e5b8c3b028bfad97141a2b1afc6ffa04889a4213f62b2d0daa9f91c: Logon failure: the user has not been granted the requested logon type at this computer.
```

A reboot seemed to solve it, but I think that was more luck than judgement. Thankfully I found a better answer in <https://github.com/docker/for-win/issues/1056#issuecomment-401810678>, namely, restarting the "Hyper-V Virtual Machine Management" service.
