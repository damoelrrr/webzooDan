import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // 👈 Agregado FormBuilder y ReactiveFormsModule
import { Router } from '@angular/router'; // 👈 Corregido: Importado desde Angular, no desde Express
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AnimalService } from '../../services/animal-service';

@Component({
  selector: 'app-animal-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 👈 Agregado ReactiveFormsModule para que funcionen los formularios
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css',
})
export class AnimalComponent implements OnInit {
  animalList: any = [];
  
  animalsForm: FormGroup | any; // 👈 Corregido el tipado con operador de asignación definitiva
  constructor(
    private animalService: AnimalService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder // 👈 Ahora sí funcionará porque ya está importado arriba
  ) { }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: any) => {
      this.animalList = data;
      console.log(this.animalList);
    });
  }

  ngOnInit() {
    this.animalsForm = this.formBuilder.group({
      name: [''],
      age: [0],
      tipo: ['']
    });
    
    this.getAllAnimals();
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  newAnimalEntry() {
    this.animalService.newAnimal(this.animalsForm.value).subscribe(() => {
      this.router.navigate(['/inicio'])
      .then(() => this.newMessage('Registro exitoso'));
    });
  }
}
