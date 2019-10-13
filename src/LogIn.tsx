import React, { useContext, useState } from 'react';
import { AuthContext } from './Authentication';
import Definition from './GenericComponents/Definition';
import { Link } from 'react-router-dom'

const LogIn = () => {
    
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setEmailWrapper = email => {
        setEmail(email);
    }

    const onLogIn = () => {
        alert(`email: ${email} and pass: ${password}`);
        return false;
    }

    const forgotPassword = () => {
        alert('forgot password');
    }

    const renderLoginForm = () => 
        <form onSubmit={onLogIn}>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" onChange={e => setEmailWrapper(e.target.value)} value={email} placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <small className="form-text text-muted" onClick={forgotPassword}>Forgot your password?</small>
            <button type="submit" className="btn btn-primary">Log In</button>
            <Link to="/signup">Create Account</Link>
        </form>
    
    return (
        <Definition title="Login" body={renderLoginForm()}></Definition>
    )
}

export default LogIn;