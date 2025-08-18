import React from 'react'
import { Link } from 'react-router';

function Sidebar2() {
  const navItems = [
    { id: '', icon: 'dashboard', label: 'Dashboard' },
    { id: 'products', icon: 'inventory_2', label: 'Products' },
    { id: 'category', icon: 'category', label: 'category' },
    { id: 'orders', icon: 'orders', label: 'Orders' },
    
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.id} className="">
              <Link to={item.id} >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <h6>Custommer Info</h6>
        <ul>
          <li>
            <Link to="/users-list">
            <span className="material-symbols-outlined">person_2</span>
            Users</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
export default Sidebar2
