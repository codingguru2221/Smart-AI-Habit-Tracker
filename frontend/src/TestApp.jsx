import React from 'react';
import ReactDOM from 'react-dom/client';
import './test-styles.css';

function TestApp() {
  return (
    <div className="test-container">
      <h1 className="test-header">CSS Test App</h1>
      <p className="test-paragraph">If this text is styled correctly, CSS is working!</p>
      <button className="test-button">Test Button</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TestApp />);