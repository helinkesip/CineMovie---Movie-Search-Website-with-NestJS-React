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
  Movie as MovieIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      const data = await registerUser(email, password);
      localStorage.setItem('token', data.access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: 6,
          width: '100%',
          maxWidth: 450,
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <MovieIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
            <Typography variant="h4" fontWeight="bold" color="primary">
              CineMovie
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="600" color="text.secondary" gutterBottom>
            Create Your Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join us and start building your movie collection
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
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
              sx: {
                background: '#fff',
                color: '#222',
                borderRadius: 2,
                fontSize: '1rem',
                boxShadow: 'none',
                '& input': {
                  color: '#222',
                  background: 'transparent',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#888',
                fontWeight: 500,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                background: '#fff',
                color: '#222',
                boxShadow: 'none',
                '& fieldset': {
                  borderColor: '#d1c4e9',
                },
                '&:hover fieldset': {
                  borderColor: '#b39ddb',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7c4dff',
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
            autoComplete="new-password"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                background: '#fff',
                color: '#222',
                borderRadius: 2,
                fontSize: '1rem',
                boxShadow: 'none',
                '& input': {
                  color: '#222',
                  background: 'transparent',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#888',
                fontWeight: 500,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                background: '#fff',
                color: '#222',
                boxShadow: 'none',
                '& fieldset': {
                  borderColor: '#d1c4e9',
                },
                '&:hover fieldset': {
                  borderColor: '#b39ddb',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7c4dff',
                },
              },
            }}
          />

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                background: '#fff',
                color: '#222',
                borderRadius: 2,
                fontSize: '1rem',
                boxShadow: 'none',
                '& input': {
                  color: '#222',
                  background: 'transparent',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#888',
                fontWeight: 500,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                background: '#fff',
                color: '#222',
                boxShadow: 'none',
                '& fieldset': {
                  borderColor: '#d1c4e9',
                },
                '&:hover fieldset': {
                  borderColor: '#b39ddb',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7c4dff',
                },
              },
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
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
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              boxShadow: '0 3px 15px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
              },
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link 
              href="/login" 
              color="primary" 
              underline="hover"
              sx={{ 
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage; 