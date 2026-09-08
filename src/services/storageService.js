export const STORAGE_KEYS = {
  EXPENSES: 'expense_tracker_expenses',
  LOGS: 'expense_tracker_logs',
  USERS: 'expense_tracker_users',
}

export const storageService = {
  getItem(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : defaultValue
    } catch (error) {
      console.error(`Error reading key "${key}":`, error)
      return defaultValue
    }
  },

  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing key "${key}":`, error)
      return false
    }
  },

  get(key) {
    return this.getItem(key, [])
  },

  set(key, value) {
    return this.setItem(key, value)
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing key "${key}":`, error)
      return false
    }
  },

  keys: STORAGE_KEYS,
}