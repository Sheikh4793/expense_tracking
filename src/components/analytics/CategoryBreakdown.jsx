import { formatCurrency } from '../../utils/formatters'

export function CategoryBreakdown({ breakdown = [] }) {
  const activeCategories = breakdown.filter((item) => item.amount > 0)

  return (
    <div className="category-card">
      <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>
        Category-wise Spending
      </h2>

      {activeCategories.length === 0 ? (
        <div className="empty">
          <p style={{ margin: 0 }}>No category spending recorded yet.</p>
        </div>
      ) : (
        <div>
          {activeCategories.map((item) => (
            <div key={item.category} className="category-row">
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <strong style={{ fontSize: '15px' }}>{item.category}</strong>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {item.count} {item.count === 1 ? 'transaction' : 'transactions'} (
                    {item.percentage}%)
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${item.percentage}%`,
                      height: '100%',
                      backgroundColor: '#4f46e5',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ minWidth: '90px', textAlign: 'right' }}>
                <strong style={{ fontSize: '16px', color: '#111827' }}>
                  {formatCurrency(item.amount)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
