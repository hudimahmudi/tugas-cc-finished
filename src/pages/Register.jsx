import { useState } from 'react'

function Register({ onRegister, onLogin }) {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const password = formData.get('password').toString()
    const confirmation = formData.get('password_confirmation').toString()
    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }

    setError('')
    setIsSubmitting(true)
    try {
      await onRegister({
        name: formData.get('name').toString().trim(),
        email: formData.get('email').toString().trim().toLowerCase(),
        password,
        role: formData.get('role').toString(),
      })
      window.alert('Akun berhasil dibuat. Silakan masuk menggunakan email dan password Anda.')
      onLogin()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page register-page">
      <section className="auth-card display-center">
        <a className="brand auth-brand" href="#" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark">c</span>
          <span>Creatore<span className="brand-dot">.</span></span>
        </a>
        <div className="auth-heading">
          <h1>Start your creative journey</h1>
          <p>Create an account to plan and manage your content.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full name</label>
          <input id="register-name" name="name" type="text" autoComplete="name" maxLength="100" placeholder="Full name" required />
          <label htmlFor="register-email">Email</label>
          <input id="register-email" name="email" type="email" autoComplete="email" maxLength="191" placeholder="name@email.com" required />
          <label htmlFor="register-role">Account role</label>
          <select id="register-role" name="role" defaultValue="creator" required>
            <option value="creator">Creator</option>
            <option value="editor">Editor</option>
          </select>
          <small className="register-role-hint">Creators manage their content. Editors work on content assigned to them.</small>
          <label htmlFor="register-password">Password</label>
          <input id="register-password" name="password" type="password" autoComplete="new-password" minLength="8" maxLength="72" placeholder="Minimal 8 karakter" required />
          <label htmlFor="register-password-confirmation">Confirm password</label>
          <input id="register-password-confirmation" name="password_confirmation" type="password" autoComplete="new-password" minLength="8" maxLength="72" placeholder="Re-enter your password" required />
          <label className="remember-option"><input name="terms" type="checkbox" required /> I agree to the terms and conditions</label>
          <button className="button-primary auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
          {error && <p className="login-error" role="alert">{error}</p>}
        </form>
        <p className="auth-switch">Already have an account? <button className="text-button" type="button" onClick={onLogin}>Sign in</button></p>
      </section>
    </main>
  )
}

export default Register
