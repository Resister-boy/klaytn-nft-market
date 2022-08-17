import React, { useState } from 'react';
import { mintCardWithURI } from '../api/UseKlip';
import store from '../redux/store';
import styles from "../styles/MintNFT.module.css";

function MintNFT() {

  const [image, setImage] = useState('');
  const myaddress = store.getState();
  // const qrValue = store.get

  const mintImage = async (uri) => {
    const randomTokenId = parseInt(Math.random() * 1000);
    mintCardWithURI(myaddress, randomTokenId, uri)   
  }

  const showSampleImage = (event) => {
    console.log(image)
    setImage(event.target.value)
  }

  const checkInfomation = () => {
    console.log(store.getState())
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <span className={styles.title}>Create My NFT</span>
        <div className={styles.sample_container}>
          {image 
            ? <img src={image} alt="" width="200" />
            : <div className={styles.notification}>
                <span>No Image</span> <br />
                 NFT로 만들고 싶은 이미지 URL을 입력 후 버튼을 눌러주세요 <br />
              </div>}
        </div>
        <form className={styles.create_container}>
          <input 
            className={styles.input_container} 
            type="text" 
            placeholder='이미지 URL을 입력해주세요'
            onChange={showSampleImage} />
          <button
            onClick={(event) => {
              mintImage(event.target.value)
            }}
            className={styles.button}>NFT 만들기</button>
        </form>
        <button onClick={checkInfomation}>버튼!</button>
      </div>
    </div>
  )
}

export default MintNFT