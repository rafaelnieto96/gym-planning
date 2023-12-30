import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) {}

  closeExamplePopup() {
    const examplePopup = document.getElementById('examplePopup');
    if (examplePopup) {
      examplePopup.style.display = 'none';
    }
  }

  openExamplePopup() {
    const examplePopup = document.getElementById('examplePopup');
    if (examplePopup) {
      examplePopup.style.display = 'block';
    }
  }

  openPopupOnClick() {
    this.openExamplePopup();
  }
  
  createExercise(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior

    const exerciseData = {
      name: (document.getElementById('exerciseName') as HTMLInputElement).value,
      repetitions: parseInt((document.getElementById('exerciseRepetitions') as HTMLInputElement).value, 10),
      weight: parseFloat((document.getElementById('exerciseWeight') as HTMLInputElement).value),
      machine: (document.getElementById('exerciseMachine') as HTMLSelectElement).value === 'true'
    };

    this.http.post<any>('http://localhost:8080/api/exercises', exerciseData)
      .subscribe((response) => {
        console.log('Exercise created:', response);
        this.closeExamplePopup(); // Close modal on successful submission
      }, (error) => {
        console.error('Error creating exercise:', error);
        // Handle error, display error message, etc.
      });
  }
  
}
