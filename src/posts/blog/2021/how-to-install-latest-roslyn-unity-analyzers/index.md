---
title: How to install latest roslyn unity analyzers
author: DuFeu
type: post
date: 2021-03-22T12:00:00+00:00
url: /blog/how-to-install-latest-roslyn-unity-analyzers/
tags:
  - Unity
description: How to install the latest roslyn unity analyzers before they are available as an upgrade within Visual Studio.
featuredImage: "./unit_logo.png"
keywords:
  - Unity
  - Analyzers
  - Analysers
  - Roslyn
excerpt: <p>The newest version of the roslyn unity analyzers are released before they appear as an upgrade within Visual Studio and adding them manually is a lot harder than I thought. NuGet doesn't seem to work. I also tried unpacking the NuGet file and editing the .csproj file directly. But the .csproj file is recreated each time you open Visual Studio, losing those changes. Thankfully there's a supported way.</p><p>In this post I show how to install the latest Roslyn Unity Analyzers into your unity project.</p>
---

The newest version of the roslyn unity analyzers are released before they appear as an upgrade within Visual Studio and adding them manually is a lot harder than I thought. NuGet doesn't seem to work. I also tried unpacking the NuGet file and editing the .csproj file directly. But the .csproj file is recreated each time you open Visual Studio, losing those changes. Thankfully there's a supported way.

In this post I show how to install the latest Roslyn Unity Analyzers into your unity project.

## Why use Roslyn analyzers?

Rosylyn analyzers are a great feature of modern .NET development. I think of them as a safety net that catches me writing low quality code before I've even submitted it for review. Analyzers catch errors in style, maintainability, performances among others. As with most things .NET they are open source on github <https://github.com/dotnet/roslyn-analyzers> and definitely worth checking out.

## Problem - Missing analyzers

I read <https://devblogs.microsoft.com/visualstudio/guest-post-better-refactoring-for-unity-projects-using-net-analyzers/> which mentions a Roslyn analyzer designed to catch:

```csharp
transform.position = newPosition;
transform.rotation = newRotation;
```

And suggest more performant code:

```csharp
transform.SetPositionAndRotation(newPostition, newRotatation);
```

Coincidentally, the previous day I had wrote the former and didn't receive a warning about it. So I did some digging to figure out why not.

Turns out, the version of Microsoft Visual Studio Tools for Unity includes analyzers that slightly lags behind the latest release. So even though I had the latest version of Visual Studio installed, 16.9.2 at the time of writing, I was missing analyzers 19 through to 23 from the latest release.

## Failed solution - manually updating the analyzers

I initially turned to NuGet package manager to install the latest version, but that seemed to have no effect.

I then tried removing the existing analyzers, by right-clicking on them in Visual Studio, and adding the new ones after extracting the dll from the NuGet package:

![Remove existing analyzer](./Remove_Analyzer.png#width=500px;margin=auto)

That worked, but something about opening a script from Unity causes the .csproj file to be re-created. Undo-ing all my hard work.

Turns out there is an official way of doing it involving an [AssetPostprocessor](https://docs.unity3d.com/ScriptReference/AssetPostprocessor.html) in a special "Editor" folder.

## Installing the lastest Unity Analyzers

To install the lastest Roslyn Unity Analyzers into your project, do the following:

1. Download the latest NuGet file from [nuget.org](https://www.nuget.org/packages/Microsoft.Unity.Analyzers)
1. Unpack the nuget file with something like 7zip (you can change the extension from .nupkg to .zip if you don't have 7zip)
1. Copy the dll from `analyzers\dotnet\cs\Microsoft.Unity.Analyzers.dll` to somewhere in your project (I put it in the root folder alongside the solution file)
1. Create a new folder in `Assets` called `Editor`
1. In the `Editor` folder, create a new class called `AnalyzerPostProcessor.cs` (or whatever name you like)
1. Add the following code in this new class. Update line 10 to point to the location you chose in step 3 above:

```csharp{numberLines: true}{10}
using UnityEditor;
using System.Text.RegularExpressions;

public class AnalyzerPostProcessor : AssetPostprocessor
{
    public static string OnGeneratedCSProject(string path, string content)
    {
        return content.Replace(
            @"C:\Program Files (x86)\Microsoft Visual Studio Tools for Unity\16.0\Analyzers\Microsoft.Unity.Analyzers.dll",
            @".\Microsoft.Unity.Analyzers.dll");
    }
}
```

Now when you open a script from within Unity, you should see the latest analyzers.

## Conclusion, thanks and an alternative

Hopefully this helps, but please feel free to leave a comment below if you have any questions.

Huge thank you to [Sebastien Lebreton (sailro)](https://github.com/sailro) for answering my question so quickly <https://github.com/microsoft/Microsoft.Unity.Analyzers/issues/156>.

Alternatively, if this seems like a lot of effort, you could just wait for the newer versions to be included with Visual Studio. As mentioned in the issue I filed, they are due to be added in version 16.10 of Visual Studio. If the [previous releases of visual studio](https://docs.microsoft.com/en-us/visualstudio/install/visual-studio-build-numbers-and-release-dates?view=vs-2019) are anything to go by, it's about 6 months from "preview 1" to full release and preview 1 of 16.10 went out on March 2nd.
