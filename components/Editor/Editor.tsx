import ReactMarkdown from 'react-markdown'
import React, { useContext, useEffect, useState } from 'react';
import styles from './Editor.module.scss';
import { debounce } from 'lodash';
import Header from '../Header/Header';
import { StorageBackendContext } from '../../contexts/StorageBackendContext';
import { useSession } from 'next-auth/client';

function saveToGoogleDrive(content: string) {
  fetch('/api/google/drive', {
    method: 'POST',
    body: content
  })
}

function saveContent(storageBackend: string, content: string) {
  switch(storageBackend) {
    case 'google':
      saveToGoogleDrive(content);
      break;
    default:
      window.localStorage.setItem('md:content', content);
  }
}

const debouncedSaveContent = debounce((storageBackend, value, setSaved) => {
  saveContent(storageBackend, value);
  setSaved(true);
}, 1000);

const Editor = () => {
  const storageBackend = useContext(StorageBackendContext);
  const [value, setValue] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);
  const [session] = useSession();

  useEffect(() => {
    setValue(window.localStorage.getItem('md:content') || '');
  }, []);

  useEffect(() => {  
    debouncedSaveContent(storageBackend?.value, value, setSaved);
  }, [value]);
  
  return (
  <div>
    <Header/>
    <div className={styles.container}>
      <textarea 
        className={styles.editor}
        value={value}
        onChange={(e) => {
          setSaved(false);
          setValue(e.target.value);
        }}
      />
      <ReactMarkdown className={styles.preview}>
        {value}
      </ReactMarkdown>

      <div className={styles.savedIndicator}>{saved ? 'Saved' : 'Not Saved' }</div>
    </div>
  </div>
  )
}

export default Editor;