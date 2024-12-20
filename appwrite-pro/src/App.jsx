import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="flex-grow px-4 py-6 sm:px-6 md:px-8 lg:px-16">
        <Outlet />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  ) : null
}

export default App
