import React, { useEffect, useState } from "react";
import ManutencaoTable from "../components/ManutencaoTable";
import ManutencaoForm from "../components/ManutencaoForm";
import { getManutencoes, criarManutencao, editarManutencao, deletarManutencao } from "../services/api";
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, InputAdornment, MenuItem, Box, Pagination, Select, Menu, MenuItem as MuiMenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Manutencoes = () => {
  const [manutencoes, setManutencoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [editManut, setEditManut] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, manutencao: null });
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [tipos, setTipos] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Carregar filtros únicos
  const carregarFiltros = (manutencoes) => {
    setTipos([...new Set(manutencoes.map(m => m.tipo_manutencao || m.tipo).filter(Boolean))]);
    setStatuses([...new Set(manutencoes.map(m => m.status).filter(Boolean))]);
  };

  // Carregar manutenções do backend com filtros e paginação
  const carregarManutencoes = (filtros = {}) => {
    setLoading(true);
    setErro(false);
    getManutencoes({ ...filtros, page, per_page: perPage })
      .then(data => {
        setManutencoes(data.itens || data);
        setTotal(data.total || 0);
        setTotalPaginas(data.total_paginas || 1);
        carregarFiltros(data.itens || data);
        setLoading(false);
      })
      .catch(() => {
        setErro(true);
        setLoading(false);
        setSnackbar({ open: true, message: "Erro ao carregar manutenções.", severity: "error" });
      });
  };

  // Atualizar manutenções ao mudar filtros, busca ou página
  useEffect(() => {
    const filtros = {};
    if (busca) filtros.descricao = busca;
    if (tipo) filtros.tipo = tipo;
    if (status) filtros.status = status;
    carregarManutencoes(filtros);
  }, [busca, tipo, status, page, perPage]);

  const handleCadastrar = async (dados) => {
    try {
      await criarManutencao(dados);
      setSnackbar({ open: true, message: "Manutenção cadastrada com sucesso!", severity: "success" });
      setFormOpen(false);
      carregarManutencoes({ descricao: busca, tipo, status });
    } catch (error) {
      let msg = "Erro ao cadastrar manutenção.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleEditar = async (dados) => {
    try {
      await editarManutencao(editManut.id, dados);
      setSnackbar({ open: true, message: "Manutenção atualizada com sucesso!", severity: "success" });
      setEditManut(null);
      setFormOpen(false);
      carregarManutencoes({ descricao: busca, tipo, status });
    } catch (error) {
      let msg = "Erro ao editar manutenção.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleDelete = (manutencao) => {
    setDeleteDialog({ open: true, manutencao });
  };

  const confirmDelete = async () => {
    const manutencao = deleteDialog.manutencao;
    setDeleteDialog({ open: false, manutencao: null });
    try {
      await deletarManutencao(manutencao.id);
      setSnackbar({ open: true, message: "Manutenção excluída com sucesso!", severity: "success" });
      carregarManutencoes({ descricao: busca, tipo, status });
    } catch (error) {
      let msg = "Erro ao excluir manutenção.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleEditClick = (manutencao) => {
    setEditManut(manutencao);
    setFormOpen(true);
  };

  const handleAddClick = () => {
    setEditManut(null);
    setFormOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangePerPage = (event) => {
    setPerPage(Number(event.target.value));
    setPage(1);
  };

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseExport = () => {
    setAnchorEl(null);
  };

  // Função para exportar em diferentes formatos
  const handleExportar = (formato) => {
    const params = new URLSearchParams();
    if (busca) params.append('busca', busca);
    if (tipo) params.append('tipo', tipo);
    if (status) params.append('status', status);
    let url = '';
    if (formato === 'csv') {
      url = `http://localhost:5000/manutencoes/exportar?${params.toString()}`;
    } else if (formato === 'excel') {
      url = `http://localhost:5000/manutencoes/exportar_excel?${params.toString()}`;
    } else if (formato === 'pdf') {
      url = `http://localhost:5000/manutencoes/exportar_pdf?${params.toString()}`;
    }
    window.open(url, '_blank');
    handleCloseExport();
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Buscar manutenção"
          variant="outlined"
          size="small"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Tipo, status, descrição, responsável..."
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          label="Tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {tipos.map((t) => (
            <MenuItem key={t} value={t}>{t}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportClick}
          sx={{ height: 40 }}
        >
          Exportar
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseExport}>
          <MuiMenuItem onClick={() => handleExportar('csv')}>Exportar CSV</MuiMenuItem>
          <MuiMenuItem onClick={() => handleExportar('excel')}>Exportar Excel</MuiMenuItem>
          <MuiMenuItem onClick={() => handleExportar('pdf')}>Exportar PDF</MuiMenuItem>
        </Menu>
      </Box>
      {formOpen ? (
        <ManutencaoForm
          onSubmit={editManut ? handleEditar : handleCadastrar}
          initialData={editManut}
          onCancel={() => { setFormOpen(false); setEditManut(null); }}
        />
      ) : (
        <>
          <Alert severity="info" sx={{ mb: 2 }}>
            Gerencie as manutenções do sistema. Clique em "Cadastrar Manutenção" para adicionar uma nova.
          </Alert>
          <button onClick={handleAddClick} style={{ marginBottom: 16, padding: '8px 16px', fontSize: 16, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Cadastrar Manutenção
          </button>
        </>
      )}
      <ManutencaoTable manutencoes={manutencoes} onEdit={handleEditClick} onDelete={handleDelete} loading={loading} erro={erro} />
      {/* Paginação */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Pagination
          count={totalPaginas}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>Itens por página:</span>
          <Select value={perPage} onChange={handleChangePerPage} size="small">
            {[5, 10, 20, 50].map((n) => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </Select>
          <span style={{ marginLeft: 8 }}>
            {total > 0 ? `Exibindo ${(page - 1) * perPage + 1} - ${Math.min(page * perPage, total)} de ${total}` : 'Nenhum resultado'}
          </span>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, manutencao: null })}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir a manutenção #{deleteDialog.manutencao?.id}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, manutencao: null })} color="secondary">Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Excluir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Manutencoes; 