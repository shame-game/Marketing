import * as React from 'react';
import { StudentContext } from '@/context/student'

export default function RootLayout({ children }) {
  return (
    <StudentContext>
      {children}
    </StudentContext>
  );
}
