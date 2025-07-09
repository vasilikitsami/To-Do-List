import React, {useEffect, useState} from 'react'
import { ToDoForm } from "./ToDoForm";
import {v4 as uuidv4} from 'uuid';
import { Todo } from './ToDo';
import { EditToDoForm } from './EditTodoForm';
import { SortOptions } from './SortOptions';
import { SearchBar } from './SearchBar';
import { CheckBox } from './CheckBox';
import {sortTodosByMethod} from '../utils';
import { useLocalStorage } from 'react-use';

export const ToDoWrapper = () => {

    const [todos, setTodos] = useLocalStorage('todos',[])

    const [sortMethod, setSortMethod] = useLocalStorage('sortMethod', 'default')

    const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '') //save what is written in search bar

    const [showOnlyIncomplete, setShowOnlyIncomplete] = useLocalStorage('showOnlyIncompletge', false) //if true -> only incompleted tasks

    //Create new task and add in todos array
    const addTodo = (todo) => {
        const newTodo = {
        id: uuidv4(), task: todo,
        completed: false, 
        isEditing: false, 
        createdAt: new Date().toISOString() //save date of addition
        }
        setTodos ([...todos,newTodo ])
    }

    //Update completion of task
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id 
            ?{...todo, completed: !todo.completed} : //if false->true, if true->false
            todo));
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    //Change isEditing to true: edit form appears
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id 
            ? {...todo, isEditing: !todo.isEditing} : todo))
    }  
    
    //Update task with edited text
    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ?
             {...todo, task, isEditing: false} : todo))
    }

    //Sorting Options
    const sortedTodos = sortTodosByMethod(todos, sortMethod);

    const filteredTodos = sortedTodos.filter(todo =>{
       const matchesSearch = searchTerm.trim() === '' || todo.task.toLowerCase().includes(searchTerm.toLowerCase())
       const matchesCompletion = !showOnlyIncomplete || (!todo.completed && !todo.checked)
       return matchesSearch && matchesCompletion
    })
  

    return (
        <div className='ToDoWrapper'>
            <h1>Get Things Done!</h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            <CheckBox setShowOnlyIncomplete={setShowOnlyIncomplete} />
            <SortOptions sortMethod={sortMethod} setSortMethod={setSortMethod} />
            <ToDoForm  addTodo={addTodo} />
            {searchTerm.trim() !== '' && filteredTodos.length === 0 ?(
                <p style={{color:'#fff', marginTop:'1rem'}}>No matching tasks found.</p>
            ) : ( 
                filteredTodos.map((todo) => (
                todo.isEditing ? (
                    <EditToDoForm  editTodo={editTask} task={todo} key={todo.id}/>
                ) : (
                <Todo task={todo} key={todo.id} 
                toggleComplete={toggleComplete} 
                deleteTodo={deleteTodo} 
                editTodo={editTodo}/>
                )
            ))
                
            ) }
        
        </div>
    )

}