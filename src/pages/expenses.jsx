import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useExpenses } from '../hooks/useExpenses'
import { ExpenseForm } from '../components/expenses/ExpenseForm'

function Expenses({
  expenses: propExpenses,
  addExpense: propAddExpense,
  updateExpense: propUpdateExpense,
  deleteExpense: propDeleteExpense,
}) {
  const hookData = useExpenses()
  const expenses = propExpenses ?? hookData.expenses
  const addExpense = propAddExpense ?? hookData.addExpense
  const updateExpense = propUpdateExpense ?? hookData.updateExpense
  const deleteExpense = propDeleteExpense ?? hookData.deleteExpense

  const [editingExpense, setEditingExpense] = useState(null)

  const handleFormSubmit = (data) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data)
      setEditingExpense(null)
    } else {
      addExpense(data)
    }
  }

  const handleCancelEdit = () => {
    setEditingExpense(null)
  }

  const handleEdit = (expense) => {
    setEditingExpense(expense)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this expense?')) {
      deleteExpense(id)
      if (editingExpense?.id === id) {
        setEditingExpense(null)
      }
    }
  }

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  )

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Expenses</h1>
          <p>Manage your daily expenses</p>
        </div>

        <div className="total-card">
          <span>Total Expenses</span>
          <strong>₹{total.toLocaleString()}</strong>
        </div>
      </header>

      <ExpenseForm
        key={editingExpense ? editingExpense.id : 'new'}
        initialData={editingExpense}
        onSubmit={handleFormSubmit}
        onCancel={handleCancelEdit}
      />

      <section className="list-card">
        <h2>Expense History</h2>

        {expenses.length === 0 ? (
          <div className="empty">No expenses added yet.</div>
        ) : (
          <div className="expense-list">
            {expenses.map((expense) => (
              <div className="expense-row" key={expense.id}>
                <div>
                  <strong>{expense.title}</strong>
                  <span>
                    {expense.category} • {expense.date}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <strong>₹{Number(expense.amount).toLocaleString()}</strong>

                  <div className="actions">
                    <button
                      type="button"
                      onClick={() => handleEdit(expense)}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(expense.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Expenses
