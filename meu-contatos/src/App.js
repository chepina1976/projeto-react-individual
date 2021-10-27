import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Navbar} from 'reactstrap';
import Filtrado from './componentes/filtrado';
import { getAllContatos, criarContatos, editarContato, deletarContato } from './componentes/Api'


const data = [];



class App extends React.Component {
  state = {
    data: data,
    form: {
      nome: "",
      email:"",
      telefone: "",
      
    }, 
    dataSearch: [],
    modalInserir: false,
    modalAtualizar: false,
    modalConfirmacao: false
  };

  

  handleChange = e =>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }
 
  //#região metodos de modales
  mostrarModalAtualizar = (valor) => {
    this.setState({
      form: valor,
      modalAtualizar: true,
    });
  };

  fecharModalAtualizar = () => {
    this.setState({ modalAtualizar: false })

  };

  mostrarModalInserir = () => {
    this.setState({
      modalInserir: true,
    });
  };

  fecharModalInserir = () => {
    this.setState({ modalInserir: false });
  };

  mostrarConfirmacao = (valor) => {
    this.setState({
      form: valor,
      modalConfirmacao: true
    });
    
  };

  fecharConfirmacao = () =>{
    this.setState({ modalConfirmacao: false });
  }
//#endregião
  
  //#região CRUD
  inserir = async() =>{
    let valorNovo = this.state.form;
    await criarContatos(valorNovo)
    this.obterDados()

  
  }

  componentDidMount () {
    this.obterDados ()
  }

  obterDados = async() => {
    let contatos = await getAllContatos ()
    this.setState({data: contatos.data, modalInserir: false})
  }
  
 
  
  editar = async(valor) =>{
      const {id, ...data} = valor
     await editarContato(id,data)
    
    this.setState({ modalAtualizar: false})
    this.obterDados()
  }



  apagar = (valor) =>{
    const {id} = valor 
    deletarContato(id);
      this.setState({modalConfirmacao: false});
      this.obterDados()

  }



  filtrar = (e) =>{
    const { value } = e.target;
    let lista = this.state.data;
    const filtered = lista.filter(fltr => fltr.nome.toLowerCase().includes(value.toLowerCase()));
    
    // this.setState({data: filtered});
    this.setState({ dataSearch: !value ?  [] : filtered});   
  }
  //#endregion

  render() {  
    return (
      <>    
        <Navbar color="info" light expand="md">
          <div className="container-fluid">
            <a className="navbar-brand"> contatos - <strong>Projeto React</strong></a>            
            <form  className="d-flex">
              <input className="form-control me-2" onChange={this.filtrar} type="search" placeholder="Procurar" aria-label="Search"></input>
            </form>
            </div>
            </Navbar>       
          
        <Container>             
          <Filtrado 
            data = {this.state.dataSearch.length ? this.state.dataSearch : this.state.data}
            apagar = {this.mostrarConfirmacao}
            editar = {this.mostrarModalAtualizar}
          />   
          
          <br />
          <Button color="info" onClick={()=>this.mostrarModalInserir()}>Adicionar novo contato</Button>
          <br />
          <br/> 
        </Container>
        {/* Modal Inserir */}
        <Modal isOpen = {this.state.modalInserir}>
          <ModalHeader>
            <div>
              <h3>Adicionar contacto</h3>
            </div>       
          </ModalHeader>

          <ModalBody>
           
            <FormGroup>
              <label>Nome</label> 
              <input className="form-control" name="nome" type= "text" onChange={this.handleChange}/>
            </FormGroup> 

            <FormGroup>
              <label>Email</label> 
              <input className="form-control" name="email" type= "text" onChange={this.handleChange}/>
            </FormGroup> 

            <FormGroup>
              <label>Telefone</label> 
              <input className="form-control" name="telefone" type= "text" onChange={this.handleChange}/>
            </FormGroup> 
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.inserir()}>Adicionar</Button>
            <Button color="danger" onClick={() => this.fecharModalInserir()}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        {/* Modal atualizar */}
        <Modal isOpen={this.state.modalAtualizar}>
          <ModalHeader>
            <div>
                <h3>Editar contato</h3>
            </div>       
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>Nome</label> 
              <input className="form-control" name="nome" type= "text" onChange={this.handleChange} value={this.state.form.nome}/>
            </FormGroup> 

            <FormGroup>
              <label>Email</label> 
              <input className="form-control" name="email" type= "text" onChange={this.handleChange} value={this.state.form.email}/>
            </FormGroup> 

            <FormGroup>
              <label>Telefone</label> 
              <input className="form-control" name="telefone" type= "text" onChange={this.handleChange} value={this.state.form.telefone}/>
            </FormGroup> 
            
             
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Salvar</Button>
            <Button color="danger" onClick={()=>this.fecharModalAtualizar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen = {this.state.modalConfirmacao}>
          <ModalHeader>
            <h4> Tem certeza que deseja apagar o contato? </h4>
          </ModalHeader>
          <ModalBody>
            <Button color="primary" onClick={()=> this.apagar(this.state.form)}> Sim</Button> {"   "}
            <Button color="danger" onClick={()=>this.fecharConfirmacao()}> Não</Button>
          </ModalBody>        
        </Modal>      
      </>
    );
  }
}


export default App;
