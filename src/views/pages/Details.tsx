import { PropsWithChildren } from 'react';

const Details: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      Details Page
      <div>{children}</div>
    </div>
  );
};

export default Details;
