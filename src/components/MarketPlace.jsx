import React from 'react';
import store from '../redux/store';
import * as KlipAPI from '../api/UseKlip';

function MarketPlace() {
  const myAddress = store.getState().address.value;
  const onClickMarket = (tokenId) => {
    KlipAPI.buyCard(tokenId)
  };

  return (
    <div>
      <button onClick={onClickMarket}>버튼!</button>
    </div>
  )
}

export default MarketPlace