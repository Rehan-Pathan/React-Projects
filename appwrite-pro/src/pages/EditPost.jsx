import { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPosts] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post)
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  return post ? (
    <div className="py-8 bg-gray-100 min-h-screen">
      <Container>
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Edit Post
        </h1>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-medium text-gray-600">Loading...</p>
    </div>
  )
}

export default EditPost
