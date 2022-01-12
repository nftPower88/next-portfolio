import ContainerBlock from '../components/ContainerBlock'
import FavouriteProjects from '../components/FavouriteProjects'
import Hero from '../components/Hero'
import PlaySnake from '../components/PlaySnake'

export default function Home() {
  return (
    <ContainerBlock
      title='Manu Arora - Developer, Writer, Creator'
      description='This is a template built specifically for my blog - Creating a developer portfolio that gets you a job.'
    >
      <Hero />
      <FavouriteProjects />
      <PlaySnake />
    </ContainerBlock>
  )
}
