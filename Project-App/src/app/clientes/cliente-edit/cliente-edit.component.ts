import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_modules/User';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/_modules/Cliente';
import { ClienteService } from 'src/app/_services/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  titulo = 'Editar Cliente';
  cliente: Cliente = new Cliente();
  registerForm: FormGroup;
  dataAtual = '';

  get endereco(): FormArray {
    return <FormArray>this.registerForm.get('endereco');
  }


  constructor(
    private clienteService: ClienteService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
    , private router: ActivatedRoute
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.validation();
    this.carregarCliente();
  }

  carregarCliente() {
    const idUsuario = +this.router.snapshot.paramMap.get('id');
    this.cliente.clienteId = idUsuario;
    this.clienteService.getClienteById(idUsuario)
      .subscribe(
        (cliente: Cliente) => {
          this.cliente = Object.assign({}, cliente);
          this.registerForm.patchValue(this.cliente);
          this.cliente.endereco.forEach(end => {
            this.endereco.push(this.criaLote(end));
          });
        }
      );
  }

  validation() {
    this.registerForm = this.fb.group({
      clienteId: [],
      nomeCliente: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      numeroTelefone: ['', Validators.required],
      cpf: [''],
      cnpj: [''],
      tipoCliente: ['', Validators.required],
      endereco: this.fb.array([])
    });
  }

  obterTipoCliente(): number {
    const value = this.registerForm.get('tipoCliente').value;
    if (value === undefined || value === null || value.toString().trim() === '') {
      return -1;
    }
    if(value === "1")
      this.registerForm.get('cnpj').setValue("");
    else if (value === "2") 
    this.registerForm.get('cpf').setValue("");
    
    return Number.parseInt(value.toString().trim());
  }

  criaLote(endereco: any): FormGroup {
    return this.fb.group({
      enderecoId: [endereco.enderecoId],
      logradouro: [endereco.logradouro, Validators.required],
      bairro: [endereco.bairro, Validators.required],
      cep: [endereco.cep, Validators.required],
      cidade: [endereco.cidade, Validators.required],
      tipoEndereco: [endereco.tipoEndereco, Validators.required]
    });
  }

  adicionarCliente() {
    this.endereco.push(this.criaLote({ enderecoId: 0 }));
  }

  removerCliente(id: number) {
    this.endereco.removeAt(id);
  }


  salvarCliente() {

    this.cliente = Object.assign({ id: this.cliente.clienteId, userId: sessionStorage.getItem('id')}, this.registerForm.value);
    if(this.cliente.tipoCliente == 1 && (this.cliente.cpf < 11 || !this.cliente.cpf)) {
      return this.toastr.error('Cliente não possui CPF cadastrado');
    }
    if(this.cliente.tipoCliente == 2 && (this.cliente.cnpj < 14 || !this.cliente.cnpj)) {
      return this.toastr.error('Cliente não possui CNPJ cadastrado');
    }
    this.clienteService.putCliente(this.cliente).subscribe(
      () => {
        this.toastr.success('Editado com Sucesso!');
      }, error => {
        this.toastr.error(`Erro ao Editar: ${error}`);
      }
    );
  }
}