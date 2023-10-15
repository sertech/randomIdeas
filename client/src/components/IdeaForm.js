import IdeasApi from '../services/ideasApi';
import IdeaList from './IdeaList';
class IdeaForm {
    constructor() {
        this._formModal = document.querySelector('#form-modal');
        this._ideaList = new IdeaList();
    }

    addEventListeners() {
        this._form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();

        // in this._form.elements.text.value, text is the name of the element
        const idea = {
            text: this._form.elements.text.value,
            tag: this._form.elements.tag.value,
            username: this._form.elements.username.value,
        };

        console.log(idea);

        // add idea to server
        const newIdea = await IdeasApi.createIdea(idea);
        // add idea to list
        this._ideaList.addIdeaToList(newIdea.data.data);

        // clear fields
        this._form.elements.text.value = '';
        this._form.elements.tag.value = '';
        this._form.elements.username.value = '';

        // since the modal and the form are separate elements
        // to be able to close the modal from this component
        // we have to dispatch a custom event which is a method of the DOM
        // close modal is just its name can be anything
        document.dispatchEvent(new Event('closemodal'));
    }

    render() {
        this._formModal.innerHTML = `
        <form id="idea-form">
            <div class="form-control">
                <label for="idea-text">Enter a Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div class="form-control">
                <label for="idea-text">What's Your Idea?</label>
                <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">
                Submit
            </button>
        </form>
        `;

        // we have to use the querySelector here because after
        // this._formModal.innerHTML=`...` the #idea-form will exist
        // so we can select it and attach the event listener
        this._form = document.querySelector('#idea-form');
        this.addEventListeners();
    }
}

export default IdeaForm;
