import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-weekly-calendar',
    templateUrl: './weekly-calendar.component.html',
    styleUrls: ['./weekly-calendar.component.css'],
})
export class WeeklyCalendarComponent {

    days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    @Input() exercises: any[] = [];

    @Output() squareClicked: EventEmitter<any> = new EventEmitter();

    openPopupOnClick(day: string): void {
        this.squareClicked.emit(day);
      }
    
}
