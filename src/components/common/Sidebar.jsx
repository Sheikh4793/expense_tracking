import { NavLink } from 'react-router-dom'
import { Receipt, BarChart3, Clock, Wallet } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <Wallet size={22} />
        <span>ExpenseTracker</span>
      </div>
      <nav>
        <NavLink
          to="/expenses"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <Receipt size={18} />
          <span>Expenses</span>
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <BarChart3 size={18} />
          <span>Analytics</span>
        </NavLink>
        <NavLink
          to="/logs"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <Clock size={18} />
          <span>Activity Log</span>
        </NavLink>
      </nav>
    </aside>
  )
}
