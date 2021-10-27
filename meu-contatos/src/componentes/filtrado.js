import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button} from "reactstrap";
  
const filtrado = ({data, apagar, editar}) => {
    return(
        <Table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Acões</th>
                </tr>
            </thead>
            <tbody>
            {data.map((elemento, id)=>(
                <tr>
                <td>{elemento.nome}</td>
                <td>{elemento.email}</td>
                <td>{elemento.telefone}</td>
                <td>
                    <Button color="primary" onClick={() => editar(elemento)}>Editar</Button>
                    <Button color="danger" onClick={() => apagar(elemento)}>Apagar</Button>
                </td>
                </tr>               
            ))}
            </tbody>
        </Table> 
    )
}

export default filtrado;