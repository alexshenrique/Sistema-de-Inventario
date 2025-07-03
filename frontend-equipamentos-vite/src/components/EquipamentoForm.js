import React, { useState, useEffect, useRef } from "react";
import {
  TextField, Button, Paper, Grid, Typography, Fade, MenuItem, FormControl, InputLabel, Select
} from "@mui/material";

const tipos = ["notebook", "desktop", "monitor", "impressora"];
const situacoes = ["disponível", "manutenção", "emprestado", "descartado"];

const estadoInicial = {
  nome: "",
  tipo: "notebook",
  situacao: "disponível",
  numero_patrimonio: "",
  data_ultima_utilizacao: "",
  usuario_id: "",
  observacoes: ""
};

const EquipamentoForm = ({ onSubmit, initialData, onCancel, apiError }) => {
  const [form, setForm] = useState(estadoInicial);
  const [errors, setErrors] = useState({});
  const nomeRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm({ ...estadoInicial, ...initialData });
    } else {
      setForm(estadoInicial);
    }
    setErrors({});
  }, [initialData]);

  useEffect(() => {
    if (nomeRef.current) {
      nomeRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (apiError && apiError.fields) {
      setErrors(apiError.fields.reduce((acc, field) => {
        acc[field] = apiError.message;
        return acc;
      }, {}));
    }
  }, [apiError]);

  const validate = () => {
    const newErrors = {};
    if (!form.nome) newErrors.nome = "Nome é obrigatório";
    if (!form.numero_patrimonio) newErrors.numero_patrimonio = "Nº Patrimônio é obrigatório";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(form, setErrors);
  };

  return (
    <Fade in={true}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {initialData ? "Editar Equipamento" : "Cadastrar Equipamento"}
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="on">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                fullWidth
                required
                inputRef={nomeRef}
                error={!!errors.nome}
                helperText={errors.nome}
                aria-label="Nome do equipamento"
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
                  aria-label="Tipo do equipamento"
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
                  aria-label="Situação do equipamento"
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
                error={!!errors.numero_patrimonio}
                helperText={errors.numero_patrimonio}
                aria-label="Número de patrimônio"
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
                aria-label="Data da última utilização"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Usuário ID (opcional)"
                name="usuario_id"
                value={form.usuario_id}
                onChange={handleChange}
                fullWidth
                aria-label="ID do usuário vinculado"
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
                aria-label="Observações do equipamento"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }} aria-label="Salvar equipamento">
                {initialData ? "Salvar" : "Cadastrar"}
              </Button>
              {onCancel && (
                <Button variant="outlined" color="secondary" onClick={onCancel} aria-label="Cancelar edição">
                  Cancelar
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Fade>
  );
};

export default EquipamentoForm; 