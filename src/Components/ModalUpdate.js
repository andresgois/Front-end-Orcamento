import React from 'react';
import { GlobalContext, GlobalStorage } from './GlobalContext';

const Modal = ({id}) => {
  const GlobalTipoPag = React.useContext(GlobalContext);
  const [ dado, setDado] = React.useState('');
  console.log("Ação Atual: "+GlobalTipoPag.acao);
  
  const [pagamento, setPagamento] = React.useState('');
  const [vencimento, setVencimento] = React.useState('');
  const [melhorDiaCompra, setMelhorDiaCompra] = React.useState('');
  
  React.useLayoutEffect( () => {
    async function fetchDadosUp(url){
      const dados = await fetch(url);
      const result = await dados.json();
      console.log('ID:::::::::: '+id);
      console.log(dados);
      setDado(result)
      setPagamento(result.id_pagamento)
      setPagamento(result.pagamento)
      setVencimento(result.vencimento)
      setMelhorDiaCompra(result.melhor_dia_compra)
    }
    fetchDadosUp(`http://localhost:3333/tipopagamento/${id}`);    
  }, [id]);

  async function Atualiza(){
    GlobalTipoPag.setClick('Atualiza');
    const body = {
      "pagamento": pagamento,
      "vencimento": Number(vencimento),
      "melhor_dia_compra": Number(melhorDiaCompra)
    }
    await fetch('http://localhost:3333/tipopagamento/'+GlobalTipoPag.id,  {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    GlobalTipoPag.setClick('');
    console.log("Ação Id: "+GlobalTipoPag.id);
  }
  
  return (
    <GlobalStorage>
      <div className="modal fade" id="ModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel2">
                Atualiza tipo de pagamento 
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                <div>
                  <label for="pagamento" class="form-label">Pagamento</label>
                  <input type="text" class="form-control" id="pagamento" name="pagamento" value={pagamento}
                    onChange={event => setPagamento(event.target.value)} required />
                </div>
                <div className="row">
                  <div className="col-4">
                    <label for="vencimento" class="form-label">Vencimento</label>
                    <input type="number" class="form-control" id="vencimento" name="vencimento" value={vencimento}
                      onChange={event => setVencimento(event.target.value)} required />
                  </div>
                  <div className="col-6">
                    <label for="melhordiacompra" class="form-label">Melhor dia para compra</label>
                    <input type="number" class="form-control" id="melhordiacompra" name="melhordiacompra" value={melhorDiaCompra}
                      onChange={event => setMelhorDiaCompra(event.target.value)} required />
                  </div>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={Atualiza}>Atualiza pagamento</button>
            </div>
          </div>
        </div>
      </div>
    </GlobalStorage>
  )
}

export default Modal
