import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await api.post(url, form);
      login(data);
      toast.success(isLogin ? 'Login successful' : 'Registration successful');
      navigate('/chatbot');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto glass p-6 rounded-xl'>
      <h2 className='text-2xl font-bold mb-4'>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit} className='space-y-3'>
        {!isLogin && (
          <input
            required
            className='w-full p-2 rounded'
            placeholder='Name'
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          required
          className='w-full p-2 rounded'
          type='email'
          placeholder='Email'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          required
          className='w-full p-2 rounded'
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button disabled={loading} className='w-full bg-emerald-600 text-white py-2 rounded disabled:opacity-70'>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create account'}
        </button>
      </form>
      <button className='mt-3 underline' onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Already have account? Login'}
      </button>
    </div>
  );
}
