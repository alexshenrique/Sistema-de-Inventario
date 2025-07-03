import React, { useState, useEffect, useRef } from "react";
import {
  TextField, Button, Paper, Grid, Typography, Fade
} from "@mui/material";

const estadoInicial = {
  equipamento_id: "",
  data: "",
  tipo: "",
  descricao: "",
  responsavel: ""
};

const ManutencaoForm = ({ onSubmit, initialData, onCancel, apiError }) => {
  const [form, setForm] = useState(estadoInicial);
  const [errors, setErrors] = useState({});
  const equipamentoRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm({ ...estadoInicial, ...initialData });
    } else {
      setForm(estadoInicial);
    }
    setErrors({});
  }, [initialData]);

  useEffect(() => {
    if (equipamentoRef.current) {
      equipamentoRef.current.focus();
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
    if (!form.equipamento_id) newErrors.equipamento_id = "ID do Equipamento é obrigatório";
    if (!form.data) newErrors.data = "Data é obrigatória";
    if (!form.tipo) newErrors.tipo = "Tipo é obrigatório";
    if (!form.descricao) newErrors.descricao = "Descrição é obrigatória";
    if (!form.responsavel) newErrors.responsavel = "Responsável é obrigatório";
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
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {initialData ? "Editar Manutenção" : "Cadastrar Manutenção"}
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="on">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="ID do Equipamento"
                name="equipamento_id"
                value={form.equipamento_id}
                onChange={handleChange}
                fullWidth
                required
                inputRef={equipamentoRef}
                error={!!errors.equipamento_id}
                helperText={errors.equipamento_id}
                aria-label="ID do equipamento"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Data"
                name="data"
                value={form.data}
                onChange={handleChange}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.data}
                helperText={errors.data}
                aria-label="Data da manutenção"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tipo"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.tipo}
                helperText={errors.tipo}
                aria-label="Tipo da manutenção"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Descrição"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={2}
                required
                error={!!errors.descricao}
                helperText={errors.descricao}
                aria-label="Descrição da manutenção"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Responsável"
                name="responsavel"
                value={form.responsavel}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.responsavel}
                helperText={errors.responsavel}
                aria-label="Responsável pela manutenção"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }} aria-label="Salvar manutenção">
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

export default ManutencaoForm; 