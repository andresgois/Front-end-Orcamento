import React from 'react';
import { NavLink } from 'react-router-dom';

const GrupoCadastro = () => {
  return (
    <div className="btn-group" role="group">
      <button id="cadservicos" type="button" className="btn dropdown-toggle fw-bold text-white" 
      data-bs-toggle="dropdown" aria-expanded="false">
        Cadastro
      </button>
      <ul className="dropdown-menu" aria-labelledby="cadservicos">
        <li>
          <NavLink className="dropdown-item" to="TipoPagmento">
            Tipo Pagmento
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="Contas">
            Contas
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default GrupoCadastro
