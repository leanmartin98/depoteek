import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Products from './pages/Products';
import Footer from './components/Footer';


function App() {
  return (
    <CartProvider>
      <Router>
        <div className='min-h-screen bg-gray-50 flex flex-col'>
          <Header />
          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/cart' element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}
export default App;