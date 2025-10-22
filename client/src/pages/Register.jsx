import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components.css';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await register(formData);

        if (result.success) {
            navigate('/products');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <h2 className='auth-title'>Crear Cuenta</h2>

                {error && (
                    <div className='auth-error'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='form-group'>
                        <label className="form-label">Nombre</label>
                        <input 
                        type='text'
                        name='first_name'
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className='form-input'
                        placeholder='Nancy'
                        />
                    </div>

                    <div className='form-group'>
                        <label className="form-label">Apellido</label>
                        <input 
                        type='text'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className='form-input'
                        placeholder='Pelosi'
                        />
                    </div>

                    <div className='form-group'>
                        <label className="form-label">Email</label>
                        <input 
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='form-input'
                        placeholder='tu@email.com'
                        />
                    </div>

                    <div className='form-group'>
                        <label className="form-label">Contraseña</label>
                        <input 
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className='form-input'
                        placeholder='Minimo 6 caracteres'
                        />
                        <p className='form-helper'>Debe contener letras y números</p>
                    </div>

                    <button 
                    type='submit'
                    disabled={loading}
                    className='form-button'>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className='auth-footer'>
                    ¿Ya tienes cuenta?{' '}
                    <Link to='/login' className='auth-link'>
                    Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;