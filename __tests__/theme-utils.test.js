import { COLOR_THEMES, FONT_THEMES } from '../themes';

describe('generateCssVariables', () => {
  const originalEnv = process.env;
  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('returns CSS variables based on env vars', () => {
    process.env.BLOG_THEME = 'bejamas';
    process.env.BLOG_FONT_HEADINGS = 'serif';
    process.env.BLOG_FONT_PARAGRAPHS = 'monospace';
    process.env.BLOG_FONT_BODY = process.env.BLOG_FONT_PARAGRAPHS;

    jest.resetModules();
    const { generateCssVariables } = require('../utils/theme-utils');

    const css = generateCssVariables();

    const expected = [
      `--theme-primary: ${COLOR_THEMES.bejamas.colors.primary};`,
      `--theme-gradient-1: ${COLOR_THEMES.bejamas.colors['gradient-1']};`,
      `--theme-gradient-2: ${COLOR_THEMES.bejamas.colors['gradient-2']};`,
      `--theme-gradient-3: ${COLOR_THEMES.bejamas.colors['gradient-3']};`,
      `--theme-gradient-4: ${COLOR_THEMES.bejamas.colors['gradient-4']};`,
      `--theme-headings: ${FONT_THEMES.serif};`,
      `--theme-body: ${FONT_THEMES.monospace};`,
    ].join('\n');

    expect(css).toBe(expected);
  });
});
