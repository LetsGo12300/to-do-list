import DOM from './DOM';
import controller from './controller';

function view() {

    loadModal();
    loadTab();
    loadContent('My Project');
}

const loadModal = function(){
    // When the user clicks the button, open the modal
    DOM.addToDo.addEventListener('click', () => {
        setDisplay.showModal();
        populateModal.addToDoForm();    
    });

    // When the user clicks on <span> (x), close the modal
    DOM.span.addEventListener('click', () => {
        setDisplay.hideModal();
    });

    // When the user clicks anywhere outside of the modal, close it
    document.addEventListener('click', (event) => {
        if (event.target == DOM.modal) {
            setDisplay.hideModal();
        };
    });
};

function loadTab(){
    // Show all current Projects
    const allProjects = controller.showProjects();

    allProjects.forEach(project => {
        updateView.renderProject(project);
    });

    DOM.addProject.addEventListener('click', setDisplay.showAddForm);
    DOM.svgClose.addEventListener('click', setDisplay.hideAddForm);
    DOM.svgCheck.addEventListener('click', controller.addProject);
    DOM.addProjectForm.addEventListener('submit', controller.addProject);
}

function loadContent(projectTitle){
    // Show all to do items
    updateView.renderProjectTitle(projectTitle);
    const toDoItems = controller.showToDoItems(projectTitle);
    
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
        DOM.modalParagraph.innerHTML = '';
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
        div.classList.add('todo-item', item.priority);
        div.setAttribute('data-title', item.title);
        div.setAttribute('data-project', item.project);

        const title = document.createElement('div');
        title.textContent = item.title;
        div.appendChild(title);

        const details = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.textContent = 'EDIT';
        editButton.classList.add('edit-btn');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.classList.add('delete-btn');

        details.classList.add('details');
        details.appendChild(editButton);
        details.appendChild(deleteButton);
        div.appendChild(details);
        
        DOM.content.appendChild(div);
    }

    function renderProject(project){
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        h3.textContent = project.project;
        h3.classList.add('project-title');
        li.appendChild(h3);
        DOM.project_titles.appendChild(li);
    }

    function renderOptions(){
        const allProjects = controller.showProjects();
        DOM.project = document.getElementById('project'); // options for project

        allProjects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.project;
            option.textContent = project.project;
            DOM.project.appendChild(option);
        });
    }

    function clearContent(){
        DOM.content.innerHTML = '';
    }

    function clearUnderline(){
        Array.from(document.getElementsByClassName('project-title')).forEach(project => {
            project.classList.remove('current-project');
        });
    }

    function renderProjectTitle(title){
        const div = document.createElement('div');
        div.classList.add('content-title');
        div.textContent = title;
        DOM.content.appendChild(div);
    }

    return {
        renderItem,
        renderProject,
        renderOptions,
        clearContent,
        clearUnderline,
        renderProjectTitle
    }
})();

const populateModal = (() => {
    function addToDoForm(){
        const form = document.createElement('form');
        form.id = 'todo-form';
        form.innerHTML = `
            <div>
                <p>
                    <label for="title">TITLE</label>
                </p>
                <input type="text" name="title" id="title" required>
            </div>

            <div>
                <p>
                    <label for="description">DESCRIPTION</label>
                </p>
                <textarea name="description" id="description" rows=6></textarea>
            </div>

            <div>
                <label for="due-date">Pick a due date:</label>
                <input type="date" name="due-date" id="due-date" required>
            </div>
            
            <div>
                <label for="priority">Select priority:</label>
                <input type="radio" id="low-priority" name="priority" value="low" required="required">
                <label for="low-priority">Low</label>
                <input type="radio" id="medium-priority" name="priority" value="medium">
                <label for="medium-priority">Medium</label>
                <input type="radio" id="high-priority" name="priority" value="high">
                <label for="high-priority">High</label>
            </div>

            <div>
                <label for="project">Select project:</label>
                <select name="project" id="project" required>
                </select>
            </div>
            

            <div class="btn">
                <button type="submit" id="submit-btn">Create To Do</button>
            </div>
        `;
        DOM.modalParagraph.appendChild(form);
        DOM.toDoForm = document.getElementById('todo-form');
        DOM.toDoForm.addEventListener('submit', controller.addItem);
        updateView.renderOptions();
    }

    function editToDoForm(item){
        const form = document.createElement('form');
        form.id = 'save-form';
        form.innerHTML = `
            <h3>
                <span id="edit-title">${item.title}</span>
                 <i>(editing...)</i>
            </h3>
            <br>

            <div>
                <p>
                    <label for="description"></label>
                </p>
                <textarea name="description" id="description" rows=6 value="${item.description}">${item.description}</textarea>
            </div>

            <div>
                <label for="due-date">Edit due date:</label>
                <input type="date" name="due-date" id="due-date" value=${item.dueDate} required>
            </div>
            
            <div>
                <label for="priority">Select priority:</label>
                <input type="radio" id="low-priority" name="priority" value="low" required="required">
                <label for="low-priority">Low</label>
                <input type="radio" id="medium-priority" name="priority" value="medium">
                <label for="medium-priority">Medium</label>
                <input type="radio" id="high-priority" name="priority" value="high">
                <label for="high-priority">High</label>
            </div>

            <div class="btn">
                <button type="submit" id="save-btn">Save To Do</button>
            </div>
        `;
        DOM.modalParagraph.appendChild(form);
        DOM.saveForm = document.getElementById('save-form');
        DOM.saveForm.addEventListener('submit', controller.editItem);

        document.querySelector(`#${item.priority}-priority`).checked = 'checked';
    }

    return {
        addToDoForm,
        editToDoForm
    }
})();

// event listeners
document.addEventListener('click', (event) => {
    if (event.target.className === 'edit-btn') {     // if EDIT button is clicked
        let item = controller.showItem(event.target.parentNode.parentNode.getAttribute('data-title'));
        setDisplay.showModal();
        populateModal.editToDoForm(item);
    } else if (event.target.className === 'project-title'){ // if Project name is clicked
        updateView.clearUnderline();
        updateView.clearContent();
        event.target.classList.add('current-project');
        loadContent(event.target.textContent);
    }
});

export default view;
export {setDisplay, updateView};