import './App.css'
import Navbar from './componenets/Navbar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './componenets/Home.jsx'
import Allnotes from './componenets/Allnotes.jsx'
import ViewNote from './componenets/ViewNote.jsx'

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
