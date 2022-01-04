import React from 'react';
import Style from '../Assets/css/Table.module.css';


const Table = (props) => {
  const [ contas, setContas ] = React.useState(null);

  React.useEffect( () => {
    async function fetchDados(url){
      const dado = await fetch(url);
      const result = await dado.json();
      setContas(result);
    }
    fetchDados(`http://localhost:3333/relatorio/${props.data}`);
  }, [props.data]);
  
  if (contas === null) return <p>Retorno vazio</p>
  if(contas.dados[0] !== undefined){   
     var total =  contas.dados.map( (dado) => (               
        Number(dado.valor)
      )).reduce( (t,n) => t+n).toFixed(2)
  }
  return (
      
     <table className={`table table-striped table-hover table-sm `}>
      <thead className={`table ${Style.corHeader}`}>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Parcela</th>
          <th scope="col">Data Compra</th> 
          <th scope="col"> Tipo Pagamento</th>
        </tr>
      </thead>
      <tbody  className="text-center">
          {
            contas.dados.map( (conta) => (
              <tr>
                <td>{conta.descricao}</td>
                <td>R$ {conta.valor}</td>
                <td>{conta.parc_atual+" de "+conta.parcelas}</td>
                <td>{ new Date(`${conta.data_compra}`).getDate()+"/"+(new Date(`${conta.data_compra}`).getMonth()+1)+"/"+new Date(`${conta.data_compra}`).getFullYear() }</td>
                <td>{conta.Tipo}</td>
              </tr>
            ))
          }
        
       
        <tr>
          <th scope="row" colspan="3">Total</th>
          <td>R$ { total ? total : 0 } </td>
          <td></td>
        </tr>
      </tbody>
     </table> 

  )
}

export default Table
