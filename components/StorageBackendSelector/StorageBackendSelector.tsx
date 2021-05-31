import React, { useContext, useEffect, useState } from 'react';
import styles from './StorageBackendSelector.module.scss';
import Modal from 'react-modal';
import StorageBackendItem from '../StorageBackendItem/StorageBackendItem';
import { StorageBackendContext } from '../../contexts/StorageBackendContext';

Modal.setAppElement('#root')

const StorageBackendSelector = () => {
  const storageBackend = useContext(StorageBackendContext)
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Select Storage Backend ({storageBackend?.value})</button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Select Storage Backend"
          className={styles.modal}
        >
          <div>
            <h1>Select Storage Backend</h1>
            <select value={storageBackend?.value} onChange={(e) => storageBackend?.setBackend(e.target.value)}>
              <option value="localstorage">LocalStorage</option>
              <option value="google">Google Drive</option>
            </select>
            <StorageBackendItem/>
          </div>
        </Modal>
      )}
    </>
  )
}

export default StorageBackendSelector;