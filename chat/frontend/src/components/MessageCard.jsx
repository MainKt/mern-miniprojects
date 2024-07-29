export default function MessageCard({ message }) {
  return (
    <article >
      <header style={
        {
          'display': 'flex',
          'justifyContent': 'space-between'
        }
      }>
        <strong>{message.author.username}</strong>
        <small>
          <time dateTime={new Date(message.timestamp).toISOString()}>
            {new Date(message.timestamp).toLocaleString()}
          </time>
        </small>
      </header>
      <p>{message.content}</p>
    </article>
  );
}
