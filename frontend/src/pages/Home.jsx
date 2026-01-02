import { useState, useEffect } from 'react'
import axios from 'axios'
import PoemCard from '../components/PoemCard'
import { motion } from 'framer-motion'

const Home = () => {
  const [poems, setPoems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/poems`)
        setPoems(response.data.poems)
      } catch (error) {
        console.error('Error fetching poems:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPoems()
  }, [])

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
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Poetry Forum
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover, share, and celebrate the art of poetry with fellow enthusiasts
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poems.map((poem) => (
          <PoemCard key={poem._id} poem={poem} />
        ))}
      </div>

      {poems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No poems available yet.</p>
        </div>
      )}
    </div>
  )
}

export default Home