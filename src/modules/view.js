import DOM from './DOM';
import controller from './controller';

export default function view() {

    loadModal();
    loadTab();
    loadContent();
}

const loadModal = function(){
    // When the user clicks the button, open the modal
    DOM.addToDo.addEventListener('click', () => {
        DOM.modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    DOM.span.addEventListener('click', () => {
        DOM.modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    document.addEventListener('click', (event) => {
        if (event.target == DOM.modal) {
            DOM.modal.style.display = "none";
        }
    });
};

function loadTab(){
    // Show all current Projects
    const allProjects = controller.showProjects();
    
    allProjects.forEach(project => {
        const h3 = document.createElement('h3');
        h3.textContent = project.project;
        h3.classList.add('project-title');
        DOM.project_titles.appendChild(h3);
    });

    DOM.addProject.addEventListener('click', showAddForm);
    DOM.toDoForm.addEventListener('submit', controller.addItem);
    DOM.svgClose.addEventListener('click', hideAddForm);
    DOM.svgCheck.addEventListener('click', controller.addProject);
    DOM.addProjectForm.addEventListener('submit', controller.addProject);
}

function loadContent(){
    // Show all to do items
    const toDoItems = controller.showToDoItems();
    
    toDoItems.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item.title;
        div.classList.add('todo-item');
        DOM.content.appendChild(div);
    });
}

function showAddForm(){
    DOM.addForm.style.display = 'flex';
}

function hideAddForm(){
    DOM.addForm.style.display = 'none';
}

