import { ExpenseItem } from './ExpenseItem'

export function ExpenseList({ expenses = [], onEdit, onDelete }) {
  return (
    <div className="list-card">
      <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Expenses List</h2>

      {expenses.length === 0 ? (
        <div className="empty">
          <p style={{ margin: 0, fontSize: '15px' }}>
            No expenses found. Add your first expense above to start tracking.
          </p>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
