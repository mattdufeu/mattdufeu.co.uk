---
title: Docker build with private NuGet feed in Azure Artifacts
author: DuFeu
type: post
date: 2020-06-23T12:00:00+00:00
url: /blog/docker-build-with-private-nuget-feed-in-azure-artifacts/
categories:
  - .NET
  - Docker
description: In this post I describe how to do a NuGet restore from a private nuget feed within a docker container.
keywords:
  - NuGet restore
  - Private NuGet feed
  - Docker
  - .NET
excerpt: <p>While trying to containerise a .NET Framework app I hit a problem while trying to restore packages from NuGet that were from a private NuGet feed. The container didn't know my credentials, so the feed was rightly responding with "401 (Unauthorized)".</p><p>Here's how I used <a href="https://github.com/Microsoft/artifacts-credprovider">Azure Artifacts Credential Provider</a> with Windows Containers to solve it.</p>
---

While trying to containerise a .NET Framework app I hit a problem while restoring packages from NuGet as they were from a private NuGet feed. The container didn't know my credentials, so the feed was rightly responding with "401 (Unauthorized)".

```powershell
Step 8/17 : RUN dotnet restore "Consumer/Consumer.csproj"
 ---> Running in f5dcc2dd51c3
  Determining projects to restore...
/usr/share/dotnet/sdk/3.1.301/NuGet.targets(128,5): warning : The plugin credential provider could not acquire credentials. Authentication may require manual action. Consider re-running the command with --interactive for `dotnet`, /p:NuGetInteractive="true" for MSBuild or removing the -NonInteractive switch for `NuGet` [/src/Consumer/Consumer.csproj]
/usr/share/dotnet/sdk/3.1.301/NuGet.targets(128,5): error : Unable to load the service index for source https://pkgs.dev.azure.com/anon/GeneralPlayground/_packaging/docker/nuget/v3/index.json. [/src/Consumer/Consumer.csproj]
/usr/share/dotnet/sdk/3.1.301/NuGet.targets(128,5): error :   Response status code does not indicate success: 401 (Unauthorized). [/src/Consumer/Consumer.csproj]
Removing intermediate container f5dcc2dd51c3
The command '/bin/sh -c dotnet restore "Consumer/Consumer.csproj"' returned a non-zero code: 1
```

## How to securely specify credentials?

If this was a personal project I would put my credentials in the Dockerfile or in the [packageSourceCredentials section of a Nuget.config file](https://github.com/NuGet/docs.microsoft.com-nuget/blob/master/docs/reference/nuget-config-file.md#packagesourcecredentials) and got on with my day.

However, I needed a solution that was scalable for more than 1 developer. That wasn't a pain to use but also secure. I didn't want:

1. Each team member updating the Dockerfile with their own credentials
2. Anyone accidentally checking in their password to git

## Solution

[Azure Artifacts Credential Provider](https://github.com/Microsoft/artifacts-credprovider) provides an elegant solution which uses [Docker arguments](https://docs.docker.com/engine/reference/builder/#arg) and [Azure Personal Access Tokens](https://docs.docker.com/engine/reference/builder/#arg).

If you're using Linux containers the [Sample Dockerfile](https://github.com/microsoft/artifacts-credprovider#docker-containers) works fine. Unfortunately I was targetting .NET Framework and using Windows containers. They have no idea what bash is:

```powershell
Step 3/15 : RUN wget -qO- https://raw.githubusercontent.com/Microsoft/artifacts-credprovider/master/helpers/installcredprovider.sh | bash
 ---> Running in 71a0b7a249d7
bash : The term 'bash' is not recognized as the name of a cmdlet, function,
script file, or operable program.
```

## Azure Artifacts Credential Provider with Windows Containers

Thankfully there's a PowerShell script as well, so I stole the PowerShell one liner from <https://chocolatey.org/install> and replaced:

```powershell
# Get and install the Artifact Credential provider
RUN wget -O - https://raw.githubusercontent.com/Microsoft/artifacts-credprovider/master/helpers/installcredprovider.sh  | bash
```

with

```powershell
# Get and install the Artifact Credential provider
RUN Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/microsoft/artifacts-credprovider/master/helpers/installcredprovider.ps1'))
```

## Conclusion

By using [Azure Artifacts Credential Provider](https://github.com/Microsoft/artifacts-credprovider) I'm able to create a container for my .NET Framework app without running the risk of leaking anyone's credentials because any developer specific data can be passed in via the command line.

## The remote name could not be resolved: 'raw.githubusercontent.com'

Update: On one of my machines I got an extra error:

```powershell
Step 6/18 : RUN Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/microsoft/artifacts-credprovider/master/helpers/installcredprovider.ps1'))
 ---> Running in b23e524f5cbf
Exception calling "DownloadString" with "1" argument(s): "The remote name
could not be resolved: 'raw.githubusercontent.com'"
At line:1 char:241
+ ...  -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('ht ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [], ParentContainsErrorRecordE
   xception
    + FullyQualifiedErrorId : WebException
```

Which is solved by adding `--network "Default Switch"` to the `docker build` command.
