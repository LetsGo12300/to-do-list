import model from './model';

const controller = (() => {
    const showProjects = () => {
        return model.getProjects();
    };

    const showToDoItems = () => {
        return model.getToDoItems();
    };

    return {
      showProjects,
      showToDoItems,
    };
})();

export default controller;