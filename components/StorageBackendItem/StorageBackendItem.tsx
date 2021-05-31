import React, { useContext } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client'
import { StorageBackendContext } from '../../contexts/StorageBackendContext';


const StorageBackendItem: React.FC = () => {
  const [session] = useSession();
  const storageBackend = useContext(StorageBackendContext);

  switch(storageBackend?.value) {
    case 'localstorage':
      return (
        <div>
          <p>You are using LocalStorage. All changes are saved locally to your browser.</p>
        </div>    
      )
    case 'google':
      if(session) {
        return (
          <div>
            <p>Hey {session?.user?.name}! You are using Google Drive as your storage backend.</p>
            <button onClick={() => signOut()}>Click here to sign out of Google.</button>
          </div>
        )
      } else {
        return (
          <div>
            <p>To use Google Drive as a storage backend, please login with Google</p>
            <button onClick={() => signIn('google')}>Login with Google</button>
          </div>
        )
      }
    default:
      return (
        <div>
          <p>Invalid backend.</p>
        </div>
      )
  }
}

export default StorageBackendItem