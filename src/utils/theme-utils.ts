import { COLOR_THEMES, FONT_THEMES } from '../../themes';

const sanitizeEnv = (
  value: string | undefined,
  allowedList: string[],
  fallback: string,
): string => {
  if (!value) return fallback;
  const sanitized = String(value).toLowerCase().replace(/[^a-z0-9-]/gi, '');
  return allowedList.includes(sanitized) ? sanitized : fallback;
};

const THEME = sanitizeEnv(
  process.env.NEXT_PUBLIC_BLOG_THEME,
  Object.keys(COLOR_THEMES),
  'default',
);

const FONT_HEADINGS = sanitizeEnv(
  process.env.BLOG_FONT_HEADINGS,
  Object.keys(FONT_THEMES),
  'sans-serif',
);

// body font family variable
const FONT_BODY = sanitizeEnv(
  process.env.BLOG_FONT_BODY,
  Object.keys(FONT_THEMES),
  'sans-serif',
);

export const generateCssVariables = (): string => {
  const cssVars: Record<string, string> = {};
  const themeColors = COLOR_THEMES[THEME]?.colors || {};
  for (const [key, value] of Object.entries(themeColors as Record<string, string>)) {
    cssVars[`--theme-${key}`] = value;
  }
  cssVars['--theme-headings'] = FONT_THEMES[FONT_HEADINGS] || 'sans-serif';
  cssVars['--theme-body'] = FONT_THEMES[FONT_BODY] || 'sans-serif';

  const cssVarsString = Object.entries(cssVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');

  return cssVarsString;
};
