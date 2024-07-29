export default function Blog({
  blog: { title, date, content }
}) {
  return <>
    <article>
      <header className="pico-background-slate-600">
        <h2>{title}</h2>
        <time dateTime={date.toLocaleDateString()}>{date.toDateString()}</time>
      </header>
      <section>
        {content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </section>
    </article>
  </>
}
