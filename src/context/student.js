'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const useStudent = createContext()

export const StudentContext = ({ children }) => {
  const [dataStudent, setdataStudent] = useState('Initial Value')
  const [loading, setLoading] = useState(true);

  // lấy danh sách học sinh
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('/api/Student_Read/all',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 0 }),
            cache: 'no-store'
          }
        );
        if (!response.ok) setdataStudent(0)
        const data = await response.json();
        setdataStudent(data.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally { setLoading(false) }
    };
    fetchStudentData();
  }, []);

  // cập nhập thông tin
  const updateStudent = (newData) => { setdataStudent(newData) }

  return (
    <useStudent.Provider value={{ dataStudent, updateStudent, loading }}>
      {children}
    </useStudent.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(useStudent);
  if (!context) {
    throw new Error("useStudentContext phải được sử dụng bên trong StudentProvider");
  }
  return context;
};