import { PropsWithChildren } from 'react';
import './main-layout.css';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Main;
