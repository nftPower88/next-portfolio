import ContainerBlock from '../components/ContainerBlock'
import FavouriteProjects from '../components/FavouriteProjects'
import Hero from '../components/Hero'
import Snake from '../components/Snake'

export default function Home({ scores }) {
  return (
    <ContainerBlock
      title='Manu Arora - Developer, Writer, Creator'
      description='This is a template built specifically for my blog - Creating a developer portfolio that gets you a job.'
    >
      <Hero />
      <FavouriteProjects />
      <Snake scores={scores} />
    </ContainerBlock>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/score`)
  const json = await res.json()

  let scores = []
  if (json.success) {
    scores = json.data
  }

  return {
    props: { scores },
  }
}
