import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import ErrorPage from './error-page';
import ViewPokemon from './ViewPokemon';
import AllPokemons from './AllPokemons';

const router = createBrowserRouter([
  {
    path: "/servc_assignment",
    element: <App />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "servc_assignment/pokemons",
    element: <AllPokemons/>
  },
  {
    path: "servc_assignment/pokemons/:id",
    element: <ViewPokemon/>
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
