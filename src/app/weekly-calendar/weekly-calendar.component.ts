import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ExerciseService } from '../exercise.service';

@Component({
    selector: 'app-weekly-calendar',
    templateUrl: './weekly-calendar.component.html',
    styleUrls: ['./weekly-calendar.component.css'],
})
export class WeeklyCalendarComponent {

    constructor(private exerciseService: ExerciseService) { }
    selectedExercise: any = null;

    days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    @Input() exercises: any[] = [];

    @Output() squareClicked: EventEmitter<any> = new EventEmitter();
    @Output() exerciseClicked: EventEmitter<any> = new EventEmitter();

    handleSquareClick(event: MouseEvent, day: string) {
        if ((event.target as HTMLElement).classList.contains('square')) {
            this.openPopupOnClick(day);
        }
    }

    openPopupOnClick(day: string): void {
        this.squareClicked.emit(day);
    }

    openEditExercisePopup(exercise: any): void {
        this.exerciseClicked.emit(exercise);
    }

    deleteAllExercises(): void {
        this.exerciseService.deleteAllExercises().subscribe(
            () => {
                console.log('All exercises deleted successfully.');
            },
            (error) => {
                console.error('Error deleting exercises:', error);
            }
        );
        window.location.reload();
    }

    toggleExerciseButtons(exercise: any) {
        exercise.showButtons = !exercise.showButtons;

        this.exercises.forEach((ex: any) => {
            if (ex !== exercise) {
                ex.showButtons = false;
            }
        });
    }

    deleteExercise(id: any): void {
        this.exerciseService.deleteExercise(id).subscribe(
            () => {
                console.log('Exercise deleted');

            },
            (err) => {
                console.error('Error deleting exercise:', err);

            }
        );
        window.location.reload();
    }

}
