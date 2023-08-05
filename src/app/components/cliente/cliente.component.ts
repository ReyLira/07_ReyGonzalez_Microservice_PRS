import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit  {

  listcliente : Cliente [] = [];
  formCliente: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.consultarcliente();
    this.formCliente =  new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      dni: new FormControl(''),
      phonenumber: new FormControl(''),
      address: new FormControl(''),
      department: new FormControl(''),
      active : new FormControl('A')
    });
  }


  consultarcliente(){
    this.clienteService.consultarCliente().subscribe(resp => {
     if (resp){
      this.listcliente = resp;
     }
    })
  }

  save(){
    this.formCliente.controls['active'].setValue('A');
    this.clienteService.saveCliente(this.formCliente.value).subscribe(resp=>{
      if(resp){
        this.consultarcliente();
        this.formCliente.reset();
      }
    });
  }

  update(){
    this.clienteService.updateCliente(this.formCliente.value).subscribe(resp=>{
      if(resp){
        this.consultarcliente();
        this.formCliente.reset();
      }
    });
  }

  delete(id:any){
    this.clienteService.deleteCliente(id).subscribe(resp=>{
      if(resp){
        this.consultarcliente();
      }
    });
  }

  newCard(){
    this.isUpdate = false;
    this.formCliente.reset();
  }

  selectItem(cliente: any){
    this.isUpdate = true;
    this.formCliente.controls['id'].setValue(cliente.id);
    this.formCliente.controls['name'].setValue(cliente.name);
    this.formCliente.controls['surname'].setValue(cliente.surname);
    this.formCliente.controls['dni'].setValue(cliente.dni);
    this.formCliente.controls['phonenumber'].setValue(cliente.phonenumber);
    this.formCliente.controls['address'].setValue(cliente.address);
    this.formCliente.controls['department'].setValue(cliente.department);
  }
}
