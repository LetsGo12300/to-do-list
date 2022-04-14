import model from './model';
import DOM from './DOM';

const controller = (() => {
    const showProjects = () => {
        return model.getProjects();
    };

    const showToDoItems = () => {
        return model.getToDoItems();
    };

    const addItem = (event) => {
        let title = DOM.toDoForm.elements['title'].value;
        let description = DOM.toDoForm.elements['description'].value;
        let dueDate = DOM.toDoForm.elements['due-date'].value;
        let priority = DOM.toDoForm.elements['priority'].value;
        let project = DOM.toDoForm.elements['project'].value;
        
        event.preventDefault();
        model.addToDoItem(title, description, dueDate, priority, project);
    };

    const addProject = (event) => {
        let project = DOM.addProjectForm.elements['new-project'].value;

        event.preventDefault();
        model.addProject(project);
    };

    return {
      showProjects,
      showToDoItems,
      addProject,
      addItem
    };
})();

export default controller;