import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { ClientService } from 'src/app/services/client.service';
import { ViaCepService } from 'src/app/services/viacep.service';
import { ClientModel } from '../../model/client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  clientModelObj: ClientModel = new ClientModel();
  clientsData!: any;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private cepService: ViaCepService,
    private router: Router
  ) {


    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const user = localStorage.getItem('token');
        if (!user) {
          this.router.navigate(['login']);
        }
      }
    });
  }

  ngOnInit(): void {


    (this.formValue = this.formBuilder.group({
      name: [''],
      cpf: ['', Validators.required],
      adress: ['', Validators.required],
      kinship: [''],
      created_at: [''],
      // updated_at: [''],

    }));

    this.getAllClients();
  }



  getAllClients() {
    this.clientService.getAllClients().subscribe({
      next: (res) => {
        this.clientsData = res;
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }

  createClient() {
    this.clientModelObj.name = this.formValue.value.name;
    this.clientModelObj.cpf = this.formValue.value.cpf;
    this.clientModelObj.adress = this.formValue.value.adress;
    this.clientModelObj.kinship = this.formValue.value.kinship;

    if (this.formValue.valid) {
      this.clientService.createClient(this.clientModelObj).subscribe({
        next: (res) => {
          alert('client created');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          localStorage.setItem('token', res.token);
          this.getAllClients();
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.formValue);
      alert('Your form ins invalid');
    }


  }

  deleteClient(row: any) {
    this.clientService.deleteClient(row.id).subscribe((res) => {
      alert('client Deleted');
      this.getAllClients();
    });
  }

  edit(row: any) {
    this.clientModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['cpf'].setValue(row.cpf);
    this.formValue.controls['adress'].setValue(row.adress);
    this.formValue.controls['kinship'].setValue(row.kinship);
  }

  updateClient() {
    this.clientModelObj.name = this.formValue.value.name;
    this.clientModelObj.cpf = this.formValue.value.cpf;
    this.clientModelObj.adress = this.formValue.value.adress;
    this.clientModelObj.kinship = this.formValue.value.kinship;
    this.clientModelObj.created_at = this.formValue.value.created_at;
    this.clientService
      .updateClient(this.formValue.value, this.clientModelObj.id as string)
      .subscribe({
        next: (res) => {
          alert('Client updated');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          localStorage.setItem('token', res.token);
          this.getAllClients();
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
  }

}



