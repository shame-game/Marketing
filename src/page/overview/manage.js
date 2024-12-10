import * as React from 'react';
import { StudentContext } from '@/context/student'
import Task from '@/app/student';

export default function RootLayout() {
  return (
    <StudentContext>
      <Task />
    </StudentContext>
  );
}