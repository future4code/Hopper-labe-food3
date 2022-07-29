import Loading from './components/Pageloading/loading';
import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Pages/Login/login';
import Cadastro from './Pages/Cadastro/cadastro';
import Menus from './Pages/Menus/menu';
import PerfilCliente from'./Pages/PerfilCliente/profile'
import Restaurantes from './Pages/Restaurantes/restaurant'
import Cart from './Pages/Cart/cart';
import GlobalState from './global/GlobalState';
import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <div>
      <GlobalState>
        <Loading/>
        <BrowserRouter>
          <Routes>
              <Route exact path={'/'} element={ <Login/>} />
              
              <Route exact path={'/cadastro'} element={<Cadastro/>} />
              
              <Route exact path={'/menu'} element={<PrivateRoute Component={Menus}/>} />

              <Route exact path={'/profile'} element={<PrivateRoute Component={PerfilCliente}/>} />

              <Route exact path={'/restaurantes/:id'} element={<PrivateRoute Component={Restaurantes}/>} />

              <Route exact path={'/cart/:id'} element={<PrivateRoute Component={Cart}/>} />
          </Routes>
          </BrowserRouter>
      
      </GlobalState>
    </div>
  );
}

export default App;
