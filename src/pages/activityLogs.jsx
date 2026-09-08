import { Printer } from 'lucide-react'
import { useExpenses } from '../hooks/useExpenses'

function ActivityLog({ logs: propLogs }) {
  const hookData = useExpenses()
  const logs = propLogs ?? hookData.logs

  const formatAction = (action) => {
    if (!action) return 'Action'
    return action
      .replace('EXPENSE_', '')
      .toLowerCase()
      .replace('_', ' ')
  }

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Activity Log</h1>
          <p>Track expense additions, updates, and deletions</p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={() => window.print()}
          aria-label="Print Activity Log"
        >
          <Printer size={18} />
          <span>Print Log</span>
        </button>
      </header>

      <section className="list-card">
        {logs.length === 0 ? (
          <div className="empty">No activity yet.</div>
        ) : (
          logs.map((log) => (
            <div className="log-row" key={log.id}>
              <div>
                <strong style={{ textTransform: 'capitalize' }}>
                  {formatAction(log.action)}
                </strong>
                <span>{log.details}</span>
              </div>

              <time>
                {new Date(log.timestamp).toLocaleString()}
              </time>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default ActivityLog
