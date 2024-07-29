import { useState } from 'react'
import { blogs } from './blogs'
import Blog from './components/Blog'
import { BlogCard } from './components/BlogCard'

function App() {
  const [blog, setBlog] = useState(null)

  return (
    <>
      <header className='container'>
        <h1 style={{ cursor: 'pointer', fontFamily: 'monospace' }} onClick={() => setBlog(null)}>
          <mark>blog.js</mark>
        </h1>
        <p>Your Go-To Hub for All Things JavaScript!</p>
      </header>

      <hr />

      <main className='container'>
        {
          blog != null ?
            <Blog blog={blog} />
            :
            blogs.map((blog, i) =>
              <BlogCard key={i} blog={blog} onClick={() => setBlog(blog)} />
            )
        }
      </main>

      <hr />

      <footer className='container'>
        <small>&copy; 2024 blog.js - All rights reserved</small>
      </footer>
    </>
  )
}

export default App
