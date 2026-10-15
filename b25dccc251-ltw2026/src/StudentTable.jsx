import React from 'react';
import StudentItem from './StudentItem';

const StudentTable = ({ students, onDelete }) => {
  if (students.length === 0) {
    return <p>Không có sinh viên nào trong danh sách.</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Điểm số</th>
          <th>Lớp</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem key={student.id} student={student} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;