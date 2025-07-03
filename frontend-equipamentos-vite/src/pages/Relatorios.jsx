import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';

const COLORS = ['#1976d2', '#388e3c', '#fbc02d', '#d32f2f', '#7b1fa2', '#0288d1', '#ff9800', '#009688'];

export default function Relatorios() {
  const [manutencoesMes, setManutencoesMes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [equipPorMarca, setEquipPorMarca] = useState([]);

  useEffect(() => {
    async function fetchManutencoesMes() {
      try {
        const { data } = await api.get('/relatorios/manutencoes_por_mes');
        // Converter objeto em array para o gráfico
        const arr = Object.entries(data).map(([mes, total]) => ({ mes, total }));
        setManutencoesMes(arr);
      } catch (e) {
        setManutencoesMes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchManutencoesMes();
  }, []);

  useEffect(() => {
    async function fetchEquipPorMarca() {
      try {
        const { data } = await api.get('/relatorios/equipamentos_por_marca');
        const arr = Object.entries(data).map(([marca, total]) => ({ marca, total }));
        setEquipPorMarca(arr);
      } catch (e) {
        setEquipPorMarca([]);
      }
    }
    fetchEquipPorMarca();
  }, []);

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Relatórios e Dashboards
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">Equipamentos por Marca</Typography>
              {equipPorMarca.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={equipPorMarca} dataKey="total" nameKey="marca" cx="50%" cy="50%" outerRadius={100} label>
                      {equipPorMarca.map((entry, idx) => (
                        <Cell key={`cell-marca-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">Manutenções por Mês</Typography>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={manutencoesMes}>
                    <XAxis dataKey="mes" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#1976d2" name="Manutenções" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">Gráfico 1</Typography>
              {/* Espaço para gráfico futuro */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">Gráfico 2</Typography>
              {/* Espaço para gráfico futuro */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 