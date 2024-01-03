import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ExerciseService } from '../exercise.service';

@Component({
    selector: 'app-weekly-calendar',
    templateUrl: './weekly-calendar.component.html',
    styleUrls: ['./weekly-calendar.component.css'],
})
export class WeeklyCalendarComponent {

    constructor(private exerciseService: ExerciseService) { }

    days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    @Input() exercises: any[] = [];

    @Output() squareClicked: EventEmitter<any> = new EventEmitter();

    openPopupOnClick(day: string): void {
        this.squareClicked.emit(day);
    }

    deleteAllExercises(): void {
        this.exercises = [];
        this.exerciseService.deleteAllExercises().subscribe(
            () => {
                console.log('All exercises deleted successfully.');
            },
            (error) => {
                console.error('Error deleting exercises:', error);
            }
        );
    }
    
}
