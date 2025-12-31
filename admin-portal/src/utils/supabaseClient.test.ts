import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabaseClient } from './supabaseClient';

describe('supabaseClient', () => {
  beforeEach(() => {
    // Reset environment before each test
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');
  });

  it('should throw error when environment variables are missing', () => {
    expect(() => supabaseClient).toThrow(
      'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
    );
  });

  it('should not throw error when environment variables are present', () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://test.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'test-key');
    
    expect(() => supabaseClient).not.toThrow();
  });
});
