import React from 'react';
import AdminDeleteUser from './AdminDeleteUser';

const AdminDeleteUser = ({ userId, onDelete }) => {
  return (
    <button onClick={() => onDelete(userId)} className="admin-users-delete-button">
      Delete
    </button>
  );
};

export default AdminDeleteUser;
