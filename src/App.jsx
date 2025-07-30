import './App.css'
import Navbar from './components/Navbar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Allnotes from './components/Allnotes.jsx'
import ViewNote from './components/ViewNote.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: 
       <div>
          <Navbar />
          <Home />
       </div>
        
    },
    {
      path: "/all-notes",
      element:
        <div>
            <Navbar />
            <Allnotes />
        </div>
    },
    {
      path:"/all-notes/:id",
      element:
      <div>
          <Navbar />
          <ViewNote />
      </div>
    }
  ]
);


function App() {
  

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
