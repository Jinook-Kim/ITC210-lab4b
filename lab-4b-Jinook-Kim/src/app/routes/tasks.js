const express = require(`express`)
const router = express.Router()

const Task = require(`../models/Task`)

/**
 * GET: Returns one task with the task's id specified in the path
 */
router.get(`/:id`, async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
		if (!task) res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
		else res.status(200).send(task)
	} catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
})

// TODO: Write 4 more handlers for create, read, update, and delete

// POST: Create a new task
router.post('/', async (req, res) => {
    try {
        const task = new Task({
            UserId: req.user.Id,
            Text: req.body.text,
            Done: req.body.done,
            Date: req.body.date
        });
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET: Retrieve all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ UserId: req.user.Id });
        res.send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// PUT: Update a task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// DELETE: Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.id);
		if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router