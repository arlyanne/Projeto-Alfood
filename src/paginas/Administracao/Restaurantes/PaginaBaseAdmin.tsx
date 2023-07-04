import { Button, Typography, Box, AppBar, Container, Toolbar, Link, Paper } from "@mui/material";

import { Outlet, Link as RouterLink } from 'react-router-dom';

const PaginaBaseAdmin = () => {
  
  
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", felxGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            {/* Aqui deve ir conteudo */}
               <Outlet/>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
export default PaginaBaseAdmin;