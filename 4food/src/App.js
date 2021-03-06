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





function App() {


  return (
    <div>
      <GlobalState>
        <Loading/>
        <BrowserRouter>
          <Routes>
              <Route 
              path={'/'} element={ <Login/>}>             
              </Route>
              
              <Route 
              path={'/cadastro'} element={<Cadastro/>}>
              </Route>
              
              <Route 
              path={'/menu'} element={ <Menus/>}>
              </Route>
              
              <Route 
              path={'/profile'} element={ <PerfilCliente/>}>
              </Route>
              
              <Route
              exact path={'/restaurantes/:id'} element={<Restaurantes/>}>
              </Route>

              <Route 
              path={'/cart'} element={ <Cart/>}>
              </Route>
          </Routes>
          </BrowserRouter>
      
      </GlobalState>
    </div>
  );
}

export default App;
