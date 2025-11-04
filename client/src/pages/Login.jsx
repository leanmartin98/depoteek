import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/components.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData);

        if (result.success) {
            navigate('/products');
        } else {
            setError(result.error)
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Sign In</h2>

                {error && (
                    <div className="auth-error">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="tu@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Tu contraseña"
                        />
                    </div>

                    <button 
                    type="submit" 
                    disabled={loading}
                    className="form-button"
                    >
                    {loading ? 'logging in...' : 'Log in'}</button>
                </form>

                <p className="auth-footer">
                    Dont't have an account?{' '}
                    <Link to='/register' className="auth-link">
                    Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;