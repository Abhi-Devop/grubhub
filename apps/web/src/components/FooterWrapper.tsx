"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

const FooterWrapper = () => {
  const pathname = usePathname();
  const isCheckout = pathname === '/checkout';

  if (isCheckout) {
    return null;
  }

  return <Footer />;
};

export default FooterWrapper;
