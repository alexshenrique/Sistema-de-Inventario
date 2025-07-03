import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Box, CircularProgress, Stack } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Link } from "react-router-dom";
import api from '../services/api';
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const statusIcons = {
  "disponível": <DevicesIcon color="success" sx={{ fontSize: 40 }} />,
  "manutenção": <BuildIcon color="warning" sx={{ fontSize: 40 }} />,
  "emprestado": <DevicesIcon color="info" sx={{ fontSize: 40 }} />,
  "descartado": <DevicesIcon color="error" sx={{ fontSize: 40 }} />,
};

const COLORS = ['#1976d2', '#388e3c', '#fbc02d', '#d32f2f', '#7b1fa2', '#0288d1'];

const Dashboard = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    api.get('/equipamentos').then((data) => {
      setEquipamentos(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    async function fetchResumo() {
      try {
        const { data } = await api.get('/dashboard');
        setResumo(data);
      } catch (e) {
        setResumo(null);
      } finally {
        setLoading(false);
      }
    }
    fetchResumo();
  }, []);

  const total = equipamentos.length;
  const disponiveis = equipamentos.filter(e => e.situacao === "disponível").length;
  const manutencao = equipamentos.filter(e => e.situacao === "manutenção").length;
  const emprestados = equipamentos.filter(e => e.situacao === "emprestado").length;
  const descartados = equipamentos.filter(e => e.situacao === "descartado").length;

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (!resumo) {
    return <Typography color="error">Erro ao carregar o resumo do sistema.</Typography>;
  }

  // Dados para gráficos
  const tipos = Object.entries(resumo.equipamentos_por_tipo || {}).map(([tipo, qtd]) => ({ name: tipo, value: qtd }));
  const situacoes = Object.entries(resumo.equipamentos_por_situacao || {}).map(([sit, qtd]) => ({ name: sit, value: qtd }));
  const manutencoesMes = [
    { name: 'Este mês', value: resumo.manutencoes_mes_atual || 0 },
    { name: 'Total', value: resumo.total_manutencoes || 0 }
  ];

  const cardStyle = {
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 3,
    borderRadius: 2,
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  };

  const iconStyle = { fontSize: 40, marginBottom: 8 };

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Bem-vindo ao Sistema de Gestão de Equipamentos de TI!
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {/* Cards de resumo */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <DevicesIcon color="primary" sx={iconStyle} />
            <Typography variant="h6">Equipamentos</Typography>
            <Typography variant="h4">{resumo.total_equipamentos}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <PeopleIcon color="secondary" sx={iconStyle} />
            <Typography variant="h6">Usuários</Typography>
            <Typography variant="h4">{resumo.total_usuarios}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <BuildIcon color="success" sx={iconStyle} />
            <Typography variant="h6">Manutenções</Typography>
            <Typography variant="h4">{resumo.total_manutencoes}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <CalendarMonthIcon color="action" sx={iconStyle} />
            <Typography variant="h6">Manut. mês atual</Typography>
            <Typography variant="h4">{resumo.manutencoes_mes_atual}</Typography>
          </Card>
        </Grid>
        {/* Gráficos */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">Equipamentos por Tipo</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={tipos} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {tipos.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">Equipamentos por Situação</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={situacoes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {situacoes.map((entry, idx) => (
                      <Cell key={`cell-sit-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">Manutenções</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={manutencoesMes}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 