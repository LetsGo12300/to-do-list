import "./styles.css";
import { format } from 'date-fns';
import view from './modules/view';

const dateNow = format(new Date(), 'MMMM dd, yyyy');

//window.localStorage.removeItem('projects');
//window.localStorage.removeItem('items');
view();