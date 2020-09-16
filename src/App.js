import React from 'react';
import Router from './Router';
import 'styles/Fonts.scss';
import 'styles/Main.scss';

export default function App() {
  return (
    <div data-testid="mainApp" className="main-app">
      <Router />
    </div>
  );
}
