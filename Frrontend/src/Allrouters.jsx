import React from 'react'
import Furnishings from './Pages/Furnishings'
import Furniture from './Pages/Furniture'
import HomeDecor from './Pages/HomeDecor'
import KitchenDining from './Pages/KitchenDining'
import LampLighting from './Pages/LampLighting'
import SofasMattress from './Pages/SofasMattress'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Favourites from './Pages/Favourites'
import Cart from './Pages/Cart'
import App from './App'
import Sofadetails from './Pages/Sofadetails'
import Furnituredetails from './Pages/Furnituredetails'
import Homedecordetails from './Pages/Homedecordetails'
import Furnishingsdetails from './Pages/Furnishingsdetails'
import Kitchendiningdetails from './Pages/Kitchendiningdetails'
import Lamplightingsdetails from './Pages/Lamplightingsdetails'
import Checkout from './Pages/Checkout'
import Home from './Pages/Home'

import AdminRegister from './Admin/AdminRegister'
import AdminLogin from './Admin/AdminLogin'
import AdminDashboard from './Admin/Admindashboard'
import ProductList from './Admin/Products/ProductList'
import AddProduct from './Admin/Products/AddProduct'
import EditProduct from './Admin/Products/EditProduct'
import AdminUsers from './Admin/Adminusers'
import AdminProfile from './Admin/AdminProfile'
import AdminOrders from './Admin/AdminOrders'
import AdminProtectedRoute from './Components/AdminProtectedRoute'
import UserLayout from './Components/UserLayout'
import Orders from './Pages/Orders'

const Allrouters = () => {
  return (
    <Routes>

      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Furniture" element={<Furniture />} />
        <Route path="/Furnishings" element={<Furnishings />} />
        <Route path="/HomeDecor" element={<HomeDecor />} />
        <Route path="/Kitchen&Dining" element={<KitchenDining />} />
        <Route path="/Lamp&Lighting" element={<LampLighting />} />
        <Route path="/Sofas&Mattress" element={<SofasMattress />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Favourites" element={<Favourites />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/App" element={<App />} />
        <Route path="/Sofadetails/:id" element={<Sofadetails />} />
        <Route path="/Furnituredetails/:id" element={<Furnituredetails />} />
        <Route path="/Homedecordetails/:id" element={<Homedecordetails />} />
        <Route path="/Furnishingsdetails/:id" element={<Furnishingsdetails />} />
        <Route path="/Kitchendiningdetails/:id" element={<Kitchendiningdetails />} />
        <Route path="/Lamplightingsdetails/:id" element={<Lamplightingsdetails />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Orders" element={<Orders/>} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

<Route  path="/admin/dashboard"element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute> }/>
<Route path="/admin/products" element={ <AdminProtectedRoute><ProductList /> </AdminProtectedRoute>}/>
<Route path="/admin/products/add" element={<AdminProtectedRoute><AddProduct /></AdminProtectedRoute>}/>
<Route path="/admin/products/edit/:category/:id" element={<AdminProtectedRoute><EditProduct /></AdminProtectedRoute>}/>
<Route path="/admin/users" element={<AdminProtectedRoute> <AdminUsers /></AdminProtectedRoute>}/>
<Route path="/admin/profile"element={<AdminProtectedRoute><AdminProfile /></AdminProtectedRoute>}/>
<Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />

    </Routes>
  )
}

export default Allrouters