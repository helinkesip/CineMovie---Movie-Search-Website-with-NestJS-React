import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Movie as MovieIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.access_token);
      setToken(data.access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #18192a 0%, #1a1333 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
      }}
    >
      {/* Neon bokeh overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(circle at 20% 30%, #7c4dff22 0%, transparent 60%),
                      radial-gradient(circle at 80% 70%, #ff6ec422 0%, transparent 60%)`,
        }}
      />
      <Paper
        elevation={24}
        sx={{
          p: 6,
          width: '100%',
          maxWidth: 450,
          borderRadius: 4,
          background: 'rgba(30, 25, 50, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid #7c4dff44',
          boxShadow: '0 8px 32px 0 #7c4dff33',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <MovieIcon sx={{ fontSize: 40, color: '#a084ff', mr: 1, filter: 'drop-shadow(0 0 8px #7c4dff88)' }} />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: '#fff',
                letterSpacing: 2,
                textShadow: '0 0 16px #7c4dff88, 0 2px 8px #000a',
              }}
            >
              CineMovie
            </Typography>
          </Box>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{
              color: '#e0e0ff',
              textShadow: '0 0 8px #7c4dff44',
            }}
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: '#b39ddb', fontWeight: 500 }}>
            Sign in to your account to continue
          </Typography>
        </Box>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#a084ff' }} />
                </InputAdornment>
              ),
              sx: {
                background: 'transparent',
                color: '#fff',
                borderRadius: 2,
                fontSize: '1rem',
                boxShadow: 'none',
                '& input': {
                  color: '#fff',
                  background: 'transparent',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#b39ddb',
                fontWeight: 500,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                background: 'transparent',
                color: '#fff',
                boxShadow: 'none',
                border: '1.5px solid #7c4dff44',
                '&:hover fieldset': {
                  borderColor: '#a084ff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff6ec4',
                  boxShadow: '0 0 8px #ff6ec488',
                },
              },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#a084ff' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon sx={{ color: '#a084ff' }} /> : <VisibilityIcon sx={{ color: '#a084ff' }} />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                background: 'transparent',
                color: '#fff',
                borderRadius: 2,
                fontSize: '1rem',
                boxShadow: 'none',
                '& input': {
                  color: '#fff',
                  background: 'transparent',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#b39ddb',
                fontWeight: 500,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                background: 'transparent',
                color: '#fff',
                boxShadow: 'none',
                border: '1.5px solid #7c4dff44',
                '&:hover fieldset': {
                  borderColor: '#a084ff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff6ec4',
                  boxShadow: '0 0 8px #ff6ec488',
                },
              },
            }}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 2, background: 'rgba(60, 30, 80, 0.95)', color: '#fff', border: '1.5px solid #ff6ec4', '& .MuiAlert-message': { color: '#fff' } }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #7c4dff 30%, #ff6ec4 90%)',
              boxShadow: '0 3px 15px #7c4dff55, 0 0 16px #ff6ec488',
              color: '#fff',
              letterSpacing: 1,
              '&:hover': {
                background: 'linear-gradient(45deg, #ff6ec4 0%, #7c4dff 100%)',
                boxShadow: '0 6px 20px #ff6ec488',
              },
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: '#b39ddb' }}>
            Don't have an account?{' '}
            <Link
              href="/register"
              color="primary"
              underline="hover"
              sx={{
                fontWeight: 600,
                textDecoration: 'none',
                color: '#ff6ec4',
                '&:hover': {
                  textDecoration: 'underline',
                  color: '#fff',
                }
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage; 