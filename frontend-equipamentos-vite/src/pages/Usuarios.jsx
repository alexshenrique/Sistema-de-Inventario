import React, { useEffect, useState } from "react";
import UsuarioTable from "../components/UsuarioTable";
import UsuarioForm from "../components/UsuarioForm";
import { getUsuarios, criarUsuario, editarUsuario, deletarUsuario } from "../services/api";
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, InputAdornment, MenuItem, Box, Pagination, Select, Menu, MenuItem as MuiMenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [editUser, setEditUser] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, usuario: null });
  const [busca, setBusca] = useState("");
  const [setor, setSetor] = useState("");
  const [funcao, setFuncao] = useState("");
  const [setores, setSetores] = useState([]);
  const [funcoes, setFuncoes] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Carregar filtros únicos
  const carregarFiltros = (usuarios) => {
    setSetores([...new Set(usuarios.map(u => u.setor).filter(Boolean))]);
    setFuncoes([...new Set(usuarios.map(u => u.funcao).filter(Boolean))]);
  };

  // Carregar usuários do backend com filtros e paginação
  const carregarUsuarios = (filtros = {}) => {
    setLoading(true);
    setErro(false);
    getUsuarios({ ...filtros, page, per_page: perPage })
      .then(data => {
        setUsuarios(data.itens || data);
        setTotal(data.total || 0);
        setTotalPaginas(data.total_paginas || 1);
        carregarFiltros(data.itens || data);
        setLoading(false);
      })
      .catch(() => {
        setErro(true);
        setLoading(false);
        setSnackbar({ open: true, message: "Erro ao carregar usuários.", severity: "error" });
      });
  };

  // Atualizar usuários ao mudar filtros, busca ou página
  useEffect(() => {
    const filtros = {};
    if (busca) filtros.nome = busca;
    if (setor) filtros.setor = setor;
    if (funcao) filtros.funcao = funcao;
    carregarUsuarios(filtros);
  }, [busca, setor, funcao, page, perPage]);

  const handleCadastrar = async (dados) => {
    try {
      await criarUsuario(dados);
      setSnackbar({ open: true, message: "Usuário cadastrado com sucesso!", severity: "success" });
      setFormOpen(false);
      carregarUsuarios({ nome: busca, setor, funcao });
    } catch (error) {
      let msg = "Erro ao cadastrar usuário.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleEditar = async (dados) => {
    try {
      await editarUsuario(editUser.id, dados);
      setSnackbar({ open: true, message: "Usuário atualizado com sucesso!", severity: "success" });
      setEditUser(null);
      setFormOpen(false);
      carregarUsuarios({ nome: busca, setor, funcao });
    } catch (error) {
      let msg = "Erro ao editar usuário.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleDelete = (usuario) => {
    setDeleteDialog({ open: true, usuario });
  };

  const confirmDelete = async () => {
    const usuario = deleteDialog.usuario;
    setDeleteDialog({ open: false, usuario: null });
    try {
      await deletarUsuario(usuario.id);
      setSnackbar({ open: true, message: "Usuário excluído com sucesso!", severity: "success" });
      carregarUsuarios({ nome: busca, setor, funcao });
    } catch (error) {
      let msg = "Erro ao excluir usuário.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const handleEditClick = (usuario) => {
    setEditUser(usuario);
    setFormOpen(true);
  };

  const handleAddClick = () => {
    setEditUser(null);
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
    if (setor) params.append('setor', setor);
    if (funcao) params.append('funcao', funcao);
    let url = '';
    if (formato === 'csv') {
      url = `http://localhost:5000/usuarios/exportar?${params.toString()}`;
    } else if (formato === 'excel') {
      url = `http://localhost:5000/usuarios/exportar_excel?${params.toString()}`;
    } else if (formato === 'pdf') {
      url = `http://localhost:5000/usuarios/exportar_pdf?${params.toString()}`;
    }
    window.open(url, '_blank');
    handleCloseExport();
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Buscar usuário"
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
          placeholder="Nome, email, setor, função..."
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          label="Setor"
          value={setor}
          onChange={e => setSetor(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {setores.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Função"
          value={funcao}
          onChange={e => setFuncao(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">Todas</MenuItem>
          {funcoes.map((f) => (
            <MenuItem key={f} value={f}>{f}</MenuItem>
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
        <UsuarioForm
          onSubmit={editUser ? handleEditar : handleCadastrar}
          initialData={editUser}
          onCancel={() => { setFormOpen(false); setEditUser(null); }}
        />
      ) : (
        <>
          <Alert severity="info" sx={{ mb: 2 }}>
            Gerencie os usuários do sistema. Clique em "Cadastrar Usuário" para adicionar um novo.
          </Alert>
          <button onClick={handleAddClick} style={{ marginBottom: 16, padding: '8px 16px', fontSize: 16, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Cadastrar Usuário
          </button>
        </>
      )}
      <UsuarioTable usuarios={usuarios} onEdit={handleEditClick} onDelete={handleDelete} loading={loading} erro={erro} />
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
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, usuario: null })}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o usuário <b>{deleteDialog.usuario?.nome}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, usuario: null })} color="secondary">Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Excluir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Usuarios; 