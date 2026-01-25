import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ project: string; page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const project = decodeURI(params.project)
  const page = params.page
  return genPageMetadata({
    title: `${project} - Page ${page}`,
    description: `${siteMetadata.title} ${project} project posts - Page ${page}`,
  })
}

export const generateStaticParams = async () => {
  const projects = new Set<string>()
  allBlogs.forEach((post) => {
    if (post.projects) {
      post.projects.forEach((p) => projects.add(slug(p)))
    }
  })
  const paths: { project: string; page: string }[] = []
  for (const project of projects) {
    const filteredPosts = allBlogs.filter(
      (post) => post.projects && post.projects.map((p) => slug(p)).includes(project)
    )
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
    for (let i = 2; i <= totalPages; i++) {
      paths.push({ project: encodeURI(project), page: i.toString() })
    }
  }
  return paths
}

export default async function Page(props: { params: Promise<{ project: string; page: string }> }) {
  const params = await props.params
  const project = decodeURI(params.project)
  const pageNumber = parseInt(params.page)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.projects && post.projects.map((p) => slug(p)).includes(project)
      )
    )
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or page 1 (handled by base route)
  if (pageNumber <= 1 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
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
