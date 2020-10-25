---
title: Get Public Key Token for an Assembly
author: DuFeu
type: post
date: 2012-09-20T18:55:53+00:00
url: /blog/get-public-key-token-for-an-assembly/
categories:
  - .NET
---

This is going to be a quick post as I&#8217;m hoping that posting about it will help me remember. At worse, I should be able to remember I posted about it and find this page.

There are numerous times when you need to need to reference an assembly using the fully qualified name, e.g.:

<p style="text-align: center;">
  MyNamespace.MyAssembly, version=1.0.3300.0, Culture=neutral, PublicKeyToken=b77a5c561934e089
</p>

<p style="text-align: left;">
  Jeremiah Clark has a <a title="Visual Studio Tip" href="http://blogs.msdn.com/b/miah/archive/2008/02/19/visual-studio-tip-get-public-key-token-for-a-stong-named-assembly.aspx" target="_blank">Visual Studio Tip</a> on how to find this for your own assembly but today I needed to find the reference for an assembly deployed in the GAC. A colleague pointed out you can simply browse to c:\windows\assembly using Explorer:
</p>

![Viewing Assemblies](../../../images/2012/09/assembly.png "Viewing Assemblies")
