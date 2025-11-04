import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';

const Header = () => {
    const { getItemCount } = useCart();
    const { isAuthenticated } = useAuth();

    return (
        <header className="header sticky">
            <div className="header-container">
                {/* Logo SVG */}
                <div className="header-brand">
                    <Link to="/" className="brand-title">
                    <img 
                    src="/clothing-store-.svg" 
                    alt="depoteek" 
                    className="h-15 w-auto"
                    />
                    </Link>
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Products</Link>
                    {isAuthenticated() ? (
                        <>
                        <Link to='/profile' className="nav-link">
                        Profile
                        </Link>
                        </>
                    ) : (
                        <>
                        <Link to='/login' className="nav-link">Login</Link>
                        </>
                    )}

                    <Link to="/cart" className="nav-link relative">
                    <div className="flex items-center space-x-1">
                        <ShoppingCart size={20} />
                        <span></span>
                    </div>
                    {getItemCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{getItemCount()}</span>
                    )}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;