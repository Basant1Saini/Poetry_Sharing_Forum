import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PoemCard from '../components/PoemCard'
import { motion } from 'framer-motion'

const Profile = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [userPoems, setUserPoems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, poemsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/poems`)
        ])
        
        setUser(userResponse.data)
        // Filter poems by user (this would be done on backend)
        const filteredPoems = poemsResponse.data.poems.filter(
          poem => poem.author._id === id
        )
        setUserPoems(filteredPoems)
      } catch (error) {
        setError('User not found')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error || 'User not found'}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-600">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {user.profile?.firstName && user.profile?.lastName 
                ? `${user.profile.firstName} ${user.profile.lastName}`
                : user.username
              }
            </h1>
            <p className="text-gray-600 mb-2">@{user.username}</p>
            
            {user.profile?.bio && (
              <p className="text-gray-700 mb-4">{user.profile.bio}</p>
            )}
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>{userPoems.length} Poems</span>
              <span>{user.followers?.length || 0} Followers</span>
              <span>{user.following?.length || 0} Following</span>
              {user.profile?.location && (
                <span>📍 {user.profile.location}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Poems by {user.username}
        </h2>
        
        {userPoems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPoems.map((poem) => (
              <PoemCard key={poem._id} poem={poem} />
            ))}
          </div>
        ) : (
          <div className="card text-center">
            <p className="text-gray-500">
              {user.username} hasn't published any poems yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile