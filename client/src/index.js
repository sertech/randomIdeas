// this is the entry point for the app
import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import './css/style.css';

// we just instantiate the modal without a variable
new Modal();

// initialize the ideaForm
const ideaForm = new IdeaForm();
ideaForm.render();

// just initialize the ideaList without a variable
new IdeaList();
