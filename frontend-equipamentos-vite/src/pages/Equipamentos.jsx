import React, { useEffect, useState } from 'react';
import { getEquipamentos, criarEquipamento, editarEquipamento, deletarEquipamento } from '../services/api';
import EquipamentoTable from '../components/EquipamentoTable.jsx';
import EquipamentoForm from '../components/EquipamentoForm.jsx';
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, InputAdornment, MenuItem, Box, Pagination, Select, Menu, MenuItem as MuiMenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [editEquip, setEditEquip] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, equipamento: null });
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [situacao, setSituacao] = useState("");
  const [tipos, setTipos] = useState([]);
  const [situacoes, setSituacoes] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Carregar filtros únicos
  const carregarFiltros = (equipamentos) => {
    setTipos([...new Set(equipamentos.map(e => e.tipo).filter(Boolean))]);
    setSituacoes([...new Set(equipamentos.map(e => e.situacao).filter(Boolean))]);
  };

  // Carregar equipamentos do backend com filtros e paginação
  function carregarEquipamentos(filtros = {}) {
    setLoading(true);
    setErro(false);
    getEquipamentos({ ...filtros, page, per_page: perPage })
      .then(data => {
        setEquipamentos(data.itens || data);
        setTotal(data.total || 0);
        setTotalPaginas(data.total_paginas || 1);
        carregarFiltros(data.itens || data);
        setLoading(false);
      })
      .catch(() => {
        setErro(true);
        setLoading(false);
        setSnackbar({ open: true, message: "Erro ao carregar equipamentos.", severity: "error" });
      });
  }

  // Atualizar equipamentos ao mudar filtros, busca ou página
  useEffect(() => {
    const filtros = {};
    if (busca) filtros.busca = busca;
    if (tipo) filtros.tipo = tipo;
    if (situacao) filtros.situacao = situacao;
    carregarEquipamentos(filtros);
  }, [busca, tipo, situacao, page, perPage]);

  const handleCadastrar = async (dados) => {
    try {
      await criarEquipamento(dados);
      setSnackbar({ open: true, message: "Equipamento cadastrado com sucesso!", severity: "success" });
      setFormOpen(false);
      carregarEquipamentos({ busca, tipo, situacao });
    } catch (error) {
      let msg = "Erro ao cadastrar equipamento.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleEditar = async (dados) => {
    try {
      await editarEquipamento(editEquip.id, dados);
      setSnackbar({ open: true, message: "Equipamento atualizado com sucesso!", severity: "success" });
      setEditEquip(null);
      setFormOpen(false);
      carregarEquipamentos({ busca, tipo, situacao });
    } catch (error) {
      let msg = "Erro ao editar equipamento.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleDelete = (equipamento) => {
    setDeleteDialog({ open: true, equipamento });
  };

  const confirmDelete = async () => {
    const equipamento = deleteDialog.equipamento;
    setDeleteDialog({ open: false, equipamento: null });
    try {
      await deletarEquipamento(equipamento.id);
      setSnackbar({ open: true, message: "Equipamento excluído com sucesso!", severity: "success" });
      carregarEquipamentos({ busca, tipo, situacao });
    } catch (error) {
      let msg = "Erro ao excluir equipamento.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleEditClick = (equipamento) => {
    setEditEquip(equipamento);
    setFormOpen(true);
  };

  const handleAddClick = () => {
    setEditEquip(null);
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
    if (situacao) params.append('situacao', situacao);
    let url = '';
    if (formato === 'csv') {
      url = `http://localhost:5000/equipamentos/exportar?${params.toString()}`;
    } else if (formato === 'excel') {
      url = `http://localhost:5000/equipamentos/exportar_excel?${params.toString()}`;
    } else if (formato === 'pdf') {
      url = `http://localhost:5000/equipamentos/exportar_pdf?${params.toString()}`;
    }
    window.open(url, '_blank');
    handleCloseExport();
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Buscar equipamento"
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
          placeholder="Nome, patrimônio, tipo, situação, usuário..."
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
          label="Situação"
          value={situacao}
          onChange={e => setSituacao(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">Todas</MenuItem>
          {situacoes.map((s) => (
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
        <EquipamentoForm
          onSubmit={editEquip ? handleEditar : handleCadastrar}
          initialData={editEquip}
          onCancel={() => { setFormOpen(false); setEditEquip(null); }}
        />
      ) : (
        <>
          <Alert severity="info" sx={{ mb: 2 }}>
            Gerencie os equipamentos do sistema. Clique em "Cadastrar Equipamento" para adicionar um novo.
          </Alert>
          <button onClick={handleAddClick} style={{ marginBottom: 16, padding: '8px 16px', fontSize: 16, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Cadastrar Equipamento
          </button>
        </>
      )}
      <EquipamentoTable equipamentos={equipamentos} onEdit={handleEditClick} onDelete={handleDelete} loading={loading} erro={erro} />
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
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, equipamento: null })}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o equipamento <b>{deleteDialog.equipamento?.nome}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, equipamento: null })} color="secondary">Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Excluir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Equipamentos; 