import Login from '../components/Auth/Login';

function LoginPage() {
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Login</h1>
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;

