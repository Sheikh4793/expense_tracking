import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { CATEGORIES } from '../../constants/categories'
import { getTodayString } from '../../utils/formatters'

export function ExpenseForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [amount, setAmount] = useState(initialData?.amount ? String(initialData.amount) : '')
  const [category, setCategory] = useState(initialData?.category || 'Food')
  const [date, setDate] = useState(initialData?.date || getTodayString())
  const [error, setError] = useState('')

  const isEditing = Boolean(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    const numAmount = Number(amount)
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    if (!category) {
      setError('Category is required')
      return
    }

    if (!date) {
      setError('Date is required')
      return
    }

    onSubmit({
      title: title.trim(),
      amount: numAmount,
      category,
      date,
    })

    if (!isEditing) {
      setTitle('')
      setAmount('')
      setCategory('Food')
      setDate(getTodayString())
    }
    setError('')
  }

  return (
    <section className="form-card">
      <h2>{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>

      {error && (
        <div style={{ color: '#dc2626', fontSize: '14px', marginBottom: '12px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError('')
          }}
        />

        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
            if (error) setError('')
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            if (error) setError('')
          }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
            if (error) setError('')
          }}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="primary-btn" type="submit">
            {isEditing ? <Check size={18} /> : <Plus size={18} />}
            {isEditing ? 'Update' : 'Add Expense'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                border: '1px solid #d1d5db',
                background: 'white',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
