import { useState } from 'react'

type User = {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: User[] = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter((user) => {
    if (searchQuery.length < 3) return true
    return user.email.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="user-table-container">
      <button onClick={fetchUsers} disabled={loading} style={{ marginBottom: '10px' }}>
        {loading ? 'Загрузка...' : 'Загрузить пользователей'}
      </button>

      {/* Поле поиска (Вариант 6) */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Поиск по email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '5px', width: '200px' }}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {users.length > 0 && (
        <>
           {/* Сообщение, если ничего не найдено (Вариант 6) */}
          {filteredUsers.length === 0 && searchQuery.length >= 3 && (
             <p>Ничего не найдено</p>
          )}

          {filteredUsers.length > 0 && (
            <table border={1} style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Телефон</th>
                  <th>Сайт</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                        {user.website}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}
