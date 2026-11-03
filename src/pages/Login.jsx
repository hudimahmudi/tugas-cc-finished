import { useState } from 'react'
import { login } from '../api.js'

function Login({ onLogin, onRegister }) {
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
