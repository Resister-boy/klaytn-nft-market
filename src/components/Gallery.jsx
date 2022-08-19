import React, { useState } from 'react'
import { fetchCardsOf } from '../api/UseCaver';
import * as KlipAPI from '../api/UseKlip';
import store from '../redux/store';
import styles from '../styles/Gallery.module.css';

function Gallery() {
  const [nfts, setNfts] = useState([]) // { tokenId: '101', tokenUri: '' }

  // balanceOf => 내가 가진 NFT 개수 반환
  // tokenOfOwnerByIndex => 내가 가진 NFT ID 반환
  // tokenURI => NFT ID를 가지고 token URI 반환

  // const onClickCard = (tokenId) => {
  //   KlipAPI.sellCard(myAddress, tokenId, (result) => {
  //     alert(JSON.stringify(result))
  //   }) 
  // }

  const fetchNFTs = async () => { 
    console.log(store.getState().address)
    if(store.getState().address !== 'DEFAULT_ADDRESS') {
      const _nfts = await fetchCardsOf(store.getState().address);
      setNfts(_nfts)
    } else {
      alert('NO ADDRESS')
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
      <span className={styles.title}>My NFT Gallery</span>
      <div className={styles.main}>
        {nfts.length > 1 
            ? 
            <div className={styles.item__container}>
              {nfts.map((nft) => {
              return (
                <div  className={styles.item__list} key={nft.tokenId}>
                  <img className={styles.item__content} src={nft.tokenURI} alt={nft.tokenId} />
                  <div className={styles.itme__id}> #{nft.tokenId}</div>
              </div>
              )
            })}
            </div>
            : <div className={styles.notation}><span>NFT 찾기</span> 버튼을 눌러 여러분의 NFT를 찾아보세요!</div>
          }
        </div>
        <button className={styles.button} onClick={fetchNFTs}>NFT 찾기</button>
      </div>
    </div>
  )
}

export default Gallery