import { Provider } from 'next-auth/client'
import './styles/global.scss';
import type { AppProps } from 'next/app'
import StorageBackendProvider from '../contexts/StorageBackendContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <StorageBackendProvider>
        <div id="root">
          <Component {...pageProps} />
        </div>
      </StorageBackendProvider>
    </Provider>
  )
}
export default App
