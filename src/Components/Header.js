import React from 'react';
import Style from '../Assets/css/Header.module.css';

import Banner from '../Assets/img/topo.png';
import Icon from '../Assets/img/LogoSimples.png';
import Menu from './Menu';

const Header = () => {
  return (
    <>
      <nav className={Style.topo}>
        <img src={Banner} className="mx-auto d-block" height="120"  alt="Logo Empresa" />
        <img src={Icon} className={Style.logo} alt="Logo" width="100" />
      </nav>
    <Menu />
    </>
  )
}

export default Header
