import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, className = '' }) => {
  // const { resolvedTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      <main className="flex-grow">
        {/* dentro de este main van los componentes que el cliente quiera colocar */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;