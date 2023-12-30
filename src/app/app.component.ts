import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
}
