import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({children}) => {
  const [ click, setClick ] = React.useState('');
  const [ acao, setAcao ] = React.useState('');
  const [ id, setId ] = React.useState('');


  return (
    <GlobalContext.Provider value={{ id, setId , acao, setAcao, click, setClick }}> 
      {children} 
    </GlobalContext.Provider>
  );
};
