import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from 'react';
import styles from './Editor.module.scss';
import { debounce } from 'lodash';
import Header from '../Header/Header';
import { useSession } from 'next-auth/client';

function saveLocalStorage(content: string) {
  window.localStorage.setItem('markdown', content);
}

const debouncedSaveLocalStorage = debounce((value, setSaved) => {
  saveLocalStorage(value);
  setSaved(true);
}, 1000);

const Editor = () => {
  const [session] = useSession();
  const [value, setValue] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    setValue(window.localStorage.getItem('markdown') || '');
  }, []);

  useEffect(() => {  
    debouncedSaveLocalStorage(value, setSaved);
  }, [value]);
  
  function saveToGoogleDrive() {
    fetch('/api/google/drive', {
      method: 'POST',
      body: value
    })
  }

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

        {/* <button className={styles.saveButton} onClick={() => saveToGoogleDrive()}>Save to Google Drive</button> */}

    </div>
  </div>
  )
}

export default Editor;