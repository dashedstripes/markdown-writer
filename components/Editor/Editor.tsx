import ReactMarkdown from 'react-markdown'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './Editor.module.scss';
import { debounce } from 'lodash';
import Header from '../Header/Header';
import { StorageBackendContext } from '../../contexts/StorageBackendContext';
import { useSession } from 'next-auth/client';


async function saveToGoogleDrive(content: string) {
  const currentFileId = window.localStorage.getItem('md:google:current.file-id');

  if(!currentFileId) {
    const res = await fetch('/api/google/createFile', {
      method: 'POST',
      body: content
    });

    const json = await res.json();

    window.localStorage.setItem('md:google:current.file-id', json?.fileId);

    return json?.fileId;
  }

  if(currentFileId) {
    const res = await fetch(`/api/google/updateFile?fileId=${currentFileId}`, {
      method: 'POST',
      body: content
    })
    const json = await res.json();

    window.localStorage.setItem('md:google:current.file-id', json?.fileId);

    return json?.fileId;
  }
}

async function saveContent(storageBackend: string, content: string) {
  switch(storageBackend) {
    case 'google':
      await saveToGoogleDrive(content);
      break;
    default:
      window.localStorage.setItem('md:content', content);
  }
}

async function getGoogleFile() {
  const currentFileId = window.localStorage.getItem('md:google:current.file-id');
  const res = await fetch(`/api/google/getFile?fileId=${currentFileId}`)
  const json = await res.json();
  return json?.data;
}

async function getFile(storageBackend: string) {
  switch(storageBackend) {
    case 'google':
      return await getGoogleFile();
    default:
      return window.localStorage.getItem('md:content') || '';
  }
}

const debouncedSaveContent = debounce(async (storageBackend, value, setSaved) => {
  await saveContent(storageBackend, value);
  setSaved(true);
}, 1000);

const Editor = () => {
  const [session] = useSession();
  const storageBackend = useContext(StorageBackendContext);
  const [value, setValue] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  const getInitialValue = useCallback(async () => {
    const value = await getFile(storageBackend?.value || 'localstorage');
    setValue(value);
  }, [storageBackend?.value]);
  
  useEffect(() => {
    getInitialValue();
  }, [storageBackend?.value]);

  useEffect(() => {  
    debouncedSaveContent(storageBackend?.value, value, setSaved);
  }, [value]);
  
  return (
    <div>
      {!session && storageBackend?.value === 'google' && (
        <div className={styles.warningBanner}>Changes will not be saved until you log in to google!</div>
      )}
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