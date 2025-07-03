import React, { useState, useEffect, useRef } from "react";
import {
  TextField, Button, Paper, Grid, Typography, Fade
} from "@mui/material";

const estadoInicial = {
  nome: "",
  email: "",
  setor: "",
  funcao: "",
  senha: ""
};

const UsuarioForm = ({ onSubmit, initialData, onCancel, apiError }) => {
  const [form, setForm] = useState(estadoInicial);
  const [errors, setErrors] = useState({});
  const nomeRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm({ ...estadoInicial, ...initialData, senha: "" });
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
    if (!form.email) newErrors.email = "E-mail é obrigatório";
    if (!initialData && !form.senha) newErrors.senha = "Senha é obrigatória";
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
          {initialData ? "Editar Usuário" : "Cadastrar Usuário"}
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
                aria-label="Nome do usuário"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email}
                aria-label="E-mail do usuário"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Setor"
                name="setor"
                value={form.setor}
                onChange={handleChange}
                fullWidth
                aria-label="Setor do usuário"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Função"
                name="funcao"
                value={form.funcao}
                onChange={handleChange}
                fullWidth
                aria-label="Função do usuário"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Senha"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                type="password"
                fullWidth
                required={!initialData}
                helperText={initialData ? "Preencha para alterar a senha" : errors.senha}
                error={!!errors.senha}
                aria-label="Senha do usuário"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }} aria-label="Salvar usuário">
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

export default UsuarioForm; 