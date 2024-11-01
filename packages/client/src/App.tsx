import { useState, useEffect } from 'react'
import { trpc } from './trpc'
import type { User } from 'api-server'

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [updateId, setUpdateId] = useState<number | null>(null)
  const [updateName, setUpdateName] = useState('')

  const fetchUsers = async () => {
    const users = await trpc.getUsers.query()
    setUsers(users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = async () => {
    const newUser = await trpc.addUser.mutate({ name })
    setUsers([...users, newUser])
    setName('')
  }

  const updateUser = async () => {
    if (updateId !== null) {
      const updatedUser = await trpc.updateUser.mutate({
        id: updateId,
        name: updateName,
      })
      setUsers(users.map((user) => (user.id === updateId ? updatedUser : user)))
      setUpdateId(null)
      setUpdateName('')
    }
  }

  const deleteUser = async (id: number) => {
    const deletedUser = await trpc.deleteUser.mutate(id)
    setUsers(users.filter((user) => user.id !== deletedUser.id))
  }

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Add User</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button onClick={addUser}>Add</button>
      </div>
      <div>
        <h2>Update User</h2>
        <input
          value={updateId ?? ''}
          onChange={(e) => setUpdateId(Number(e.target.value))}
          placeholder="User ID"
        />
        <input
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          placeholder="New Name"
        />
        <button onClick={updateUser}>Update</button>
      </div>
    </div>
  )
}

export default App
