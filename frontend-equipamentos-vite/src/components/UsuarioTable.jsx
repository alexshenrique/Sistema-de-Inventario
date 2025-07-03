import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Skeleton, Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SkeletonRow = () => (
  <TableRow>
    {[...Array(6)].map((_, i) => (
      <TableCell key={i}><Skeleton variant="text" /></TableCell>
    ))}
  </TableRow>
);

const UsuarioTable = ({ usuarios, onEdit, onDelete, loading, erro }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    {erro && <Alert severity="error">Erro ao carregar usuários.</Alert>}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Setor</TableCell>
          <TableCell>Função</TableCell>
          <TableCell align="right">Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          : (usuarios.length > 0 ? usuarios.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.nome}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.setor}</TableCell>
              <TableCell>{u.funcao}</TableCell>
              <TableCell align="right">
                <Tooltip title="Editar usuário">
                  <IconButton color="primary" onClick={() => onEdit(u)} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir usuário">
                  <IconButton color="error" onClick={() => onDelete(u)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={6} align="center">Nenhum usuário cadastrado.</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UsuarioTable; 