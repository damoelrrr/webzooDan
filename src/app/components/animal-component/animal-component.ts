import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- ESTA ES LA LÍNEA QUE FALTA
import { AnimalService } from '../../services/animal-service';

@Component({
  selector: 'app-animal-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css',
})
export class AnimalComponent {
  animalList: any = [];

  constructor(private animalService: AnimalService) { }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
      console.log(this.animalList)
    });
  }
  ngOnInit() {
    this.getAllAnimals();
  }

}
