interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Exploring AI',
    description: `I'm not going out on a limb by thinking that AI isn't going away. "Keep up or get left behind". From the underlying technology, to the latest AI news, I'm constantly researching how to get the most out of AI. (credit to https://image-generator.com/ for the image above)`,
    imgSrc: '/static/images/researching-ai.png',
  },
]

export default projectsData
