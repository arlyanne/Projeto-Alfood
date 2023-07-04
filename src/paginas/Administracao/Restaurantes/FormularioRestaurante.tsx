import { TextField, Button, Typography, Box, Container, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";



const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get(`restaurantes/${parametros.id}/`)
        .then((response) => setNomeRestaurante(response.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState<String>("");

  const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso!");
        });
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastro com sucesso!");
        });
    }
  };
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          {/* Conteudo da Página */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography component="h1" variant="h6">
              Formulário de Restaurantes
            </Typography>
            <Box
              component="form"
              sx={{ width: "100%" }}
              onSubmit={aoSubmeterForm}
            >
              <TextField
                value={nomeRestaurante}
                onChange={(e) => setNomeRestaurante(e.target.value)}
                label="Nome do Restaurante"
                variant="standard"
                fullWidth
                required
              />
              <Button
                sx={{ marginTop: 1 }}
                type="submit"
                variant="outlined"
                fullWidth
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default FormularioRestaurante;