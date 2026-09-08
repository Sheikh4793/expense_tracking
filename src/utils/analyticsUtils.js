import { CATEGORIES } from '../constants/categories'
import { formatDate } from './formatters'

export function calculateTotalSpending(expenses = []) {
  return expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
}

export function calculateCategoryBreakdown(expenses = []) {
  const total = calculateTotalSpending(expenses)
  const categoryMap = {}

  CATEGORIES.forEach((cat) => {
    categoryMap[cat] = {
      category: cat,
      amount: 0,
      count: 0,
      percentage: 0,
    }
  })

  expenses.forEach((item) => {
    const cat = item.category || 'Other'
    if (!categoryMap[cat]) {
      categoryMap[cat] = { category: cat, amount: 0, count: 0, percentage: 0 }
    }
    categoryMap[cat].amount += Number(item.amount) || 0
    categoryMap[cat].count += 1
  })

  const results = Object.values(categoryMap).map((catData) => ({
    ...catData,
    amount: Math.round(catData.amount * 100) / 100,
    percentage: total > 0 ? Math.round((catData.amount / total) * 100) : 0,
  }))

  return results.sort((a, b) => b.amount - a.amount)
}

export function calculatePeriodSpending(expenses = [], period = 'daily') {
  if (!expenses || expenses.length === 0) {
    return []
  }

  const sorted = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date))

  if (period === 'daily') {
    const map = new Map()
    sorted.forEach((item) => {
      const d = item.date || 'Unknown'
      const current = map.get(d) || 0
      map.set(d, current + (Number(item.amount) || 0))
    })

    return Array.from(map.entries()).map(([dateKey, amount]) => ({
      name: formatDate(dateKey),
      key: dateKey,
      amount: Math.round(amount * 100) / 100,
    }))
  }

  if (period === 'weekly') {
    const map = new Map()
    sorted.forEach((item) => {
      if (!item.date) return
      const date = new Date(item.date)
      const day = date.getDay()
      const diff = date.getDate() - day
      const startOfWeek = new Date(date.setDate(diff))
      const year = startOfWeek.getFullYear()
      const month = String(startOfWeek.getMonth() + 1).padStart(2, '0')
      const d = String(startOfWeek.getDate()).padStart(2, '0')
      const weekKey = `${year}-${month}-${d}`
      const label = `Wk of ${formatDate(weekKey)}`

      const current = map.get(label) || 0
      map.set(label, current + (Number(item.amount) || 0))
    })

    return Array.from(map.entries()).map(([name, amount]) => ({
      name,
      amount: Math.round(amount * 100) / 100,
    }))
  }

  if (period === 'monthly') {
    const map = new Map()
    sorted.forEach((item) => {
      if (!item.date) return
      const [year, month] = item.date.split('-')
      if (!year || !month) return
      const key = `${year}-${month}`
      const dateObj = new Date(Number(year), Number(month) - 1, 1)
      const label = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })

      const current = map.get(label) || { label, sortKey: key, amount: 0 }
      current.amount += Number(item.amount) || 0
      map.set(label, current)
    })

    return Array.from(map.values()).map(({ label, amount }) => ({
      name: label,
      amount: Math.round(amount * 100) / 100,
    }))
  }

  return []
}
