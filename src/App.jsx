import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componentes/telas/Home";
import MenuPublico from "./componentes/telas/MenuPublico";
import MenuPrivado from "./componentes/telas/MenuPrivado";
import Login from "./componentes/telas/login/Login";
import Usuario from "./componentes/telas/usuario/Usuario";
import Conteudo from "./componentes/telas/conteudo/Conteudo";

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element :  <Login/>
      }              
    ]
  },
  {
    path : "/privado",
    element : <MenuPrivado/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "usuarios",
        element :  <Usuario/>
      },
      {
        path : "conteudos",
        element :  <Conteudo/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
