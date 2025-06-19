'use client';

import {useEffect, useState} from 'react';
import {generateCssVariables} from '@/utils/theme-utils';

export default function CSSVariableInjector() {
    const [cssVars, setCssVars] = useState('');

    useEffect(() => {
        setCssVars(generateCssVariables());
    }, []);

    if (!cssVars) return null;

    return <style>{`:root{${cssVars}}`}</style>;
}