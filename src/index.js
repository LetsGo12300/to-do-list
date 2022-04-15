import "./styles.css";
import { format } from 'date-fns';
import model from './modules/model';
import view from './modules/view';

const dateNow = format(new Date(), 'MMMM dd, yyyy');

//model.addProject('May 2022');
//model.addProject('June 2022');

//window.localStorage.removeItem('projects');
view();