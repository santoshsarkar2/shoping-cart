import React from 'react'

function Sidebar({ activeView, setView }) {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'orders', icon: 'receipt_long', label: 'Orders' },
    { id: 'products', icon: 'inventory_2', label: 'Products' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.id} className={activeView === item.id ? 'active' : ''}>
              <a href="/" onClick={(e) => { e.preventDefault(); setView(item.id); }}>
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
export default Sidebar
