import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";


const FormularioPrato = () => {
  
  const [nomePrato, setNomePrato] = useState("");

  const [descricao, setDescricao] = useState('')

  const [tag, setTag] = useState('')
  const[restaurante, setRestaurante] = useState('')
 
  const [imagem, setImagem] = useState<File | null>(null)

  const[tags, setTags] = useState<ITag[]>([])
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
      http.get<{tags: ITag[] }>('tags/')
          .then(response => setTags(response.data.tags))
      http.get<IRestaurante[]>('restaurantes/')  
          .then(response => setRestaurantes(response.data))  
  },[])

  const selecionarArquivo = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) {
      setImagem(e.target.files[0])
    }else {
      setImagem(null)
    }
  }


  const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData ();

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)

    formData.append('tag', tag)

    formData.append('restaurante', restaurante)

    if (imagem) {
      formData.append('imagem', imagem)
    }
    
    http.request({
      url:'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {

           setNomePrato('')
           setDescricao('')
           setTag('')
           setRestaurante('')
           alert('Prato cadastrado com sucesso!')
           
   }) 
      .catch(erro => console.log(erro))
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
        <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
              <TextField
                value={nomePrato}
                onChange={(e) => setNomePrato(e.target.value)}
                label="Nome do Prato"
                variant="standard"
                fullWidth
                required
                margin='dense'
              />
              <TextField
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                label="Descrição do Prato"
                variant="standard"
                fullWidth
                required
                margin="dense"
              />
              <FormControl margin='dense' fullWidth >
                <InputLabel id='select-tag'>Tag</InputLabel>
                <Select labelId='select-tag' value={tag} onChange={e => setTag(e.target.value)}>
                     {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                              {tag.value}
                     </MenuItem>)}
                </Select>
              </FormControl>

              <FormControl margin='dense' fullWidth >
                <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                <Select labelId='select-restaurante' value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                     {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                              {restaurante.nome}
                     </MenuItem>)}
                </Select>
              </FormControl>

              <input type="file" onChange={selecionarArquivo}/>

              <Button sx={{ marginTop: 1 }}type="submit" variant="outlined"fullWidth > Salvar </Button>
            </Box>
          </Box>
  )
}
export default FormularioPrato;