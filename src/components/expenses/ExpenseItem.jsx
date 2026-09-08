import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'

export function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <div className="expense-row">
      <div>
        <strong style={{ fontSize: '15px' }}>{expense.title}</strong>
        <span>
          {expense.category} • {formatDate(expense.date)}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <strong style={{ fontSize: '16px', color: '#111827' }}>
          {formatCurrency(expense.amount)}
        </strong>
        <div className="actions">
          <button
            type="button"
            title="Edit expense"
            onClick={() => onEdit(expense)}
            aria-label={`Edit ${expense.title}`}
          >
            <Pencil size={15} color="#4b5563" />
          </button>
          <button
            type="button"
            title="Delete expense"
            onClick={() => onDelete(expense.id)}
            aria-label={`Delete ${expense.title}`}
          >
            <Trash2 size={15} color="#dc2626" />
          </button>
        </div>
      </div>
    </div>
  )
}
