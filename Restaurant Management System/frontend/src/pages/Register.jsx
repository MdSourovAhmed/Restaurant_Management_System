// import AuthForm from '../components/AuthForm';

// const Signup = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <AuthForm type="signup" />
//     </div>
//   );
// };

// export default Signup;



import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await register(data.name, data.email, data.password,data.role);
      console.log(data);
      navigate('/events');
    } catch (err) {
      throw new Error('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <AuthForm onSubmit={handleSubmit} isLogin={false} />
    </div>
  );
}

export default Register;