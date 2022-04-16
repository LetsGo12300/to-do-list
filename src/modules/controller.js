import model from './model';
import DOM from './DOM';
import {setDisplay, updateView, loadTab} from './view';

const controller = (() => {
    const showProjects = () => {
        return model.getProjects();
    };

    const showToDoItems = (projectTitle) => {
        return model.getToDoItems().filter(item => item.project === projectTitle);
        
    };

    const showItem = (title) => {
        return model.getToDoItems().filter(item => item.title === title)[0]
    };

    const addItem = (event) => {
        let title = DOM.toDoForm.elements['title'].value;
        let description = DOM.toDoForm.elements['description'].value;
        let dueDate = DOM.toDoForm.elements['due-date'].value;
        let priority = DOM.toDoForm.elements['priority'].value;
        let project = DOM.toDoForm.elements['project'].value;
        
        event.preventDefault();
        let newItem = model.addToDoItem(title, description, dueDate, priority, project);
        setDisplay.hideModal();
        DOM.toDoForm.reset();
        
        if (document.getElementsByClassName('content-title')[0].textContent === project) updateView.renderItem(newItem);
    };

    const addProject = (event) => {
        let project = DOM.addProjectForm.elements['new-project'].value;

        event.preventDefault();
        let newProject = model.addProject(project);
        setDisplay.hideAddForm();
        DOM.addProjectForm.reset();
        updateView.renderProject(newProject);
    };

    return {
      showProjects,
      showToDoItems,
      showItem,
      addProject,
      addItem
    };
})();

export default controller;