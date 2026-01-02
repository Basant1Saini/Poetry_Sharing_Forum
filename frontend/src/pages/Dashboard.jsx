import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PoemCard from '../components/PoemCard'
import axios from 'axios'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { user } = useAuth()
  const [userPoems, setUserPoems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserPoems = async () => {
      try {
        // In a real app, you'd have an endpoint to get user's poems
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/poems`)
        // Filter poems by current user (this would be done on backend)
        const filteredPoems = response.data.poems.filter(
          poem => poem.author._id === user.id
        )
        setUserPoems(filteredPoems)
      } catch (error) {
        console.error('Error fetching user poems:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchUserPoems()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome back, {user?.username}!
        </h1>
        <div className="flex space-x-4">
          <Link to="/create" className="btn-primary">
            Write New Poem
          </Link>
          <Link to="/profile" className="btn-secondary">
            Edit Profile
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Your Poems</h2>
          {userPoems.length > 0 ? (
            <div className="space-y-6">
              {userPoems.map((poem) => (
                <PoemCard key={poem._id} poem={poem} />
              ))}
            </div>
          ) : (
            <div className="card text-center">
              <p className="text-gray-500 mb-4">You haven't written any poems yet.</p>
              <Link to="/create" className="btn-primary">
                Write Your First Poem
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Poems Written:</span>
                <span className="font-medium">{userPoems.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Likes:</span>
                <span className="font-medium">
                  {userPoems.reduce((total, poem) => total + (poem.likes?.length || 0), 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Comments:</span>
                <span className="font-medium">
                  {userPoems.reduce((total, poem) => total + (poem.comments?.length || 0), 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <p className="text-gray-500 text-sm">
              Activity feed coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard