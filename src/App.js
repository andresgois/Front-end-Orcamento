import './App.css';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import { Footer, Header, Home, GraficoAnual, GastosPorMes, NotFound, Contas, TipoPagmento } from './Components';


function App() {
  return (
    <div className="main">
    <BrowserRouter>
     <Header />

      <div className="content">
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/gastospormes" component={ GastosPorMes } /> 
          <Route path="/graficoanual" component={ GraficoAnual} />
          <Route path="/TipoPagmento" component={ TipoPagmento } />
          <Route path="/Contas" component={ Contas  } />

          <Route path="/*" component={ NotFound  } />
        </Switch>
      </div>

      <Footer />
     </BrowserRouter>    
    </div>
  );
}

export default App;
