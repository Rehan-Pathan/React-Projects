import { Login as LoginComponent } from '../components'

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="w-full max-w-md">
        <LoginComponent />
      </div>
    </div>
  )
}

export default Login
