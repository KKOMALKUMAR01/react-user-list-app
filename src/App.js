import {useState, useEffect, useContext} from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import UserDetail from './UserDetail'
import {UsersContext} from './UsersContext'
import './App.css'

const HomePage = () => {
  const {users, setUsers, loading, error} = useContext(UsersContext)
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSearch = event => {
    setSearch(event.target.value)
  }

  const handleSort = () => {
    const sorted = [...users].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name)
      }
      return b.name.localeCompare(a.name)
    })
    setUsers(sorted)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="home-page">
      <h1>User List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
        />
        <button type="button" onClick={handleSort}>
          Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
      </div>
      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-item">
            <Link to={`/user/${user.id}`}>
              {user.name} | {user.email} | {user.address.city}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  )
}

export default App
