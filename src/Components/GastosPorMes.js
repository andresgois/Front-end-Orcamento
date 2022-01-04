import React from 'react'
import Table from './Table'
import Style from '../Assets/css/GastosPorMes.module.css';

const GastosPorMes = () => {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  var now = new Date();
  var data;
  const [mes, setMes] = React.useState(now);
  const [conta, setConta] = React.useState(now.getFullYear()+''+(now.getMonth()+1));


  function addMonth(p,valor,dtHoje){
    if(p ===  "+"){
      dtHoje.setMonth(dtHoje.getMonth() + valor); return dtHoje;
    }else if(p ===  "-"){
      dtHoje.setMonth(dtHoje.getMonth() - valor); return dtHoje;
    }else{ return dtHoje}    
  }

  function proximo(){  
    data = addMonth("+",1,mes); 
    console.log("Data1:"+data);
    setMes(data);
    setConta((mes.getFullYear()+''+(mes.getMonth()+1)).toString());
  }

  function anterior(){ 
    data = addMonth("-",1,mes)
    console.log("DataAnterior:"+data);
    setMes(data);
    setConta(mes.getFullYear()+''+(mes.getMonth()+1).toString());
  }
  console.log("DataMes:"+mes);
  console.log("conta :"+conta);
  return (
      
      <div className={`container ${Style.laterais} `} >
        <i className="bi bi-caret-left-fill" onClick={anterior}></i>

        <div>
          <h6 className="text-center text-white primaryBackground mb-0 pb-0">{(meses[mes.getMonth()]+' de '+mes.getFullYear()).toString()}</h6>
          <Table data={conta} />
        </div>
        

        <i className="bi bi-caret-right-fill" onClick={proximo}></i>
      </div>
  )
}

export default GastosPorMes
