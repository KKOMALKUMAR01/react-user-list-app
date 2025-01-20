import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import './UserDetail.css'

const UserDetail = () => {
  const {id} = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`
          https://jsonplaceholder.typicode.com/users/${id}`)
        const data = await response.json()
        setUser(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch user details')
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [id])

  const handleGoBack = () => {
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="user-detail">
      <h1>{user.name}'s Details</h1>
      <p>
        <span className="user-detail-heading">Email:</span>
        <span className="user-detail-info">{user.email}</span>
      </p>
      <p>
        <span className="user-detail-heading">Phone:</span>
        <span className="user-detail-info">{user.phone}</span>
      </p>
      <p>
        <span className="user-detail-heading">Website:</span>
        <span className="user-detail-info">{user.website}</span>
      </p>

      <div className="user-detail-address">
        <p className="address-heading">Address:</p>
        <p>
          {user.address.street}, {user.address.suite}, {user.address.city},{' '}
          {user.address.zipcode}
        </p>
      </div>

      <div className="back-button">
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  )
}

export default UserDetail
