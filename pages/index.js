import ContainerBlock from '../components/ContainerBlock'
import FavouriteProjects from '../components/FavouriteProjects'
import Hero from '../components/Hero'
import PlaySnake from '../components/PlaySnake'

export default function Home() {
  return (
    <ContainerBlock>
      <Hero />
      <FavouriteProjects />
      <PlaySnake />
    </ContainerBlock>
  )
}
