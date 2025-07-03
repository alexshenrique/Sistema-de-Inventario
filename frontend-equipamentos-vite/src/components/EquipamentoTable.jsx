import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Typography,
  IconButton,
  Tooltip,
  Skeleton
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

const EquipamentoTable = ({ equipamentos, onEdit, onDelete, loading, erro }) => {
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><CircularProgress /></div>;
  if (erro) return <Alert severity="error">Erro ao carregar equipamentos.</Alert>;

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Lista de Equipamentos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Número Patrimônio</TableCell>
            <TableCell>Situação</TableCell>
            <TableCell>Data Última Utilização</TableCell>
            <TableCell>Observações</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : (equipamentos.length > 0 ? equipamentos.map((eq) => (
              <TableRow key={eq.id}>
                <TableCell>{eq.id}</TableCell>
                <TableCell>{eq.nome}</TableCell>
                <TableCell>{eq.tipo}</TableCell>
                <TableCell>{eq.marca}</TableCell>
                <TableCell>{eq.numero_patrimonio}</TableCell>
                <TableCell>{eq.situacao}</TableCell>
                <TableCell>{eq.data_ultima_utilizacao || '-'}</TableCell>
                <TableCell>{eq.observacoes || '-'}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar equipamento">
                    <IconButton color="primary" onClick={() => onEdit(eq)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir equipamento">
                    <IconButton color="error" onClick={() => onDelete(eq)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} align="center">Nenhum equipamento cadastrado.</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EquipamentoTable; 