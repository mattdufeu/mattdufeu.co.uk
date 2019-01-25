---
title: Visual Studio Tip – Named Parameters in Generated Methods
author: DuFeu
type: post
date: 2015-10-22T18:30:48+00:00
url: /visual-studio-tip-named-parameters-in-generated-methods/
categories:
  - .NET
---

Really quick tip that I found recently while refactoring some old code.

If your using &#8220;Generate Method&#8221; (Ctrl + .) in Visual Studio, the method you&#8217;re generating uses the same names as the local variables for parameter names:

<div id="attachment_485" style="width: 690px" class="wp-caption aligncenter">
  <a href="../../images/2015/10/GenerateMethod1.png"><img src="../../images/2015/10/GenerateMethod1-1024x319.png" alt="Generate Method without Named Parameters" width="680" height="212" class="size-large wp-image-485" /></a>
  
  <p class="wp-caption-text">
    Generate Method without Named Parameters
  </p>
</div>

I don&#8217;t know about you, but I then have to spent more than a zero time tidying it up to be more meaningful. Thankfully named parameters can take care of that for you:

<div id="attachment_486" style="width: 690px" class="wp-caption aligncenter">
  <a href="../../images/2015/10/GenerateMethod2.png"><img src="../../images/2015/10/GenerateMethod2-1024x310.png" alt="Generate Method without Named Parameters" width="680" height="206" class="size-large wp-image-486" /></a>
  
  <p class="wp-caption-text">
    Generate Method without Named Parameters
  </p>
</div>

Seems to work for constructors and other refactors too.

Maybe it&#8217;s common knowledge, but it pleased me, so by putting it here I can remind myself in a couple <del datetime="2015-10-04T13:12:08+00:00">years </del>weeks time when I forget.
