import React, { useState } from 'react';
import styles from "../styles/MintNFT.module.css";

function getValue(event) {
  event.preventdefault();
  console.log(event)
}


function MintNFT() {

  const [image, setImage] = useState('');

  const showSampleImage = (event) => {
    console.log(image)
    setImage(event.target.value)
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
            onSubmit={getValue}
            className={styles.button}>NFT 만들기</button>
        </form>
      </div>
    </div>
  )
}

export default MintNFT