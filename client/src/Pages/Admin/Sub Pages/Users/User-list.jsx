import React, { useState, useEffect } from "react";
import "./User-list.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../../../utils/newRequest.js";
import { Link } from "react-router-dom";

const UserList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest.get(`/users`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const deleteUser = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/users/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate(userId);
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(
        data.map((user) => ({
          ...user,
          showPassword: false,
        }))
      );
    }
  }, [data]);

  const togglePassword = (index) => {
    setUsers(
      users.map((user, i) =>
        i === index ? { ...user, showPassword: !user.showPassword } : user
      )
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="users-table">
      <div className="users-table-header">
        <h2>User List</h2>
        <Link to="/admin/addUser">
          <button>Add User +</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Employee Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstName + ' ' + user.lastName}</td>
              <td>{user.username}</td>
              <td className="password-cell">
                {user.showPassword ? user.password : "••••••••"}
              </td>
              {user.admin ? <td>Admin</td> : <td>User</td>}
              <td className="action-buttons">
                <button
                  className="show-hide-button"
                  onClick={() => togglePassword(index)}
                >
                  {user.showPassword ? "Hide" : "Show"}
                </button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
