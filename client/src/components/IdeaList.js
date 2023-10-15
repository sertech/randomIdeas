import IdeasApi from '../services/ideasApi';
class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list');
        this._ideas = [];
        this.getIdeas();
        this._validTags = new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');
    }

    addEventListeners() {
        // we use delegation, where we put the click event in the entire list
        // but we target the icon
        this._ideaListEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation(); // event stays in the x icon not bubble up
                const ideaId = e.target.parentElement.parentElement.dataset.id; // the actual card
                console.log(ideaId);
                this.deleteIdea(ideaId);
            }
        });
    }

    // is async because axios returns a promise
    async getIdeas() {
        try {
            const res = await IdeasApi.getIdeas();
            // here the second data is the name given in the backend
            this._ideas = res.data.data;
            console.log(this._ideas);
            this.render(); // we render here to update the DOM
        } catch (error) {
            console.log(error);
        }
    }

    async deleteIdea(ideaId) {
        try {
            // delete idea from server
            const res = await IdeasApi.deleteIdea(ideaId);

            // delete it from the DOM
            this._ideas.filter((idea) => {
                idea._id !== ideaId;
            });
            this.getIdeas();
        } catch (error) {
            alert('you can not delete this resource');
        }
    }

    addIdeaToList(idea) {
        this._ideas.push(idea);
        this.render();
    }

    getTagClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';
        if (this._validTags.has(tag)) {
            tagClass = `tag-${tag}`;
        } else {
            tagClass = '';
        }
        return tagClass;
    }

    render() {
        this._ideaListEl.innerHTML = this._ideas
            .map((idea) => {
                const tagClass = this.getTagClass(idea.tag);
                const deleteBtn =
                    idea.username === localStorage.getItem('username')
                        ? `<button class="delete"><i class="fas fa-times"></i></button>`
                        : '';
                return `
                <div class="card" data-id="${idea._id}">
                    ${deleteBtn}
                    <h3>
                        ${idea.text}
                    </h3>
                    <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
                    <p>
                        Posted on <span class="date">${idea.date}</span> by
                        <span class="author">${idea.username}</span>
                    </p>
                </div>
            `;
            })
            .join('');

        // addListeners is here because the element inner HTML will exists after this point
        this.addEventListeners();
    }
}

export default IdeaList;
