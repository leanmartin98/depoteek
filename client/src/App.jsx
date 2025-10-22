import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from "./components/Header";
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Products from './pages/Products';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';


function App() {
  return (
  <AuthProvider>
    <CartProvider>
      <Router>
        <div className='min-h-screen bg-gray-50 flex flex-col'>
          <Header />
          <main className='flex-grow'>
            <Routes>
              {/* Rutas públicas */}
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              {/* Rutas protegidas */}
              <Route path='/cart' element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
                } />

              <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
                } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  </AuthProvider>
  )
}
export default App;