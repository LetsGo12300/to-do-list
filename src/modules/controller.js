import model from './model';
import DOM from './DOM';
import {setDisplay, updateView} from './view';

const controller = (() => {
    const showProjects = () => {
        return model.getProjects();
    };

    const showToDoItems = (projectTitle) => {
        return model.getToDoItems().filter(item => item.project === projectTitle);
    };

    const showItem = (title, project) => {
        return model.getToDoItems().filter(item => item.title === title && item.project === project)[0]
    };

    const showDueToday = (date) => {
        return model.getToDoItems().filter(item => item.dueDate === date);
    }

    const addItem = (event) => {
        let title = DOM.toDoForm.elements['title'].value;
        let description = DOM.toDoForm.elements['description'].value;
        let dueDate = DOM.toDoForm.elements['due-date'].value;
        let priority = DOM.toDoForm.elements['priority'].value;
        let project = DOM.toDoForm.elements['project'].value;

        // check if there is a duplicate title in the project
        if (showToDoItems(project).filter(item => item.title === title).length === 0){
            event.preventDefault();
            let newItem = model.addToDoItem(title, description, dueDate, priority, project);
            setDisplay.hideModal();
            DOM.toDoForm.reset();

            if (document.getElementsByClassName('content-title')[0].textContent === project) updateView.renderItem(newItem);
        } else {
            alert('Please choose a new project title ');
            event.preventDefault();
        }
    };

    const addProject = (event) => {
        let project = DOM.addProjectForm.elements['new-project'].value;

        if (showProjects().filter(currentProject => currentProject.project === project).length !== 0){
            alert('No duplicate projects allowed. Please rename project.');
        } else if (project === ''){
            alert('Please fill out the project field.');
        }   else {
            event.preventDefault();
            let newProject = model.addProject(project);
            setDisplay.hideAddForm();
            DOM.addProjectForm.reset();
            updateView.renderProject(newProject);
        }
    };

    const editItem = (event) => {
        let editTitle = document.getElementById('edit-title').textContent;
        let description = DOM.saveForm.elements['description'].value;
        let dueDate = DOM.saveForm.elements['due-date'].value;
        let priority = DOM.saveForm.elements['priority'].value;
        
        let editItem = {title: editTitle, description: description, dueDate: dueDate, priority: priority};

        event.preventDefault();
        setDisplay.hideModal();
        DOM.saveForm.reset();
        
        model.updateItem(editItem, findItemIndex(editTitle));
        // Update priority class:
        let updateDOM = document.querySelector(`[data-title='${editTitle}']`);
        updateDOM.className = `todo-item ${priority}`;  
    };
    
    function findItemIndex(title){
        const index = model.getToDoItems().findIndex(item => item.title === title);
        return index;
    }

    function deleteItem(itemToDelete){
        model.removeItem(itemToDelete);
        // remove to do item in DOM
        const element = document.querySelector(`[data-title='${itemToDelete.title}'][data-project='${itemToDelete.project}']`);
        element.remove();
    }

    return {
      showProjects,
      showToDoItems,
      showItem,
      showDueToday,
      addProject,
      addItem,
      editItem,
      deleteItem
    };
})();

export default controller;