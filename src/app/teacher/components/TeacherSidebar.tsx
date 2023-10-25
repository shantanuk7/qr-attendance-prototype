// Sidebar.tsx
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeacherSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const closeSidebar = () => {
    onClose();
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeSidebar}>
          &#x2716; {/* Close (multiplication sign) icon */}
        </button>
        {/* Sidebar content */}
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <div
        className={`overlay ${isOpen ? 'show' : ''}`}
        onClick={closeSidebar}
      ></div>
    </div>
  );
};

export default TeacherSidebar;
