import "./styles.css";
import { format } from 'date-fns';
import model from './modules/model';
import view from './modules/view';

const dateNow = format(new Date(), 'MMMM dd, yyyy');

//window.localStorage.removeItem('projects');
//window.localStorage.removeItem('items');
view();