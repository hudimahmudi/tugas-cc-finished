import { useState } from 'react'
import { login } from '../api.js'

function Login({ onLogin, onRegister }) {
  const [googleNotice, setGoogleNotice] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setIsSubmitting(true)
    setLoginError('')
    try {
      const response = await login({
        email: formData.get('email')?.toString().trim().toLowerCase(),
        password: formData.get('password')?.toString(),
      })
      onLogin(response)
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page login-page border-transparent">
      <section className="auth-card login-card">
        <a className="brand auth-brand" href="#" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark">c</span>
          <span>Creatore<span className="brand-dot">.</span></span>
        </a>
        <div className="auth-heading">
          <h1 className="text-white-800">Sign in to Creatore</h1>
          <p>Manage your ideas and content production workflow.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" placeholder="name@email.com" autoComplete="email" required onChange={() => setLoginError('')} />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required minLength="8" onChange={() => setLoginError('')} />
          <button className="bg-purple-600 hover:bg-purple-700 auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
          {loginError && <p className="login-error" role="alert">{loginError}</p>}
        </form>
        {/* <div className="demo-account-hint">
          <strong>Demo account</strong>
          <span>creator@example.com · password123</span>
        </div> */}
        <div className="auth-divider"><span>or sign in with</span></div>
        <button className="google-login-button" type="button" onClick={() => setGoogleNotice('Google sign-in is not available yet. Use your email and password, or configure OAuth first.')}>
          <svg aria-hidden="true" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.27 5.64c4.25-3.92 7.5-9.73 7.5-17.29Z" />
            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.2A23.92 23.92 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.27-5.64c-2.02 1.35-4.6 2.15-8.64 2.15-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
          </svg>
          Continue with Google
        </button>
        {googleNotice && <p className="google-login-notice" role="status">{googleNotice}</p>}
        <p className="auth-switch">
          Don&apos;t have an account? <button className="text-button" type="button" onClick={onRegister}>Create one</button>
        </p>
        <p className="auth-footnote">
          By signing in, you agree to our <a href="#" onClick={(event) => event.preventDefault()}>Terms of Service</a> and <a href="#" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.
        </p>
      </section>
    </main>
  )
}

export default Login
