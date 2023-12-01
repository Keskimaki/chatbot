import useChats from './hooks/useChats'

const App = () => {
  const { chats, isLoading } = useChats()

  // TODO: Add loading indicator
  if (isLoading) return null

  console.log(chats)

  return (
    <div>
      <h1>Chats</h1>
      <ul>
        {chats.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
