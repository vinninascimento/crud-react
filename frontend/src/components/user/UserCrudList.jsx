import React, {Component} from "react";
import axios from 'axios'
import Main from "../template/Main";
import { Modal } from "bootstrap";

const headerProps = {
    icon: 'list',
    title: ' Lista',
    subtitle: 'Cadastro de Usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState ={
    user: {name: '', cpf:'', telefone:'', email:'', endereco:''},
    list: []
}


export default class UserCrudList extends Component {


    state = {...initialState}

    componentWillMount (){
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear() {
        this.setState({user: initialState.user})
    }
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}`: baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({user: initialState.user, list})
            })
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u=> u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event){
        const user = { ...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm(){
        return (
            <div className="form me-2">
                <hr />

            </div>
        )
    }

    load(user){
        this.setState({user})
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({list})
        })
    }
    

    renderTable(){
        return (
            <table className="table mt-2 ">     
                <thead>
                    <tr>                        
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user => {
            return (
                <tr key={user.name}>
                  
                    <td>{user.name}</td>
                    <td>{user.cpf}</td>
                    <td>{user.telefone}</td>
                    <td>{user.email}</td>
                    <td>{user.endereco}</td>
                    <td>
                        <button className="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>     

                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle"><strong>Crud de Usuários</strong></h5>
                               <br />
                               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                               <div class="modal-body">
                               <div className="form">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Nome</label>
                                                <input type="text" className="form-control" name="name" 
                                                    value={this.state.user.name}
                                                    onChange={e => this.updateField(e)}
                                                    placeholder="Digite o nome: "/>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>CPF:</label>
                                                <input type="text" className="form-control" name="cpf" 
                                                    value={this.state.user.cpf}
                                                    onChange={e => this.updateField(e)}
                                                    placeholder="Digite o CPF: "/>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Telefone:</label>
                                                <input type="text" className="form-control" name="telefone" 
                                                    value={this.state.user.telefone}
                                                    onChange={e => this.updateField(e)}
                                                    placeholder="Digite o Telefone: "/>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>E-mail</label>
                                                <input type= "text" className="form-control"
                                                    name="email"
                                                    value={this.state.user.email} 
                                                    onChange={e => this.updateField(e)}
                                                    placeholder="Digite o e-mail"/>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Endereço:</label>
                                                <input type="text" className="form-control" name="endereco" 
                                                    value={this.state.user.endereco}
                                                    onChange={e => this.updateField(e)}
                                                    placeholder="Digite o Endereço: "/>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>   
                                </div>
     

                            <div class="modal-footer">
                            <div className="row">
                                        <div className="col-12 d-flex justify-content-end">
                                            <button className="btn btn-primary"
                                                onClick={e => this.save(e)}>
                                                Salvar
                                            </button>
                                            <button className="btn btn-secundary ml-2"
                                                onClick={e => this.clear(e)}>
                                                Cancelar
                                            </button>
                                            <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Fechar</button>
                                        </div>
                                    </div>
                         
                            </div>
                            </div>
                        </div>
                        </div>

                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
                    
            )
        })
    }

    render () {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>

        )
    }
}
