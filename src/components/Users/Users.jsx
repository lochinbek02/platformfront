import React from 'react';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { FaUserPlus, FaTrash, FaEdit, FaSearch, FaUserShield, FaUserGraduate, FaTimes } from 'react-icons/fa';
import ConfirmModal from '../Common/ConfirmModal';
import './Users.css';

function Users() {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        const controller = new AbortController();
        fetchUsers(controller.signal);
        return () => controller.abort();
    }, []);

    const fetchUsers = async (signal) => {
        try {
            const response = await axiosInstance.get('users/list/', { signal });
            setUsers(response.data);
        } catch (error) {
            if (error.name !== 'CanceledError') {
                console.error('Foydalanuvchilarni olishda xatolik:', error);
                // Demo data for preview
                setUsers([
                    { id: 1, username: 'admin', email: 'admin@samdu.uz', role: 'admin' },
                    { id: 2, username: 'teacher1', email: 'teacher@samdu.uz', role: 'teacher' },
                    { id: 3, username: 'student1', email: 'student@samdu.uz', role: 'student' },
                ]);
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Foydalanuvchilar</h1>
                    <p>Tizim foydalanuvchilari ro'yxati</p>
                </div>
            </div>

            <div className="users-content-card">
                <div className="table-header-tools">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Ism yoki email bo'yicha qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    {loading ? (
                        <div className="loading-state">Yuklanmoqda...</div>
                    ) : (
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Foydalanuvchi</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="user-info-cell">
                                                <div className="user-initials">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="user-username">{user.username}</span>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Users;
