---
title: Install dotnet global tool with private NuGet feed
author: DuFeu
type: post
date: 2020-06-30T12:00:00+00:00
url: /blog/install-dotnet-global-tool-with-private-nuget-feed/
categories:
  - .NET
excerpt: <p>If you have a private NuGet feed and are getting a 401 Unauthorised while trying to install a .NET Global Tool, you're not alone.</p><p>Thankfully there's an easier way to solve it than removing your feed each time.</p>
---

In my previous post, [Docker build with private NuGet feed in Azure artifacts](/blog/docker-build-with-private-nuget-feed-in-azure-artifacts), I hit a problem with `docker build` because I had a private NuGet feed. I was getting another 401 Unauthorised, but this time when trying to install a .NET global tool:

```powershell
PS C:\repos\> dotnet tool install -g try-convert
C:\Program Files\dotnet\sdk\3.1.301\NuGet.targets(128,5): error : Failed to retrieve information about 'try-convert' from remote source 'https://anon.pkgs.visualstudio.com/_packaging/d003748e-3a85-4636-976d-52ce64121599/nuget/v3/flat2/try-convert/index.json'. [C:\anon\restore.csproj]
C:\Program Files\dotnet\sdk\3.1.301\NuGet.targets(128,5): error :   Response status code does not indicate success: 401 (Unauthorized). [C:\anon\restore.csproj]
The tool package could not be restored.
Tool 'try-convert' failed to install. This failure may have been caused by:

* You are attempting to install a preview release and did not use the --version option to specify the version.
* A package by this name was found, but it was not a .NET Core tool.
* The required NuGet feed cannot be accessed, perhaps because of an Internet connection problem.
* You mistyped the name of the tool.

For more reasons, including package naming enforcement, visit https://aka.ms/failure-installing-tool
```

## Solution 1 - remove private feed

My immediate thought was to remove or disable the private feed from within Visual Studio Tools -> NuGet Package Manager -> Package Manager Settings as I don't install a lot of global tools.

But that's going to get old fast.

## Solution 2 - `--ignore-failed-sources`

After a bit of searching I finally found the answer halfway down <https://github.com/dotnet/sdk/issues/9555>.

There is a command line parameter, `--ignore-failed-sources`, that's exactly what we want. I added that, still got the 401 error, but it was ignored, so the tool installed fine.
