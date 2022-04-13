import DOM from './DOM';
import controller from './controller';

export default function view() {

    loadModal();
    loadTab();
    //DOM.addProject.addEventListener('click', loadTab);


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
    const allProjects = controller.showProjects();

    allProjects.forEach(project => {
        const h3 = document.createElement('h3');
        h3.textContent = project.project;
        h3.classList.add('project-title');
        DOM.project_titles.appendChild(h3);
    });
}