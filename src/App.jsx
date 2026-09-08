import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Wallet, BarChart3, History } from "lucide-react";
import Expenses from "./pages/expenses.jsx";
import Analytics from "./pages/analytics.jsx";
import ActivityLog from "./pages/activityLogs.jsx";
import { useExpenses } from "./hooks/useExpenses";
import "./index.css";

function App() {
  const expenseState = useExpenses();

  return (
    <BrowserRouter>
      <div className="app">
        <aside className="sidebar">
          <div className="logo">
            <Wallet size={26} />
            <span>Expense Tracker</span>
          </div>

          <nav>
            <NavLink to="/" end>
              <Wallet size={18} />
              Expenses
            </NavLink>

            <NavLink to="/analytics">
              <BarChart3 size={18} />
              Analytics
            </NavLink>

            <NavLink to="/logs">
              <History size={18} />
              Activity Log
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Expenses {...expenseState} />} />
            <Route path="/expenses" element={<Expenses {...expenseState} />} />
            <Route path="/analytics" element={<Analytics {...expenseState} />} />
            <Route path="/logs" element={<ActivityLog {...expenseState} />} />
            <Route path="*" element={<Expenses {...expenseState} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;