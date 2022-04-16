const DOM = {
    container: document.querySelector('.container'),
    header: document.querySelector('.header'),
    header_title: document.querySelector('.title'),
    tab: document.querySelector('.tab'),
    content: document.getElementById('content'),
    footer: document.querySelector('.footer'),
    addProject: document.getElementById('add-project'),
    addToDo: document.getElementById('add-todo'),
    modal: document.getElementById('todo-modal'),
    modalParagraph: document.getElementById('modal-p'),
    span: document.getElementsByClassName("close")[0],
    project_titles: document.getElementById('project-titles'), // ul of project titles
    project_title: document.getElementsByClassName('project-title'), // all project titles
    addForm: document.getElementById('add-form'),
    addProjectForm: document.getElementById('add-project-form'),
    svgClose: document.getElementById('svg-close'),
    svgCheck: document.getElementById('svg-check')
};

export default DOM;