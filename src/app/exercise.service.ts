import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    private apiUrl = 'http://localhost:8080/api/exercises';

    constructor(private http: HttpClient) { }

    public postExercise(exercise: any) {
        return this.http.post(this.apiUrl, exercise);
    }

    public getExercises() {
        return this.http.get(this.apiUrl);
    }

    public deleteExercise(id: any) {
        return this.http.delete(this.apiUrl + '/?id=' + id);
    }

    public updateExercise(id: any, exercise: any) {
        return this.http.put(this.apiUrl + '/?id=' + id, exercise);
    }

    public deleteAllExercises() {
        return this.http.delete(this.apiUrl + '/deleteAll');
    }
}

