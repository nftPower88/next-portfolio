import { SnakeProvider } from '../context/SnakeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SnakeProvider>
      <Component {...pageProps} />
    </SnakeProvider>
  )
}

export default MyApp
