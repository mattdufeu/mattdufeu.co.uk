---
title: Adding Staticman comments to Gatsby
author: DuFeu
type: post
date: 2021-02-28T12:00:00+00:00
url: /blog/adding-staticman-comments-to-a-gatsby-site/
tags:
  - Gatsby
description: I added staticman comments to this site and stumbled on a few things. Hopefully this can prevent me, or others, repeating my mistakes.
featuredImage: "../../../images/2021/staticman_post_header.png"
keywords:
  - Gatsby
  - Comments
  - Staticman
  - Adding comments to Gatsby
  - Adding comments to a static site
excerpt: <p>This site has been running on Gatsby for a little while now. Static sites bring all sorts of advantages with regards to speed, size etc, but they're not so great for dynamic content like comments.</p><p>Turns out there are lots of options when adding comments to Gatsby. I didn't want to spend any money, and I strongly resisted the urge to roll my own, so went for Staticman. Here's what I did.</p>
---

This site has been running on Gatsby for a little while now. Static sites bring all sorts of advantages with regards to speed, size etc, but they're not so great for dynamic content, like comments.

Turns out there are lots of options when [adding comments to Gatsby](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-comments/). I didn't want to spend any money, and I strongly resisted the urge to roll my own, so went for <https://staticman.net/>.

Unfortunately, I struggled with the staticman instructions. Maybe because I've never created a GitHub application or used Heroku before, but here's what I learned.

## Step 1 - Creating the GitHub application

The [staticman "getting started" guide](https://staticman.net/docs/getting-started) says we should create the GitHub application first.

I'd never done this before and some of the questions didn't make sense to me, in particular the "Webhook URL". What do I put in there, I don't even have staticman deployed anywhere yet?

Turns out it's a "chicken and egg" problem. One of them needs to go first, so it might as well be the GitHub app. For some silly reason I thought it was a "get it right first time" type thing but of course you can go back and edit things.

At this point, you don't know for certain the name of your heroku instance. So put what you hope to get in the "Webhook URL" field. It'll be like "https://{INSTANCE_NAME}.herokuapp.com/v1/webhook". But don't worry if you need to change it later. You can swap back and forth between GitHub config and Heroku config as much as you need.

## Step 2 - Deploy Static Man

I followed option 1 and after registering a new account, the deployment seemed to work first time. If you go to https://{INSTANCE_NAME}.herokuapp.com you should get a response. However, until it says "Hello from Staticman version 3.0.0!" we have work to do.

Getting to that 'Hello' message was where I hit a bit of a brick wall. I couldn't figure out what variables to set, or if I'm honest why I needed to run "openssl". No idea if it was right, but this is what I did and it seems to work.

First, I'm on windows, so used WSL and a Ubunty 20 instance to run `openssl genrsa`. I kept that window open until I added the configuration variables to Herko, but you could equally copy it into a text file. I imagine you could run this over and over too if you accidentally lost or closed it.

After that, by going to Heroku -> Settings and click "Reveal Config Vars" I created:

    • GITHUB_APP_ID - with the value from step 1
    • GITHUB_PRIVATE_KEY - also from step 1. Just straight cut and paste including "-----BEGIN RSA PRIVATE KEY-----" and any newlines
    • RSA_PRIVATE_KEY - just cut and paste the output of `openssl genrsa` including "-----BEGIN RSA PRIVATE KEY-----"  and up to "-----END RSA PRIVATE KEY-----"

After I did that, I got "Hello", so moved onto step 3.

## Step 3 - Staticman config file

This needs to be published to the repo on the branch that you set in the config. If it's just on your local machine, the GitHub App and Staticman instance won't be able to get to it.

You can see my file <https://github.com/mattdufeu/mattdufeu.co.uk/blob/master/staticman.yml>. It's mostly a direct copy of the sample file.

## Step 4 - Creating the comment form

This will differ on your site layout, where you want to add comments etc, but for my first attempt I literally copied and pasted the code from the guide. Thankfully, once you have pushed the staticman.yml file to somewhere public, you can test this part in locally, i.e. `gatsby develop`.

After clicking submit, if everything worked, you should have a new pull request on your repo.

## Step 5 - Display comments already there

You can also do this locally. Either develop against the branch that staticman created in the previous step or copy the file from `_data/comments` to your local repo. Whatever method you chose, you want a single file in `_data/comments`. In this step, we're trying to get that data displayed on the appropriate page. Easier said than done.

According to the example, you should be able to write a GraphQL query using "allCommentsYaml". In the GraphiQL editor you get when running `gatsby develop`, instead of "allCommentsYaml" I was seeing something like "allAddingStaticmanCommentsToAGatsbySiteYaml"! How do you write a query in a template meant for all pages if I had to put slug specific queries in it?

Turns out `gatsby-transformer-yaml` (at least as far as I know) doesn't like sub-folders. The sample staticman.yml file I copied has a "path" variable set as `_data/comments/{options.slug}`. That means that every comment goes in a new file inside a folder with the name of the slug from the post. For example, a comment on this page would a file like `_data/comments/blog/adding-staticman-comments-to-a-gatsby-site/entry1613753454927.yml`. Great from an organisation point of view, but unfortunately not something I could get working with `gatsby-transformer-yaml`.

To get "allCommentsYaml" I had to change the path to `_data/comments`. That means all comments are in that top level directory. That doesn't seem great to me, but it's all I could do to get it working.

Another problem I had was getting the "slug" correct. I could create pull requests, but the comments weren't coming back in my page query. It took me a while to realise that the `$slug` variable I was passing into the GraphQL page query was both prefixed and suffixed with '/'. Once I updated the value of "options[slug]" field in the form to include "/" at both ends it worked.

## Conclusion

You should now have a site with a comment form. Submitting a comment redirects you to the page (speficied in the redirect field) and there should be a new pull request in GitHub.

![Staticman logo](../../../images/2021/staticman_post_header.png#width=400px;margin=auto)

Staticman is an elegant, free solution to adding comments to a Gatsby site. I'm a little worried that each comment living in single file inside one folder won't scale for a very busy site. But I don't have that problem, and if someday I do, it's a nice problem to have so I've stopped caring about it.

If you know a better way, please leave a comment below ;)!

## Troubleshooting

I initially couldn't get this to work with an error like "at=error code=H10 desc="App crashed"" appearing in the logs. That was because I was missing the GITHUB_APP_ID from the Heroku config variables. If you followed the above, hopefully you don't hit this issue.
