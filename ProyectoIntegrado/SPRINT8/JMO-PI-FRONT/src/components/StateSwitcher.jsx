import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function StateSwitcher({ options, current }) {
  const location = useLocation();

  return (
    <div className="state-tabs">
      {options.map((option) => (
        <Link
          key={option.value}
          to={`${location.pathname}?state=${option.value}`}
          className={`state-tab ${current === option.value ? 'active' : ''}`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
