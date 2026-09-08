import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { formatCurrency } from '../../utils/formatters'

export function SpendingChart({ data = [], period, onPeriodChange }) {
  const periods = ['daily', 'weekly', 'monthly']

  return (
    <div className="chart-card">
      <div className="section-header" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', margin: 0 }}>Spending Over Time</h2>
        <div className="period-buttons">
          {periods.map((p) => (
            <button
              key={p}
              type="button"
              className={period === p ? 'active' : ''}
              onClick={() => onPeriodChange(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <div className="empty">
          <p style={{ margin: 0 }}>No spending recorded for this period.</p>
        </div>
      ) : (
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value), 'Spending']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  fontSize: '13px',
                }}
              />
              <Bar
                dataKey="amount"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
                maxBarSize={55}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
