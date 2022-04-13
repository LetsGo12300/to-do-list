import model from './model';
import view from './view';

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