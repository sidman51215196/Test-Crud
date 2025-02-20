import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/UserService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, TablePagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom"; // Import navigation

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleAddUser = async () => {
    if (!name || !email || !age) return;
    await createUser({ name, email, age: parseInt(age) });
    resetForm();
    fetchUsers();
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    await updateUser(editingUser._id, { name, email, age: parseInt(age) });
    resetForm();
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age.toString());
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleView = (user) => {
    navigate(`/profile/${user._id}`, { state: { user } }); // Pass user data as state
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setEditingUser(null);
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Enhanced search to filter by name, email, or age
  const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.age.toString().includes(searchLower)
    );
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", padding: 3 }}>
      
      {/* Search Box */}
      <TextField 
        label="Search" 
        variant="outlined" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        sx={{ marginBottom: 2, width: "50%" }}
      />

      {/* Input Form */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Age" variant="outlined" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        {editingUser ? (
          <Button variant="contained" color="primary" onClick={handleUpdateUser}>
            Update
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleAddUser}>
            Add
          </Button>
        )}
      </Box>

      {/* Centered MUI Table */}
      <TableContainer component={Paper} sx={{ width: "80%", maxWidth: "800px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>Name</b></TableCell>
              <TableCell align="center"><b>Email</b></TableCell>
              <TableCell align="center"><b>Age</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Implement pagination
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.age}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleEdit(user)}>
                        <EditIcon color="primary" />
                      </Button>
                      <Button onClick={() => handleDelete(user._id)}>
                        <DeleteIcon color="error" />
                      </Button>
                      <Button onClick={() => handleView(user)}>
                        <VisibilityIcon color="action" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </TableContainer>
    </Box>
  );
};

export default UserList;
