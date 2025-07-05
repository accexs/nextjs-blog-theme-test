import { getGlobalData } from '../src/utils/globalData';

describe('getGlobalData', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns default values when environment variables are not set', () => {
    // Clear relevant environment variables
    delete process.env.BLOG_NAME;
    delete process.env.BLOG_TITLE;
    delete process.env.BLOG_FOOTER_TEXT;

    const data = getGlobalData();

    expect(data.name).toBe('Jay Doe');
    expect(data.blogTitle).toBe('Next.js Blog Theme');
    expect(data.footerText).toBe('All rights reserved.');
  });

  it('returns values from environment variables when they are set', () => {
    // Set environment variables
    process.env.BLOG_NAME = 'Test Name';
    process.env.BLOG_TITLE = 'Test Title';
    process.env.BLOG_FOOTER_TEXT = 'Test Footer';

    const data = getGlobalData();

    expect(data.name).toBe('Test Name');
    expect(data.blogTitle).toBe('Test Title');
    expect(data.footerText).toBe('Test Footer');
  });
});