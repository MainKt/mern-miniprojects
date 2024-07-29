export function BlogCard({
  blog: { title, date },
  onClick
}) {
  return (
    <article style={{ cursor: 'pointer' }} onClick={onClick}>
      <header className="pico-background-slate-600">
        <h2>{title}</h2>
      </header>
      <small>
        <time dateTime={date.toLocaleDateString()}>{date.toDateString()}</time>
      </small>
    </article>
  )
}
