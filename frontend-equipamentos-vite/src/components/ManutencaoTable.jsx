import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Skeleton, Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SkeletonRow = () => (
  <TableRow>
    {[...Array(7)].map((_, i) => (
      <TableCell key={i}><Skeleton variant="text" /></TableCell>
    ))}
  </TableRow>
);

const ManutencaoTable = ({ manutencoes, onEdit, onDelete, loading, erro }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    {erro && <Alert severity="error">Erro ao carregar manutenções.</Alert>}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Equipamento ID</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Responsável</TableCell>
          <TableCell align="right">Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          : (manutencoes.length > 0 ? manutencoes.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.id}</TableCell>
              <TableCell>{m.equipamento_id}</TableCell>
              <TableCell>{m.data}</TableCell>
              <TableCell>{m.tipo}</TableCell>
              <TableCell>{m.descricao}</TableCell>
              <TableCell>{m.responsavel}</TableCell>
              <TableCell align="right">
                <Tooltip title="Editar manutenção">
                  <IconButton color="primary" onClick={() => onEdit(m)} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir manutenção">
                  <IconButton color="error" onClick={() => onDelete(m)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={7} align="center">Nenhuma manutenção cadastrada.</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ManutencaoTable; 