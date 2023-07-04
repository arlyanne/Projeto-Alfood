import {useEffect, useState} from 'react';
import { TableContainer,Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

import {  Link as RouterLink } from 'react-router-dom';

const AdministracaoPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>("pratos/")
        .then(response => setPratos(response.data))
  }, [])

  const excluir = (pratoAhSerexcluido: IPrato) => {
    http.delete(`pratos/${pratoAhSerexcluido.id}/`)
        .then(() => {
              const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerexcluido.id)
              setPratos([...listaPratos])
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>imagem</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map((prato) => (
              <TableRow key={prato.id}>
                <TableCell>{prato.nome}</TableCell>

                <TableCell>{prato.tag}</TableCell>

                <TableCell>[<a href={prato.imagem} target="blank" rel="noreferrer"> Ver imagem</a>]</TableCell>

                <TableCell>[<RouterLink to={`/admin/pratos/${prato.id}`}>Editar</RouterLink>{" "}]</TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(prato)}>Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AdministracaoPratos;

