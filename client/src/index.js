// this is the entry point for the app
import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import './css/style.css';

const modal = new Modal();

// initialize the ideaForm
const ideaForm = new IdeaForm();
ideaForm.render();

// initialize the ideaList
const ideaList = new IdeaList();
ideaList.render();
