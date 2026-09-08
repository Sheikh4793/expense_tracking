import { storageService } from './storageService'
import { DEFAULT_USER_ID } from '../constants/categories'

const getLogKey = (userId = DEFAULT_USER_ID) => `expense_tracker_logs_${userId}`

export const logService = {
  getLogs(userId = DEFAULT_USER_ID) {
    const key = getLogKey(userId)
    const stored = storageService.getItem(key, null)
    if (stored !== null) {
      return stored
    }

    const initialLogs = [
      {
        id: 'log_3',
        userId,
        action: 'EXPENSE_ADDED',
        expenseTitle: 'Grocery Shopping',
        details: 'Grocery Shopping - ₹1,200 (Food) on 2026-09-07',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 'log_2',
        userId,
        action: 'EXPENSE_ADDED',
        expenseTitle: 'Metro Card Recharge',
        details: 'Metro Card Recharge - ₹500 (Transport) on 2026-09-06',
        timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 'log_1',
        userId,
        action: 'EXPENSE_ADDED',
        expenseTitle: 'Electricity Bill',
        details: 'Electricity Bill - ₹2,400 (Bills) on 2026-09-04',
        timestamp: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      },
    ]

    storageService.setItem(key, initialLogs)
    return initialLogs
  },

  addLog(userId = DEFAULT_USER_ID, action, expense) {
    const currentLogs = this.getLogs(userId)
    const details = `${expense.title} - ₹${Number(expense.amount).toLocaleString()} (${expense.category}) on ${expense.date}`
    const newLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId,
      action,
      expenseTitle: expense.title,
      details,
      timestamp: new Date().toISOString(),
    }
    const updatedLogs = [newLog, ...currentLogs]
    storageService.setItem(getLogKey(userId), updatedLogs)
    return updatedLogs
  },

  createLog(userId = DEFAULT_USER_ID, action, expense) {
    return this.addLog(userId, action, expense)
  },
}