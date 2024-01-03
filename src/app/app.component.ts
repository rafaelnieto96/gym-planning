import { Component } from '@angular/core';
import { ExerciseService } from './exercise.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    selectedDay: string = '';
    selectedExercise: any = '';

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

    closeExamplePopup(): void {
        const examplePopup = document.getElementById('examplePopup');
        if (examplePopup) {
            examplePopup.style.display = 'none';
        }
    }

    openExamplePopup(day: string): void {
        this.selectedDay = day;
        const examplePopup = document.getElementById('examplePopup');
        if (examplePopup) {
            examplePopup.style.display = 'block';
        }
    }

    createExercise(): void {
        console.log('event:', event);
        const exerciseData = {
            name: (document.getElementById('exerciseName') as HTMLInputElement).value,
            repetitions: parseInt((document.getElementById('exerciseRepetitions') as HTMLInputElement).value, 10),
            weight: parseFloat((document.getElementById('exerciseWeight') as HTMLInputElement).value),
            machine: (document.getElementById('exerciseMachine') as HTMLSelectElement).value === 'true',
            day: this.selectedDay
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

    openEditExercisePopup(exercise: any): void {
        this.selectedExercise = exercise;
        const examplePopup = document.getElementById('editExercisePopup');
        if (examplePopup) {
            examplePopup.style.display = 'block';
        }
    }

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


    closeEditExercisePopup(): void {
        const editPopup = document.getElementById('editExercisePopup');
        if (editPopup) {
            editPopup.style.display = 'none';
        }
    }

}
