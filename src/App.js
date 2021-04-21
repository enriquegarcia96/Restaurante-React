import React from 'react';
import { Routes, Route } from 'react-router';


//--- componentes ---//
import Ordenes from './components/paginas/Ordenes';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import Menu from './components/paginas/Menu';
import Sidebar from './components/ui/Sidebar'

function App() {
  return (
    
    <div>

      <div className='md:flex min-h-screen'>
        <Sidebar />

        <div className='md:w-3/5 xl:w-4/5 p-6'>
          <Routes>
            <Route path='/' element={ <Ordenes /> } />
            <Route  path='/menu' element={ <Menu /> }  />
            <Route path='/nuevo-platillo' element={ <NuevoPlatillo /> } />
          </Routes>
        </div>


      </div>

    </div>

  );
}

export default App;
