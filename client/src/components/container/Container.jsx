import React from 'react';
import './Container.scss';

export default function Container({ children }) {
  return (
    <div className="container">
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>{children}</div>
    </div>
  );
}
