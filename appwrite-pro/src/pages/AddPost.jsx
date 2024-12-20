import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <Container>
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Add a New Post
          </h1>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost
