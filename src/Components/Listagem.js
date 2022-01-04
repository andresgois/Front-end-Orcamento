import React from 'react';
import Style from '../Assets/css/Table.module.css';
import Modal from './Modal';
import ModalUpdate from './ModalUpdate';
import { GlobalContext } from './GlobalContext';
//import '../Assets/css/Tabela.css';

const Listagem = () => {
  const Global = React.useContext(GlobalContext);
  const [pagamento, setPagamento ] = React.useState(null);

  React.useEffect( () => {
    async function fetchDados(url){
      const dados = await fetch(url);
      const result = await dados.json();
      setPagamento(result);
      Global.setAcao('Listar');
      Global.setId(null);
    }
    fetchDados('http://localhost:3333/tipopagamento');
  }, [Global.click]);

  async function handleClick(id){
    console.log("id:  "+id)
    Global.setClick('delete')
    await fetch(`http://localhost:3333/tipopagamento/${id}`,{method: 'DELETE'});
    Global.setClick('');
  }

  
  let modal;
  if (Global.id !== '' || Global.id !== null ) {
    modal = <ModalUpdate id={Global.id} />;
  } else {
    modal = '';
  }
  console.log('Global.id : ',Global.id );

  if(pagamento == null) return <p>Carregando</p>

  return (
      <div className={`${Style.Main}`}>
 
        <Modal /> 
        {modal}

        <table className={`table table-striped table-hover ${Style.tabela}`}>
          <thead className={`table text-white ${Style.corHeader}`} >
            <tr className="col-12">
              <th scope="col">#ID</th>
              <th scope="col">Tipo de Pagamanto</th>
              <th scope="col">Vencimento</th>
              <th scope="col">Melhor dia para compra</th> 
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody className={`text-center ${Style.tBody}`}>
              {
                pagamento.dados.map( (dado) => (             
                  <tr className="col col-12">
                    <td className="col-2">{dado.id_pagamento}</td>
                    <td className="col-4">{dado.pagamento}</td>
                    <td className="col-2">{dado.vencimento}</td>
                    <td className="col-1">{dado.melhor_dia_compra}</td>
                    <td className="col-1">
                      <i className="bi bi-trash-fill primaryColor p-2" onClick={ () => handleClick(dado.id_pagamento) }></i>
                    </td>
                    <td className="col-1">
                      <div data-bs-toggle="modal" data-bs-target="#ModalUpdate" onClick={ () => Global.setId(dado.id_pagamento) }>
                        <i className="bi bi-pencil-square primaryColor p-2"></i>
                      </div>                    
                    </td>
                  </tr>
                ))
              }
            
          </tbody>
        </table> 
        <button 
          type="button" 
          className="btn btn-block primaryBackground text-white fw-bold"
          data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => Global.setAcao('Adicionar')}
          >
            Adicionar
        </button>
      </div>    
  )
}

export default Listagem
