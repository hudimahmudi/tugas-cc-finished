import { ArrowRight, Bell, BriefcaseBusiness, Camera, ChartNoAxesCombined, CheckCircle2, Clock3, ClipboardList, LayoutDashboard, LogOut, ChevronDown, FileVideo, Music2, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getContentStatus } from '../contentWorkflow.js'

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'contents', icon: ClipboardList, label: 'Content' },
  { id: 'matrix', icon: ChartNoAxesCombined, label: 'Matrix' },
]

const platformDetails = {
  youtube: { name: 'YouTube', icon: FileVideo, className: 'youtube' },
  instagram: { name: 'Instagram', icon: Camera, className: 'instagram' },
  tiktok: { name: 'TikTok', icon: Music2, className: 'tiktok' },
  linkedin: { name: 'LinkedIn', icon: BriefcaseBusiness, className: 'linkedin' },
}

function Navbar({ activePage, onNavigate, onLogout, onAddChannel, channels, contents, account }) {
  function navigateFromDropdown(event) {
    onNavigate('contents')
    event.currentTarget.closest('details').open = false
  }

  return (
    <header className="app-navbar">
      <div className="app-navbar-inner">
        <Link className="app-navbar-brand" to="/dashboard">
          <span className="app-navbar-brand-mark">c</span>
          <span className="app-navbar-brand-copy">
            <strong>Creatore</strong>
            <small>CONTENT STUDIO</small>
          </span>
        </Link>

        <nav className="app-navbar-nav" aria-label="Main menu">
          {menuItems.filter(({ id }) => account.id !== 'editor' || id !== 'matrix').map(({ id, icon: Icon, label }) => (
            <button
              className={`app-navbar-link ${activePage === id ? 'active' : ''}`}
              key={id}
              type="button"
              aria-current={activePage === id ? 'page' : undefined}
              onClick={() => onNavigate(id)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="app-navbar-actions">
          <details className="notification-dropdown">
            <summary className="app-notification-button" aria-label={`Notifications, ${contents.length} content updates`}>
              <Bell size={17} />
              {contents.length > 0 && <span />}
            </summary>
            <section className="notification-panel" aria-label="Notification list">
              <header className="notification-panel-heading">
                <div><strong>Notifications</strong><span>{contents.length} content updates</span></div>
                <button type="button" onClick={navigateFromDropdown}>View all</button>
              </header>
              {contents.length ? (
                <ul className="notification-list">
                  {contents.slice(0, 5).map((content) => {
                    const isReady = ['ready', 'published'].includes(content.status)
                    const NotificationIcon = isReady ? CheckCircle2 : Clock3
                    const notificationTitle = content.status === 'published'
                      ? 'Content published'
                      : content.status === 'ready'
                        ? 'Content ready to publish'
                        : 'Update content progress'
                    return (
                      <li key={content.id}>
                        <button type="button" className="notification-item" onClick={navigateFromDropdown}>
                          <span className={`notification-icon ${isReady ? 'ready' : ''}`}><NotificationIcon size={15} /></span>
                          <span className="notification-copy">
                            <strong>{notificationTitle}</strong>
                            <span>{content.title}</span>
                            <small>{content.channel} <i /> {getContentStatus(content.status).label} <i /> {content.date}</small>
                          </span>
                          <ArrowRight className="notification-arrow" size={14} />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="notification-empty"><Bell size={18} /><strong>No notifications yet</strong><span>Content updates will appear here.</span></div>
              )}
            </section>
          </details>

          <details className="profile-dropdown">
            <summary className="app-navbar-profile">
              <span className="app-avatar">{account.initials}</span>
              <span className="app-navbar-profile-identity">
                <span className="app-navbar-profile-name">{account.name}</span>
                <span className={`app-navbar-profile-role role-${account.id}`}>{account.role}</span>
              </span>
              <ChevronDown size={15} />
            </summary>
            <section className="profile-card" aria-label={`${account.name}'s profile`}>
              <div className="profile-card-heading">
                <span className="profile-card-avatar">{account.initials}</span>
                <span><strong>{account.name}</strong><small>{account.role}</small></span>
              </div>
              <div className={`profile-role-validation role-${account.id}`}>
                <strong>{account.role} access</strong>
                <span>{account.access}</span>
              </div>
              <div className="profile-account-email">{account.email}</div>
              <div className="profile-accounts-heading">
                <strong>Content accounts</strong>
                <span>{channels.length} channels</span>
              </div>
              <ul className="profile-account-list">
                {channels.map((channel) => {
                  const platform = platformDetails[channel.platform]
                  if (!platform) return null
                  const { name, icon: Icon, className } = platform
                  const contentCount = contents.filter((content) => String(content.channelId) === String(channel.id)).length
                  return (
                    <li key={channel.id}>
                      <span className={`profile-platform-icon ${className}`}><Icon size={15} /></span>
                      <span className="profile-account-name"><strong>{name}</strong><small>{channel.handle_name} · {contentCount} items</small></span>
                      <span className="profile-account-indicator" aria-label="Connected channel" />
                    </li>
                  )
                })}
              </ul>
              {channels.length === 0 && <p className="notification-empty">No channels connected yet.</p>}
              {account.id !== 'editor' && (
                <button className="app-navbar-logout" type="button" onClick={(event) => {
                  event.currentTarget.closest('details').open = false
                  onAddChannel()
                }}>
                  <Plus size={15} /> Add channel
                </button>
              )}
              <button className="app-navbar-logout" type="button" onClick={onLogout}>
                <LogOut size={15} /> Sign out
              </button>
            </section>
          </details>
        </div>
      </div>
    </header>
  )
}

export default Navbar
