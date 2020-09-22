import { Store } from './todo.store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task';
import { tap } from 'rxjs/operators';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient, private store: Store) { }

  // metodo que me retorna o simulado da URL teste do backend
  getToDoList$: Observable<Task[]> = this.http
    .get<Task[]>('http://localhost:3000/todolist')
      .pipe( // toda vez que chamar a observable, vou receber o valor e ao msm tempo setar o valor na "store"
        tap(next => this.store.set('todolist', next)))

  
}

  // getToDoList(): Observable<Task[]> {
  //   return this.http
  //   .get<Task[]>('http://localhost:3000/todolist') 
  // }