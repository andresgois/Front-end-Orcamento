import React from 'react';
import { Link } from 'react-router-dom';
import Style from '../Assets/css/Menu.module.css';
import GrupoCadastro from './GrupoCadastro';

const Menu = () => {
  return (
    <nav className={Style.menu}>
      <ul className="d-flex justify-content-around">
        <li className="mt-2">

          <Link activeClassName={Style.active} className="text-light fw-bold mt-2 p-2" to="/" end>
            Home
          </Link>
        </li>
        <li className="mt-2">
          <Link activeClassName={Style.active} className="text-light fw-bold mt-2 p-2" to="/gastospormes">
            Gastos Por Mês
          </Link>
        </li>
        <li className="mt-2">
          <Link activeClassName={Style.active} className="text-light fw-bold mt-2 p-2" to="/graficoanual">
            Gráfico Anual
          </Link>
        </li>
        <li className="">
          <GrupoCadastro />
          {/* <Link activeClassName={Style.active} className="text-light fw-bold mt-2 p-2" to="cadastro">
            Cadastro
          </Link> */}
        </li>
      </ul>
    </nav>
  )
}

export default Menu
