import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public postExercise(exercise: any) {
        return this.http.post(this.apiUrl, exercise);
    }

    public getExercises() {
        return this.http.get(this.apiUrl);
    }

    public deleteExercise(id: any) {
        return this.http.delete(this.apiUrl + '/' + id);
    }

    public updateExercise(id: any, exercise: any) {
        return this.http.put(this.apiUrl + '/' + id, exercise);
    }

    public deleteAllExercises() {
        return this.http.delete(this.apiUrl + '/deleteAll');
    }
}

