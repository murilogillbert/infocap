import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Routes/App/App';
import Home from './Routes/Home/Home';
import Login from './Routes/Login/Login';
import Cadastro from './Routes/Cadastro/Cadastro';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MeusCursos from './Routes/MeusCursos/MeusCursos';
import Cursos from './Routes/Cursos/Cursos';
import Curso from './Routes/Curso/Curso';
import Video from './Routes/Video/Video';
import Configuracao from './Routes/Configuracao/Configuracao';
import Gerenciador from './Routes/Gerenciador/Gerenciador';
import Admin from './Routes/Admin/Admin';
import { AuthProvider } from './AuthContext';
import EnviaEmail from './Routes/TrocarSenha/EnviaEmail';
import MudaSenha from './Routes/TrocarSenha/MudaSenha';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/cadastro",
        element: <Cadastro />
      },
      {
        path: "/meusCursos",
        element: <MeusCursos />
      },
      {
        path: "/cursos",
        element: <Cursos />
      },{
        path:"/cursos/:id",
        element:<Curso/>
      },{
        path:"/cursos/:id/video/:videoId",
        element:<Video/>
      },
      {
        path:"/configuracao",
        element:<Configuracao/>
      },{
        path:"/gerenciador",
        element:<Gerenciador/>
      },{
        path:"/admin",
        element:<Admin/>
      },{
        path:"/trocarSenha",
        element:<EnviaEmail/>
      },{
        path:"/token/verify/:token",
        element:<MudaSenha/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
