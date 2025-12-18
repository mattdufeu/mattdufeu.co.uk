import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ project: string }>
}): Promise<Metadata> {
  const params = await props.params
  const project = decodeURI(params.project)
  return genPageMetadata({
    title: project,
    description: `${siteMetadata.title} ${project} project posts`,
  })
}

export const generateStaticParams = async () => {
  const projects = new Set<string>()
  allBlogs.forEach((post) => {
    if (post.projects) {
      post.projects.forEach((p) => projects.add(slug(p)))
    }
  })
  return Array.from(projects).map((project) => ({ project: encodeURI(project) }))
}

export default async function ProjectPage(props: { params: Promise<{ project: string }> }) {
  const params = await props.params
  const project = decodeURI(params.project)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.projects && post.projects.map((p) => slug(p)).includes(project)
      )
    )
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={project}
    />
  )
}
