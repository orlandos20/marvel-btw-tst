import React, { PropsWithChildren } from 'react';

import './cards-grid.css';

const Grid: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="cards-grid">{children}</div>;
};

export default Grid;
