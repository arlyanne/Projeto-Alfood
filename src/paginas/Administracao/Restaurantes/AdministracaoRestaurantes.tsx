import {useEffect, useState} from 'react';
import IRestaurante from "../../../interfaces/IRestaurante";
import { TableContainer,Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import { Link } from '@mui/icons-material';

const AdministracaoRestaurantes = () => {
    
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect (() =>{
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
          .then(response => {
            setRestaurantes (response.data)
          })
    }, [])
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            [<Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]
                        </TableCell>
                    </TableRow>)}
                <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default AdministracaoRestaurantes;