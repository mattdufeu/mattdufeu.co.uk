interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Building an LLM from scratch',
    description: `I'm working my way through 'Building a Large Language Model From Scratch' by Sebastian Raschka.`,
    imgSrc: '/static/images/researching-ai.png',
  },
  {
    title: 'Learning Godot',
    description: `I'm learning to make games using Godot. Very early days, but it's a lot of fun!`,
    imgSrc: '/static/images/godot_logo_16x9.png',
  }
]

export default projectsData
