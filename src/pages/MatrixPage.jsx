import { useMemo } from 'react'
import { ArrowUpRight, BarChart3, Eye, Heart, MessageCircle, Share2, Video } from 'lucide-react'

const metrics = [
  { key: 'views', label: 'Views', icon: Eye },
  { key: 'comments', label: 'Comments', icon: MessageCircle },
  { key: 'likes', label: 'Likes', icon: Heart },
  { key: 'shares', label: 'Shares', icon: Share2 },
]

function formatMetric(value) {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) ? numericValue.toLocaleString('en-US') : '0'
}

function MatrixPage({ contents }) {
  const publishedContents = contents.filter((content) => content.status === 'published')
  const totals = useMemo(() => metrics.reduce((result, metric) => {
    result[metric.key] = publishedContents.reduce((sum, content) => sum + (Number(content.metrics?.[metric.key]) || 0), 0)
    return result
  }, {}), [publishedContents])

  return (
    <div className="matrix-page">
      <header className="matrix-heading">
        <div>
          <span className="matrix-kicker"><BarChart3 size={14} /> CONTENT ANALYTICS</span>
          <h1>Content Matrix</h1>
          <p>Track the performance of published content across all platforms.</p>
        </div>
        <span className="matrix-published-count"><Video size={15} /> {publishedContents.length} published</span>
      </header>

      <section className="matrix-summary" aria-label="Published content performance totals">
        {metrics.map(({ key, label, icon: Icon }) => (
          <article className={`matrix-summary-card matrix-${key}`} key={key}>
            <span className="matrix-summary-icon"><Icon size={17} /></span>
            <span><small>Total {label.toLowerCase()}</small><strong>{formatMetric(totals[key])}</strong></span>
            <ArrowUpRight className="matrix-summary-trend" size={16} />
          </article>
        ))}
      </section>

      <section className="matrix-table-card">
        <div className="matrix-table-heading">
          <div><h2>Published performance</h2><p>Metrics for all content that has been published.</p></div>
          <span>{publishedContents.length} posts</span>
        </div>
        {publishedContents.length ? (
          <div className="matrix-table-scroll">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Content</th><th>Platform</th><th>Published date</th>
                  <th><Eye size={13} /> Views</th><th><MessageCircle size={13} /> Comments</th>
                  <th><Heart size={13} /> Likes</th><th><Share2 size={13} /> Shares</th>
                </tr>
              </thead>
              <tbody>
                {publishedContents.map((content) => (
                  <tr key={content.id}>
                    <td><strong>{content.title}</strong><small>{content.format}</small></td>
                    <td><span className={`matrix-platform platform-${content.channel.toLowerCase()}`}>{content.channel}</span></td>
                    <td>{content.date}</td>
                    {metrics.map(({ key }) => <td className="matrix-number" key={key}>{formatMetric(content.metrics?.[key])}</td>)}
                  </tr>
                ))}
                <tr className="matrix-total-row">
                  <td colSpan="3"><strong>Total performance</strong></td>
                  {metrics.map(({ key }) => <td className="matrix-number" key={key}><strong>{formatMetric(totals[key])}</strong></td>)}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="matrix-empty">
            <span><BarChart3 size={21} /></span>
            <strong>No content has been published yet</strong>
            <p>Views, comments, likes, and shares will appear here after content is published.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default MatrixPage
