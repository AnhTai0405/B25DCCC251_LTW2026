import React from 'react';

const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: className } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{className}</td>
      <td>
        <button onClick={() => onDelete(id)} style={{ color: 'red', cursor: 'pointer' }}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;