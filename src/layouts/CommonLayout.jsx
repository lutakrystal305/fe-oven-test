import React from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

const CommonLayout = ({ children }) => {
  return (
    <div className="CommonLayout w-100 h-100">
      <Header />
      <div className="h-100">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
