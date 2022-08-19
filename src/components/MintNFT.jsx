import React, { useState } from 'react';
import * as KlipAPI from '../api/UseKlip';
import store from '../redux/store';
import styles from "../styles/MintNFT.module.css";

function MintNFT() {

  const [imageUrl, setImageUrl] = useState('');

  const mintImage = async (uri) => {
    console.log(store.getState().address)
    if(store.getState().address === 'DEFAULT_ADDRESS') alert('NO ADDRESS');
    const randomTokenId = parseInt(Math.random() * 10000);
    KlipAPI.mintWithTokenURI(store.getState().address, randomTokenId, uri, (result) => {
      console.log('result', result)
    });
  }

  const showSampleImage = (event) => {
    console.log(imageUrl)
    setImageUrl(event.target.value)
  }

  const checkInformation = () => {
    console.log(store.getState().qrCode.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <span className={styles.title}>Create My NFT</span>
        <div className={styles.sample_container}>
          {imageUrl 
            ? <img src={imageUrl} alt="" width="200" />
            : <div className={styles.notification}>
                <span>No Image</span> <br />
                 NFT로 만들고 싶은 이미지 URL을 입력 후 버튼을 눌러주세요 <br />
              </div>}
        </div>
        <div className={styles.create_container}>
          <input 
            className={styles.input_container} 
            type="text" 
            placeholder='이미지 URL을 입력해주세요'
            onChange={showSampleImage} />
          <button
            onClick={() => {
              mintImage(imageUrl)
            }}
            className={styles.button}>NFT 만들기</button>
        </div>
        <button onClick={checkInformation}>버튼!</button>
      </div>
    </div>
  )
}

export default MintNFT