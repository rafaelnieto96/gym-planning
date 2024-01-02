import { Component } from '@angular/core';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  exerciseDetails: any = null;
  exerciseToUpdate = {
    id: '',
    name: '',
    weight: '',
    repetitions: '',
    machine: ''
  };

  constructor(private exerciseService: ExerciseService) {
    this.getExercises();
  }

  // Function to close the modal
  closeExamplePopup(): void {
    const examplePopup = document.getElementById('examplePopup');
    if (examplePopup) {
      examplePopup.style.display = 'none';
    }
  }

  // Function to open the modal
  openExamplePopup(): void {
    const examplePopup = document.getElementById('examplePopup');
    if (examplePopup) {
      examplePopup.style.display = 'block';
    }
  }

  // Function triggered on square click
  openPopupOnClick(): void {
    this.openExamplePopup();
  }

  // Function to handle form submission (creating an exercise)
  createExercise(event: Event): void {
    event.preventDefault();

    const exerciseData = {
      name: (document.getElementById('exerciseName') as HTMLInputElement).value,
      repetitions: parseInt((document.getElementById('exerciseRepetitions') as HTMLInputElement).value, 10),
      weight: parseFloat((document.getElementById('exerciseWeight') as HTMLInputElement).value),
      machine: (document.getElementById('exerciseMachine') as HTMLSelectElement).value === 'true'
    };

    this.exerciseService.postExercise(exerciseData).subscribe(
      (resp) => {
        console.log('Exercise created:', resp);
        this.getExercises(); // Update the exercise list after a successful creation
        this.closeExamplePopup(); // Close the modal after creating the exercise
      },
      (err) => {
        console.error('Error creating exercise:', err);
      }
    );
  }

  // Function to retrieve all exercises
  getExercises(): void {
    this.exerciseService.getExercises().subscribe(
      (resp) => {
        console.log('Exercises:', resp);
        this.exerciseDetails = resp;
      },
      (err) => {
        console.error('Error fetching exercises:', err);
      }
    );
  }

  // Function to delete an exercise
  deleteExercise(exercise: any): void {
    this.exerciseService.deleteExercise(exercise.id).subscribe(
      () => {
        console.log('Exercise deleted');
        this.getExercises(); // Refresh the exercise list after deletion
      },
      (err) => {
        console.error('Error deleting exercise:', err);
      }
    );
  }

  edit(exercise: any): void {
    this.exerciseToUpdate = exercise;
  }

  updateExercise(): void {
    this.exerciseService.updateExercise(this.exerciseToUpdate.id, this.exerciseToUpdate).subscribe(
      (resp) => {
        console.log('Exercise updated:', resp);
      },
      (err) => {
        console.error('Error updating exercise:', err);
      }
    );
  }




}
