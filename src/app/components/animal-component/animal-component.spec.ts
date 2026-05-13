import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalComponent } from './animal-component';
import { AnimalService } from '../../services/animal-service';
import { of } from 'rxjs';

describe('AnimalComponent', () => {
  let component: AnimalComponent;
  let fixture: ComponentFixture<AnimalComponent>;
  let mockAnimalService: any;

      beforeEach(async () => {
    // Creamos el objeto simulado utilizando la sintaxis de Vitest (vi.fn)
    mockAnimalService = {
      getAllAnimalsData: vi.fn().mockReturnValue(of([
        { nombre: 'Firulais', edad: 3, tipo: 'Perro' }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [AnimalComponent],
      providers: [
        { provide: AnimalService, useValue: mockAnimalService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load animals on init', () => {
    expect(component.animalList.length).toBe(1);
    expect(component.animalList[0].nombre).toBe('Firulais');
    expect(mockAnimalService.getAllAnimalsData).toHaveBeenCalled();
  });
});
