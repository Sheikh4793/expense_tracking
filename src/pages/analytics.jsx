import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { useExpenses } from '../hooks/useExpenses'

function Analytics({ expenses: propExpenses }) {
  const hookData = useExpenses()
  const expenses = propExpenses ?? hookData.expenses
  const [period, setPeriod] = useState('monthly')

  const grouped = {}
  const sorted = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date))

  sorted.forEach((expense) => {
    if (!expense.date) return
    const date = new Date(expense.date)

    let key
    if (period === 'daily') {
      key = expense.date
    } else if (period === 'weekly') {
      const week = Math.ceil(date.getDate() / 7)
      const month = date.toLocaleString('default', { month: 'short' })
      key = `${month} W${week}`
    } else {
      key = date.toLocaleString('default', {
        month: 'short',
      })
    }

    grouped[key] = (grouped[key] || 0) + Number(expense.amount)
  })

  const chartData = Object.entries(grouped).map(([name, amount]) => ({
    name,
    amount,
  }))

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  )

  const categoryMap = {}
  expenses.forEach((expense) => {
    const cat = expense.category || 'Other'
    categoryMap[cat] = (categoryMap[cat] || 0) + Number(expense.amount)
  })

  const categories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Understand your spending trends and patterns</p>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Spending</span>
          <strong>₹{total.toLocaleString()}</strong>
        </div>

        <div className="stat-card">
          <span>Total Transactions</span>
          <strong>{expenses.length}</strong>
        </div>

        <div className="stat-card">
          <span>Categories</span>
          <strong>{categories.length}</strong>
        </div>
      </div>

      <section className="chart-card">
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>Spending Overview</h2>

          <div className="period-buttons">
            {['daily', 'weekly', 'monthly'].map((item) => (
              <button
                key={item}
                type="button"
                className={period === item ? 'active' : ''}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="empty">No expenses found to chart.</div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip
                formatter={(val) => [`₹${Number(val).toLocaleString()}`, 'Spent']}
              />
              <Bar dataKey="amount" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>

      <section className="category-card">
        <h2>Category Breakdown</h2>

        {categories.length === 0 ? (
          <div className="empty">No category spending recorded yet.</div>
        ) : (
          categories.map(([category, amount]) => (
            <div className="category-row" key={category}>
              <span>{category}</span>
              <strong>₹{amount.toLocaleString()}</strong>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default Analytics
