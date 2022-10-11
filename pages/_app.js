import '../styles/globals.css'
import '../styles/bootstrap.css'
import { SWRConfig } from 'swr'
import fetchJson from './api/fetchJson'

function MyApp({ Component, pageProps }) {
  return (
    //This SWRConfig wrapper is super important for static generation
    //and fetching via swr on each page load
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        }
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp;