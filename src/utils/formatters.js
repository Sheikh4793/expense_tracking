export function formatCurrency(amount) {
  const num = Number(amount) || 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num)
}

export function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const [year, month, day] = dateString.split('-').map(Number)
    if (!year || !month || !day) return dateString
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function formatDateTime(isoString) {
  if (!isoString) return ''
  try {
    const date = new Date(isoString)
    if (isNaN(date.getTime())) return isoString
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return isoString
  }
}

export function getTodayString() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
