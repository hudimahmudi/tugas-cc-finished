import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  Clock3,
  FileText,
  FileVideo,
  MoreHorizontal,
  Music2,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from '../components/ui.jsx'
import { contentStatuses, getContentStatus } from '../contentWorkflow.js'

const statusColors = {
  idea: 'status-idea',
  scripting: 'status-writing',
  recording: 'status-production',
  editing: 'status-editing',
  ready: 'status-ready',
  published: 'status-published',
}

const platformIcons = {
  YouTube: FileVideo,
  Instagram: Camera,
  TikTok: Music2,
  LinkedIn: BriefcaseBusiness,
}

function Dashboard({ contents, onViewAll, onAddContent, canCreate, role }) {
  const weeklyGoal = 5
  const monthlyGoal = 20
  const currentMonth = new Date()
  const monthContents = contents.filter((content) => {
    if (!content.scheduledDate) return false
    const scheduledDate = new Date(`${content.scheduledDate}T00:00:00`)
    return scheduledDate.getFullYear() === currentMonth.getFullYear()
      && scheduledDate.getMonth() === currentMonth.getMonth()
  })
  const monthProgressCount = monthContents.filter((content) => !['idea', 'published'].includes(content.status)).length
  const monthCompletedCount = monthContents.filter((content) => ['ready', 'published'].includes(content.status)).length
  const monthlyProgress = monthContents.length
    ? Math.round((monthCompletedCount / monthContents.length) * 100)
    : 0
  const monthlyGoalProgress = Math.min(100, Math.round((monthCompletedCount / monthlyGoal) * 100))
  const monthlyGoalRemaining = Math.max(0, monthlyGoal - monthCompletedCount)
  const monthLabel = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const weekStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentMonth.getDate() - ((currentMonth.getDay() + 6) % 7))
  const weekStartDate = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`
  const currentDate = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(currentMonth.getDate()).padStart(2, '0')}`
  const weeklyCompletedCount = contents.filter((content) =>
    content.status === 'published' && content.publishedDate >= weekStartDate && content.publishedDate <= currentDate,
  ).length
  const weeklyGoalProgress = Math.min(100, Math.round((weeklyCompletedCount / weeklyGoal) * 100))
  const weeklyGoalRemaining = Math.max(0, weeklyGoal - weeklyCompletedCount)
  const publishedCount = contents.filter((content) => content.status === 'published').length
  const inProgressCount = contents.filter((content) => !['idea', 'published'].includes(content.status)).length
  const stats = [
    { label: 'Total content', value: contents.length, note: 'Across all platforms', icon: FileText, tone: 'violet' },
    { label: 'In progress', value: inProgressCount, note: 'Currently being worked on', icon: Clock3, tone: 'amber' },
    { label: 'Published', value: publishedCount, note: 'Content published', icon: TrendingUp, tone: 'emerald' },
  ]

  return (
    <div className="dashboard-page">
      <Card className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <Badge className="dashboard-hero-badge"><Sparkles size={13} /> THIS WEEK</Badge>
          <h2>Every great piece of content starts with one idea.</h2>
          <p>You&apos;re one step closer to your goal. Keep going!</p>
          {canCreate && <Button variant="secondary" onClick={onAddContent}><Plus size={16} /> Add a new idea</Button>}
        </div>
        <div className="dashboard-hero-art" aria-hidden="true">
          <div className="dashboard-hero-orbit" />
          <div className="dashboard-idea-card">
            <span><Sparkles size={14} /> TODAY&apos;S IDEA</span>
            <strong>Content that<br />makes a difference</strong>
            <div className="dashboard-idea-lines"><i /><i /><i /></div>
          </div>
          <div className="dashboard-hero-star">✦</div>
        </div>
      </Card>

      <section className="dashboard-stats" aria-label="Content overview">
        {stats.map(({ label, value, note, icon: Icon, tone }) => (
          <Card className="dashboard-stat-card" key={label}>
            <div className={`dashboard-stat-icon ${tone}`}><Icon size={19} /></div>
            <div className="dashboard-stat-copy">
              <span>{label}</span>
              <strong>{value.toString().padStart(2, '0')}</strong>
              <small>{note}</small>
            </div>
            <span className="dashboard-stat-decoration"><ArrowUpRight size={18} /></span>
          </Card>
        ))}
      </section>

      <Card className="dashboard-content-card">
        <CardHeader className="dashboard-section-header">
          <div>
            <CardTitle>Recent content</CardTitle>
            <CardDescription>Ideas and work currently in progress.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onViewAll}>View all <ArrowRight size={15} /></Button>
        </CardHeader>
        <CardContent className="dashboard-table-content">
          {contents.length === 0 ? (
            <div className="dashboard-empty-state">
              <span><FileText size={22} /></span>
              <strong>No content yet</strong>
              <p>Start by adding your first idea.</p>
              {canCreate && <Button variant="outline" size="sm" onClick={onAddContent}><Plus size={14} /> Add a new idea</Button>}
            </div>
          ) : (
            <div className="dashboard-table-scroll">
              <table className="dashboard-table">
                <thead>
                  <tr><th>CONTENT TITLE</th><th>PLATFORM</th><th>STATUS</th><th>SCHEDULE</th><th aria-label="Actions" /></tr>
                </thead>
                <tbody>
                  {contents.slice(0, 4).map((content) => {
                    const PlatformIcon = platformIcons[content.channel] || FileText
                    return (
                      <tr key={content.id}>
                        <td>
                          <div className="dashboard-table-title">
                            <span className={`dashboard-platform-icon platform-${content.channel.toLowerCase()}`}><PlatformIcon size={17} /></span>
                            <span><strong>{content.title}</strong><small>{content.format} · {content.priority} priority{role !== 'creator' && content.ownerName ? ` · Owner: ${content.ownerName}` : ''}</small></span>
                          </div>
                        </td>
                        <td><span className="dashboard-platform-name">{content.channel}</span></td>
                        <td><Badge className={`dashboard-status ${statusColors[content.status] || 'status-idea'}`}><i />{getContentStatus(content.status).label}</Badge></td>
                        <td><span className="dashboard-date"><CalendarDays size={14} />{content.date}</span></td>
                        <td><Button variant="ghost" size="icon" aria-label={`View all content, including ${content.title}`} onClick={onViewAll}><MoreHorizontal size={18} /></Button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="dashboard-bottom-grid">
        <Card className="dashboard-goal-card">
          <CardHeader className="dashboard-section-header">
            <div>
              <CardTitle>Weekly goal</CardTitle>
              <CardDescription>Small steps lead to big results.</CardDescription>
            </div>
            <span className="dashboard-goal-icon"><Target size={20} /></span>
          </CardHeader>
          <CardContent>
            <div className="dashboard-goal-meta"><strong>{weeklyCompletedCount} of {weeklyGoal} items</strong><span>{weeklyGoalProgress}%</span></div>
            <Progress value={weeklyGoalProgress} />
            <p className="dashboard-helper"><Check size={14} />
              {weeklyGoalRemaining > 0
                ? `${weeklyGoalRemaining} more to reach this week's goal.`
                : 'Weekly goal achieved. Keep up the great work!'}
            </p>
            <div className="dashboard-monthly-goal">
              <div className="dashboard-monthly-goal-heading">
                <span><Target size={14} /> Monthly achievement</span>
                <strong>{monthLabel}</strong>
              </div>
              <div className="dashboard-goal-meta">
                <strong>{monthCompletedCount} of {monthlyGoal} items</strong>
                <span>{monthlyGoalProgress}%</span>
              </div>
              <Progress value={monthlyGoalProgress} className="dashboard-monthly-goal-progress" />
              <p className="dashboard-helper">
                <Check size={14} />
                {monthlyGoalRemaining > 0
                  ? `${monthlyGoalRemaining} more to reach this month's goal.`
                  : 'Monthly goal achieved. Keep up the great work!'}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-monthly-card">
          <CardHeader className="dashboard-section-header">
            <div>
              <CardTitle>Monthly progress</CardTitle>
              <CardDescription>Scheduled content status · {monthLabel}</CardDescription>
            </div>
            <span className="dashboard-monthly-icon"><ChartNoAxesCombined size={19} /></span>
          </CardHeader>
          <CardContent className="dashboard-monthly-content">
            <div className="dashboard-monthly-summary">
              <div><strong>{monthContents.length}</strong><span>This month</span></div>
              <div><strong>{monthProgressCount}</strong><span>In progress</span></div>
              <div><strong>{monthCompletedCount}</strong><span>Ready / published</span></div>
            </div>
            <div className="dashboard-monthly-progress-heading">
              <span>Completion rate</span><strong>{monthlyProgress}%</strong>
            </div>
            <Progress value={monthlyProgress} className="dashboard-monthly-progress" />
            <div className="dashboard-stage-breakdown">
              {contentStatuses.map((status) => {
                const count = monthContents.filter((content) => content.status === status.value).length
                const share = monthContents.length ? (count / monthContents.length) * 100 : 0
                return (
                  <div className="dashboard-stage-row" key={status.value}>
                    <span className={`dashboard-stage-dot ${status.color}`} />
                    <span className="dashboard-stage-label">{status.label}</span>
                    <div className="dashboard-stage-track"><i style={{ width: `${share}%` }} /></div>
                    <strong>{count}</strong>
                  </div>
                )
              })}
            </div>
            {monthContents.length === 0 && <p className="dashboard-monthly-empty">No content is scheduled for this month.</p>}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default Dashboard
