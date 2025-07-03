import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";

const tipos = ["notebook", "desktop", "monitor", "impressora"];
const situacoes = ["disponível", "manutenção", "emprestado", "descartado"];

const EquipamentoForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    nome: "",
    tipo: "notebook",
    situacao: "disponível",
    numero_patrimonio: "",
    data_ultima_utilizacao: "",
    usuario_id: "",
    observacoes: "",
    marca: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Cadastrar Equipamento
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth required>
              <InputLabel>Tipo</InputLabel>
              <Select
                label="Tipo"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
              >
                {tipos.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth required>
              <InputLabel>Situação</InputLabel>
              <Select
                label="Situação"
                name="situacao"
                value={form.situacao}
                onChange={handleChange}
              >
                {situacoes.map((sit) => (
                  <MenuItem key={sit} value={sit}>{sit}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Nº Patrimônio"
              name="numero_patrimonio"
              value={form.numero_patrimonio}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Data Última Utilização"
              name="data_ultima_utilizacao"
              value={form.data_ultima_utilizacao}
              onChange={handleChange}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Usuário ID (opcional)"
              name="usuario_id"
              value={form.usuario_id}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Marca"
              value={form.marca || ''}
              onChange={e => setForm({ ...form, marca: e.target.value })}
              required
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observações"
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EquipamentoForm;