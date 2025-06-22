'use client';

import { useEffect, useState } from 'react';
import { generateCssVariables } from '@/utils/theme-utils';

const CSSVariableInjector = () => {
  const [cssVars, setCssVars] = useState('');

  useEffect(() => {
    setCssVars(generateCssVariables());
  }, []);

  if (!cssVars) return null;

  return <style>{`:root{${cssVars}}`}</style>;
};

export default CSSVariableInjector;
