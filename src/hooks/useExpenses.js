import { useState, useCallback } from 'react'
import { expenseService } from '../services/expenseService'
import { logService } from '../services/logService'
import { DEFAULT_USER_ID } from '../constants/categories'

export function useExpenses(userId = DEFAULT_USER_ID) {
  const [expenses, setExpenses] = useState(() => expenseService.getExpenses(userId))
  const [logs, setLogs] = useState(() => logService.getLogs(userId))

  const addExpense = useCallback(
    (data) => {
      const updated = expenseService.addExpense(userId, data)
      setExpenses(updated)
      setLogs(logService.getLogs(userId))
      return updated
    },
    [userId]
  )

  const updateExpense = useCallback(
    (id, data) => {
      const updated = expenseService.updateExpense(userId, id, data)
      setExpenses(updated)
      setLogs(logService.getLogs(userId))
      return updated
    },
    [userId]
  )

  const deleteExpense = useCallback(
    (id) => {
      const updated = expenseService.deleteExpense(userId, id)
      setExpenses(updated)
      setLogs(logService.getLogs(userId))
      return updated
    },
    [userId]
  )

  return {
    expenses,
    logs,
    userId,
    addExpense,
    updateExpense,
    deleteExpense,
  }
}
