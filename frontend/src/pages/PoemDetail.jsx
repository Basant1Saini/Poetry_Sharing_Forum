import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const PoemDetail = () => {
  const { id } = useParams()
  const [poem, setPoem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/poems/${id}`)
        setPoem(response.data)
      } catch (error) {
        setError('Poem not found')
      } finally {
        setLoading(false)
      }
    }

    fetchPoem()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !poem) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error || 'Poem not found'}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <header className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{poem.title}</h1>
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
              {poem.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center space-x-4">
              <span>By {poem.author?.username}</span>
              <span>•</span>
              <span>{new Date(poem.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>❤️ {poem.likes?.length || 0}</span>
              <span>💬 {poem.comments?.length || 0}</span>
            </div>
          </div>
        </header>
        
        <div className="prose max-w-none mb-6">
          <pre className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-gray-800">
            {poem.content}
          </pre>
        </div>
        
        {poem.tags && poem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {poem.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">
            Comments ({poem.comments?.length || 0})
          </h3>
          
          {poem.comments && poem.comments.length > 0 ? (
            <div className="space-y-4">
              {poem.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{comment.user?.username}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </motion.article>
    </div>
  )
}

export default PoemDetail