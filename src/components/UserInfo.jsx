import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import "bootstrap/dist/css/bootstrap.min.css";
import * as KlipAPI  from '../api/UseKlip';
import * as Caver from '../api/UseCaver';
import styles from "../styles/UserInfo.module.css";

// Bootstrap

function UserInfo() {
  const DEFAULT_BALANCE = "0";
  const DEFAULT_ADDRESS = "DEFAULT";
  const QR_DEFAULT = 'DEFAULT';
  const [myBalance, setMyBalance] = useState(DEFAULT_BALANCE);
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  const [qrValue, setQrValue] = useState(QR_DEFAULT);


  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrValue, async (address) => {
      setMyAddress(address);
      const _balance = await Caver.getBalance(address);
      console.log(_balance)
      setMyBalance(_balance);
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.QRcontainer}>
          <QRCode value={qrValue} /> 
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.item__container}>
            <span className={styles.item__name}>주소</span> <br />
            <div className={styles.itme__address}>
              {myAddress !== "DEFAULT"
                ? myAddress 
                : "계좌를 연결해주세요" } 
            </div>
          </div>
          <div className={styles.item__container}>
            <span className={styles.item__name}>잔액</span> <br />
            <div className={styles.itme__balance}>
              {myAddress !== "DEFAULT"
                ? `${myBalance} klay`
                : "계좌를 연결해주세요" }
            </div>
          </div>
        </div>
      </div>
      <button 
        className={styles.button} 
        onClick={onClickGetAddress}>
          계좌 연결하기
        </button>
    </div>
  )
}

export default UserInfo