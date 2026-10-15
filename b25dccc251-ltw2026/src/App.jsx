import React, { useState } from 'react';
import StudentTable from './StudentTable';
import './App.css';

const App = () => {
  // 1. Dữ liệu mẫu ban đầu (tối thiểu 3 sinh viên)
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn An', score: 8.5, class: 'DCC25.01' },
    { id: 2, name: 'Trần Thị Bình', score: 4.2, class: 'DCC25.01' },
    { id: 3, name: 'Lê Hoàng Cường', score: 7.0, class: 'DCC25.02' }
  ]);

  // State cho Form nhập liệu
  const [formData, setFormData] = useState({ name: '', score: '', class: '' });
  const [error, setError] = useState('');

  // State cho bộ lọc (filter): 'ALL', 'GOOD' (>=8), 'FAIL' (<5)
  const [filterType, setFilterType] = useState('ALL');

  // Xử lý thay đổi input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 2. Thêm sinh viên mới kèm ràng buộc dữ liệu
  const handleAddStudent = (e) => {
    e.preventDefault();
    const { name, score, class: className } = formData;

    if (!name.trim() || !score || !className.trim()) {
      setError('Vui lòng điền đầy đủ thông tin các trường!');
      return;
    }

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      setError('Điểm số không hợp lệ! Điểm phải từ 0 đến 10.');
      return;
    }

    setError('');
    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      score: numericScore,
      class: className.trim()
    };

    setStudents([...students, newStudent]);
    setFormData({ name: '', score: '', class: '' });
  };

  // 3. Xóa sinh viên
  const handleDelete = (id) => {
    const updatedList = students.filter((student) => student.id !== id);
    setStudents(updatedList);
  };

  // 4. Lọc danh sách sinh viên
  const filteredStudents = students.filter((student) => {
    if (filterType === 'GOOD') return student.score >= 8.0;
    if (filterType === 'FAIL') return student.score < 5.0;
    return true;
  });

  // 5. Thống kê cơ bản (Tổng số sinh viên & Điểm trung bình) bằng .reduce()
  const totalStudents = students.length;
  const averageScore = totalStudents > 0 
    ? (students.reduce((sum, s) => sum + s.score, 0) / totalStudents).toFixed(2) 
    : 0;

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Ứng dụng Quản lý Điểm Sinh viên</h2>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleAddStudent} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Thêm sinh viên mới</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <label>Họ tên: </label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Điểm số: </label>
          <input type="number" step="0.1" name="score" value={formData.score} onChange={handleInputChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Lớp: </label>
          <input type="text" name="class" value={formData.class} onChange={handleInputChange} />
        </div>
        <button type="submit">Thêm</button>
      </form>

      {/* Bộ lọc và Thống kê */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={() => setFilterType('ALL')}>Tất cả</button>
        <button onClick={() => setFilterType('GOOD')}>Loại Giỏi (&ge; 8.0)</button>
        <button onClick={() => setFilterType('FAIL')}>Trượt môn (&lt; 5.0)</button>
        
        <div style={{ marginLeft: 'auto', fontSize: '14px' }}>
          <span>Tổng số SV: <strong>{totalStudents}</strong></span> | <span>Điểm TB toàn lớp: <strong>{averageScore}</strong></span>
        </div>
      </div>

      {/* Hiển thị danh sách bảng */}
      <StudentTable students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
};

export default App;