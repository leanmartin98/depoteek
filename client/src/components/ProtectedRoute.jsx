import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Mientras carga, mostrar loading
    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-2xl font-bold'></div>
            </div>
        );
    }

    // Si no está autenticado, redirigir a login
    if (!isAuthenticated()) {
        return <Navigate to='/login' replace />;
    }

    return children;
};

export default ProtectedRoute;