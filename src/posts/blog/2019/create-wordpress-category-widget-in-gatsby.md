---
title: Create Wordpress Category Widget in Gatsby
author: DuFeu
type: post
date: 2019-06-12T06:43:05+00:00
url: /blog/create-wordpress-category-widget-in-gatsby/
categories:
  - React
tags:
  - Gatsby
excerpt: <p>I've recently moved this blog from WordPress to Gatsby. So far, I'm very happy with the move, but I missed a couple of the things WordPress gave me out of the box. One of those things were the various widgets you can add to the sidebar.</p> <p>In particular, I missed the <a href="https://en.support.wordpress.com/widgets/categories-widget/">Category Widget</a>. This is how I recreated it.</p>
---

I've recently moved this blog from WordPress to Gatsby. So far, I'm very happy with the move, but I missed a couple of the things WordPress gave me out of the box. One of those things were the various widgets you can add to the sidebar. In particular, I missed the [Category Widget](https://en.support.wordpress.com/widgets/categories-widget/).

## How to query and count categories?

First thing we need to do is figure out what categories are being used and count them. I'd only just completed the [Adding Tags and Categories to Blog Posts](https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/) guide, so knew about the _group_ query syntax, so we need:

```javascript
query {
    allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
            fieldValue
            totalCount
        }
    }
}
```

Now we know what query to use, but how to use it?

## Adding the query in a component

We'd ideally add this to a React component. Thankfully Gatsby v2 added [StaticQuery](https://www.gatsbyjs.org/docs/static-query/) which is exactly what we want.

As usual with Gatsby, the documentation is excellent, so I recommend you read that. Once you have, you'll see we have two parts to create. The first is the above query, the second is a [render prop](https://reactjs.org/docs/render-props.html).

The render prop is how you want to display the result of the query. I used:

```JSX
<div>
    <h2 className="widget-title">Choose a category:</h2>
    <ul>
    {data.allMarkdownRemark.group.map(tag => (
        <li key={tag.fieldValue}>
        <Link to={`/blog/categories/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
        </Link>
        </li>
    ))}
    </ul>
</div>
```

So far so good, but I also wanted to display a similar widget for tags.

## Tags and Categories

Initially I duplicated the above query and replaced the words categories with tags. I got this error:

```javascript
Fields "allMarkdownRemark" conflict because subfields "group"
conflict because they have differing arguments.
Use different aliases on the fields to fetch both if this was intentional.
```

Not being familiar with aliase, after a quick search I ended up with the following query:

```javascript
tagsGroup: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter**_tags) {
        fieldValue
        totalCount
    }
}
categoriesGroup: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter_**categories) {
        fieldValue
        totalCount
    }
}
```

Which I can use in render prop with `data.tagsGroup.group` or `data.categoriesGroup.group`. You can see the final code at <https://github.com/mattdufeu/mattdufeu.co.uk/blob/master/src/components/layout_sidebar.js>.

## Conclusion

Creating an equivalent of the WordPress Category Widget for Gatsby turned out nicely.

[StaticQuery](https://www.gatsbyjs.org/docs/static-query/) is a fantastic addition to the API and I can see myself using it a lot more in the future.

Please let me know on [twitter](https://twitter.com/mattdufeu) if you have any suggestions on better ways to achieve this.
