import React from 'react';
import { GlobalContext } from './GlobalContext';
import { GlobalStorage } from './GlobalContext';

const Modal = () => {
  const GlobalTipoPag = React.useContext(GlobalContext);
  const [ dado, setDado] = React.useState('');

  console.log("Ação no Criar : "+GlobalTipoPag.acao);
  
  const [pagamento, setPagamento] = React.useState('');
  const [vencimento, setVencimento] = React.useState('');
  const [melhorDiaCompra, setMelhorDiaCompra] = React.useState('');

  async function fetchDados(url, body){
     await fetch(url,  {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    setPagamento('')
    setVencimento('')
    setMelhorDiaCompra('')
    GlobalTipoPag.setClick('');
  }

  function adicionar(){
    GlobalTipoPag.setClick('adicionar');
    const body = {
      "pagamento": pagamento,
      "vencimento": Number(vencimento),
      "melhor_dia_compra": Number(melhorDiaCompra)
    }
    fetchDados('http://localhost:3333/tipopagamento',body);
  }
  

  return (
    <GlobalStorage>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Adicionar tipo de pagamento 
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
              <button type="button" className="btn btn-primary" onClick={adicionar}>Adicionar pagamento</button>
            </div>
          </div>
        </div>
      </div>
    </GlobalStorage>
  )
}

export default Modal
