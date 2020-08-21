import { Component, OnInit } from '@angular/core';
import { Cliente } from '../_modules/Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../_services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente;
  clientesFiltrados: Cliente[];
  _filtroLista = '';
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarCliente = '';
  titulo = 'Clientes';
  idCliente: number;
  dataEvento: string;
  dataAtual: string;


  constructor(private clienteService: ClienteService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService) {
    this.localeService.use('pt-br')
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.clientesFiltrados = this.filtroLista ? this.filtrarCliente(this.filtroLista) : this.clientes;
  }

  ngOnInit() {
    this.validation();
    this.getClientes();
  }

  filtrarCliente(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.nomeCliente.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  editarCliente(cliente: Cliente, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.idCliente = cliente.clienteId;
    this.cliente = Object.assign({}, cliente);
    this.registerForm.patchValue(this.cliente);
  }
  novoCliente(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }
  excluirCliente(cliente: Cliente, template: any) {
    this.openModal(template);
    this.cliente = cliente;
    this.bodyDeletarCliente = `Tem certeza que deseja excluir o Cliente: ${cliente.nomeCliente}, Código: ${cliente.clienteId}`;
  }
  confirmeDelete(template: any) {
    this.clienteService.deleteCliente(this.cliente.clienteId).subscribe(
      () => {
        template.hide();
        this.getClientes();
        this.toastr.success('Deletado com Sucesso!');
      }, error => {
        this.toastr.error('Erro ao Tentar deletar!');
      }
    );
  }
  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.cliente = Object.assign({userId: sessionStorage.getItem('id')}, this.registerForm.value);
        this.clienteService.postCliente(this.cliente).subscribe(
          (novoEvento: Cliente) => {
            template.hide();
            this.getClientes();
            this.toastr.success('Inserido com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Inserir: ${error}`);
          }
        );
      } else {
        this.cliente = Object.assign({ clienteId: this.idCliente , userId: sessionStorage.getItem('id') }, this.registerForm.value);
        this.clienteService.putCliente(this.cliente).subscribe(
          () => {
            template.hide();
            this.getClientes();
            this.toastr.success('Editado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`);
          }
        );
      }
    }
  }
  validation() {
    this.registerForm = this.fb.group({
      nomeCliente: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      numeroTelefone: ['', Validators.required],
    });
  }
  getClientes() {
    var id = sessionStorage.getItem('id');
    this.clienteService.getAllClienteById(id).subscribe(
      (_clientes: Cliente[]) => {
        this.clientes = _clientes;
        this.clientesFiltrados = this.clientes;
        console.log(this.clientes);
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar clientes: ${error}`);
      });
  }
}
