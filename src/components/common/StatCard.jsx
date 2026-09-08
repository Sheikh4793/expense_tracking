export function StatCard({ label, value, className = 'stat-card' }) {
  return (
    <div className={className}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
