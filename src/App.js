import './App.css';
import Home from './component/pages/Home';
import { createBrowserRouter, Route,createRoutesFromElements, RouterProvider} from 'react-router-dom'
import Login from './component/pages/Login';
import Register from './component/pages/Register';
import BookingCar from './component/pages/BookingCar';
import { useEffect, useState } from 'react';
import Bookings from './component/pages/Bookings';

function App() {
  const [isUser, setIsUser] = useState(false)
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
    <Route path = '/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/booking/:carid' element={<BookingCar/>}/>      
      <Route path='/booking/getallbookings' element={<Bookings/>}/>
      <Route path='/register' element={<Register/>}/>
    </Route>
  ))

  const route = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Route>
  ))
  useEffect(()=>{
    if(localStorage.getItem('user')){
      setIsUser(true)
    }
  },[localStorage.getItem('user')])
  return (
    <div className="App">
      <RouterProvider router={isUser? router : route } />     

    </div>
  );
}

export default App;

