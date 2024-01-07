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
            series: parseInt((document.getElementById('exerciseSeries') as HTMLInputElement).value, 10),
            repetitions: parseInt((document.getElementById('exerciseRepetitions') as HTMLInputElement).value, 10),
            weight: parseFloat((document.getElementById('exerciseWeight') as HTMLInputElement).value),
            day: this.selectedDay
        };

        this.exerciseService.postExercise(exerciseData).subscribe(
            (resp) => {
                console.log('Exercise created:', resp);
                this.getExercises();
                this.closeExamplePopup();
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

    updateExercise(): void {
        this.exerciseService.updateExercise(this.selectedExercise.id, this.selectedExercise).subscribe(
            (resp) => {
                console.log('Exercise updated:', resp);
                this.closeEditExercisePopup();
            },
            (err) => {
                console.error('Error updating exercise:', err);
            }
        );
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

    closeEditExercisePopup(): void {
        const editPopup = document.getElementById('editExercisePopup');
        if (editPopup) {
            editPopup.style.display = 'none';
        }
    }

}
