import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeEditorLayout } from '@/components/theme-editor/ThemeEditorLayout';

const AdminCustomization = () => {
  return (
    <ThemeProvider>
      <ThemeEditorLayout fullscreen />
    </ThemeProvider>
  );
};

export default AdminCustomization;
