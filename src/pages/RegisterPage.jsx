import Register from '../components/Auth/Register';

function RegisterPage() {
  const handleRegister = (token) => {
    localStorage.setItem('token', token);
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Register</h1>
      <Register onRegister={handleRegister} />
    </div>
  );
}

export default RegisterPage;