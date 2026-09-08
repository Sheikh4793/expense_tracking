import { storageService } from './storageService'
import { logService } from './logService'
import { DEFAULT_USER_ID } from '../constants/categories'

const getExpenseKey = (userId = DEFAULT_USER_ID) => `expense_tracker_expenses_${userId}`

export const expenseService = {
  getExpenses(userId = DEFAULT_USER_ID) {
    const key = getExpenseKey(userId)
    const stored = storageService.getItem(key, null)

    if (stored !== null) {
      return stored
    }

    const initialExpenses = [
      {
        id: 'exp_1',
        title: 'Electricity Bill',
        amount: 2400,
        category: 'Bills',
        date: '2026-09-04',
      },
      {
        id: 'exp_2',
        title: 'Metro Card Recharge',
        amount: 500,
        category: 'Transport',
        date: '2026-09-06',
      },
      {
        id: 'exp_3',
        title: 'Grocery Shopping',
        amount: 1200,
        category: 'Food',
        date: '2026-09-07',
      },
    ]

    storageService.setItem(key, initialExpenses)
    return initialExpenses
  },

  addExpense(userId = DEFAULT_USER_ID, data) {
    const expenses = this.getExpenses(userId)

    const newExpense = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: data.title.trim(),
      amount: Number(data.amount),
      category: data.category || 'Other',
      date: data.date,
    }

    const updated = [newExpense, ...expenses]
    storageService.setItem(getExpenseKey(userId), updated)
    logService.addLog(userId, 'EXPENSE_ADDED', newExpense)

    return updated
  },

  updateExpense(userId = DEFAULT_USER_ID, id, data) {
    const expenses = this.getExpenses(userId)
    const index = expenses.findIndex((item) => item.id === id)

    if (index === -1) {
      return expenses
    }

    const updatedExpense = {
      ...expenses[index],
      title: data.title.trim(),
      amount: Number(data.amount),
      category: data.category || 'Other',
      date: data.date,
    }

    const updated = [...expenses]
    updated[index] = updatedExpense
    storageService.setItem(getExpenseKey(userId), updated)
    logService.addLog(userId, 'EXPENSE_UPDATED', updatedExpense)

    return updated
  },

  deleteExpense(userId = DEFAULT_USER_ID, id) {
    const expenses = this.getExpenses(userId)
    const target = expenses.find((item) => item.id === id)

    if (!target) {
      return expenses
    }

    const updated = expenses.filter((item) => item.id !== id)
    storageService.setItem(getExpenseKey(userId), updated)
    logService.addLog(userId, 'EXPENSE_DELETED', target)

    return updated
  },
}