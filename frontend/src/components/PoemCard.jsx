import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PoemCard = ({ poem }) => {
  const truncateContent = (content, maxLength = 150) => {
    return content.length > maxLength 
      ? content.substring(0, maxLength) + '...' 
      : content
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">
          <Link 
            to={`/poem/${poem._id}`}
            className="hover:text-primary-600 transition-colors"
          >
            {poem.title}
          </Link>
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {poem.category}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
        {truncateContent(poem.content)}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>By {poem.author?.username}</span>
          <span>{new Date(poem.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>❤️ {poem.likes?.length || 0}</span>
          <span>💬 {poem.comments?.length || 0}</span>
        </div>
      </div>
      
      {poem.tags && poem.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {poem.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default PoemCard