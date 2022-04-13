const myLocalStorage = (() => {
    function updateItems(storageItems){
        localStorage.setItem('items', JSON.stringify(storageItems));
    }

    function updateProjects(storageItems){
        localStorage.setItem('projects', JSON.stringify(storageItems));
    }

    return {
        updateItems,
        updateProjects,
    }
})();

const model = (() => {
    let storageItems = (JSON.parse(localStorage.getItem('items')) === null ? [] : JSON.parse(localStorage.getItem('items')));
    let storageProjects = (JSON.parse(localStorage.getItem('projects')) === null ? [{'project': 'My Project'}] : JSON.parse(localStorage.getItem('projects')));

    class ToDoItem {
        constructor(title, description, dueDate, priority, project) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.project = project;
        }
    }

    class Project {
        constructor(project) {
            this.project = project
        }
    }

    function addToDoItem(title, description, dueDate, priority, project){
        const addedItem = new ToDoItem(title, description, dueDate, priority, project);
        storageItems.push(addedItem);
        myLocalStorage.updateItems(storageItems);
    }

    function addProject(project){
        const addedProject = new Project(project);
        storageProjects.push(addedProject);
        myLocalStorage.updateProjects(storageProjects);
    }


    function getToDoItems(){
        //const retrievedData = localStorage.getItem('items');
        //let updatedList = JSON.parse(retrievedData);
        return storageItems;
        //console.log(storageItems);
        //console.log(storageProjects);
    }

    function getProjects(){
        //const retrievedData = localStorage.getItem('items');
        //let updatedList = JSON.parse(retrievedData);
        return storageProjects;
        //console.log(storageItems);
        //console.log(storageProjects);
    }

    return {
        addToDoItem,
        addProject,
        getToDoItems,
        getProjects,
    }

})();

export default model;