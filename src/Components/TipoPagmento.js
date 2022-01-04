import React from 'react';
import Listagem from './Listagem';
import { GlobalStorage } from './GlobalContext';

const TipoPagmento = () => {
  return (
    <div className="container">
      <GlobalStorage>
        <Listagem />
      </GlobalStorage>
    </div>
  )
}

export default TipoPagmento
