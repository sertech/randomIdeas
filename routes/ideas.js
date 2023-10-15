const express = require('express');

// this to use different files in separate folders
// also instead of app.get we have to use router.get
// also the routes change from /api/ideas to /
// the routes here start from / the will connect to /api/ideas
const router = express.Router();

// bring the model - convention start with capital letter
const Idea = require('../models/Idea');

// get all ideas - mongoose is asynchronous, returns a promise
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ success: true, data: ideas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'something went wrong' });
    }
});

// get 1 idea with query param - req.params.query_param_name (:id)
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ success: true, data: idea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'something went wrong' });
    }
});

// add an idea with POST
router.post('/', async (req, res) => {
    // instantiate a new idea using the model
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    });

    console.log(idea);

    try {
        const savedIdea = await idea.save();
        res.json({ success: true, data: savedIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'something went wrong' });
    }
});

// update idea
router.put('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        // match the usernames
        if (idea.username === req.body.username) {
            const updatedIdea = await Idea.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        text: req.body.text,
                        tag: req.body.tag,
                    },
                },
                { new: true }
            );
            return res.json({ success: true, data: updatedIdea });
        }

        // username do not math
        res.status(403).json({
            success: false,
            error: 'you are not authorized to update this resource',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'something went wrong' });
    }
});

// delete an idea
router.delete('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        // match the usernames
        if (idea.username === req.body.username) {
            await Idea.findByIdAndDelete(req.params.id);
            return res.json({ success: true, data: {} });
        }

        // usernames do not match
        res.status(403).json({
            success: false,
            error: 'you are not authorized to delete this resource',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'something went wrong' });
    }
});

// always export the router
module.exports = router;

//  '/api/ideas' this is / at this point
