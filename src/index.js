import "./styles.css";
import { format } from 'date-fns';
import model from './modules/model'

const dateNow = format(new Date(), 'MMMM dd, yyyy');

//model.addToDoItem('Elections','PH 2022 Elections', dateNow, 'high', 'default');
//model.addToDoItem('HAHAHA','SAMPLE', dateNow, 'low', 'project 2');
//model.addToDoItem('forever young','asdfghjkl;', dateNow, 'medium', 'project123');
//addToDoItem(title, description, dueDate, priority, project)

//model.addProject('May 2022');
//model.addProject('June 2022');

//window.localStorage.removeItem('projects');
model.showStorage();