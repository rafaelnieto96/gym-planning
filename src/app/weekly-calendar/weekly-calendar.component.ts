import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-weekly-calendar',
    templateUrl: './weekly-calendar.component.html',
    styleUrls: ['./weekly-calendar.component.css'],
})
export class WeeklyCalendarComponent {
    days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    @Output() squareClicked: EventEmitter<any> = new EventEmitter();

    openPopupOnClick() {
        this.squareClicked.emit();
    }
}
