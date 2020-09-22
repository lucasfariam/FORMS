import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task';
import { map } from 'rxjs/operators';


export interface State {
    todolist: Task[]
}  

// essa constante ela representa o estado e inicia com um obj declarado todolist vazia
const state: State = {
    todolist: []
}

export class Store {
    
    // behavior é uma variante, que requer um valor inicial e ele emite o valor atual quando evento ta escrito nele
    private subject = new BehaviorSubject<State>(state)
    private store = this.subject.asObservable() // ele fornece o comportamento atraves de uma observable

    get value() { // obter valor 
        return this.subject.value
    } 

    // metodo que mapea e retorna o todoList a coleção
    public getTodoList(): Observable<Task[]> {
      return this.store
        .pipe( 
            map(store => store.todolist) // no map vai retorna a lista todolista coleçao de task
        )  
    }

    set(name: string, state: any) { // metodo seta o estado ele atualiza
        this.subject.next({ // next seta um novo valor para o subject
            ...this.value, [name]: state
        }) 
    } 
}