import DOM from './DOM';
import controller from './controller';

function view() {

    loadModal();
    loadTab();
    loadContent();
}

const loadModal = function(){
    // When the user clicks the button, open the modal
    DOM.addToDo.addEventListener('click', setDisplay.showModal);

    // When the user clicks on <span> (x), close the modal
    DOM.span.addEventListener('click', setDisplay.hideModal);

    // When the user clicks anywhere outside of the modal, close it
    document.addEventListener('click', (event) => {
        if (event.target == DOM.modal) setDisplay.hideModal();
    });
};

function loadTab(){
    // Show all current Projects
    const allProjects = controller.showProjects();
    
    allProjects.forEach(project => {
        updateView.renderProject(project);
    });

    DOM.addProject.addEventListener('click', setDisplay.showAddForm);
    DOM.toDoForm.addEventListener('submit', controller.addItem);
    DOM.svgClose.addEventListener('click', setDisplay.hideAddForm);
    DOM.svgCheck.addEventListener('click', controller.addProject);
    DOM.addProjectForm.addEventListener('submit', controller.addProject);
}

function loadContent(){
    // Show all to do items
    const toDoItems = controller.showToDoItems();
    
    toDoItems.forEach(item => {
        updateView.renderItem(item);
    });
}


const setDisplay = ( () => {
    function showAddForm(){
        DOM.addForm.style.display = 'flex';
    }
    
    function hideAddForm(){
        DOM.addForm.style.display = 'none';
    }
    
    function showModal(){
        DOM.modal.style.display = "block";
    }
    
    function hideModal(){
        DOM.modal.style.display = "none";
    }

    return {
        showAddForm,
        hideAddForm,
        showModal,
        hideModal
    }
})();

const updateView = ( () => {
    function renderItem(item){
        const div = document.createElement('div');
        div.textContent = item.title;
        div.classList.add('todo-item');
        DOM.content.appendChild(div);
    }

    function renderProject(project){
        const h3 = document.createElement('h3');
        h3.textContent = project.project;
        h3.classList.add('project-title');
        DOM.project_titles.appendChild(h3);
    }

    return {
        renderItem,
        renderProject
    }
})();

export default view;
export {setDisplay, updateView};