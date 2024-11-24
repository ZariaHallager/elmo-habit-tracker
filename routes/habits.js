const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');

// CREATE - Add a new habit
router.post('/', async (req, res) => {
    try {
        await Habit.create({ name: req.body.name });
        res.redirect('/habits');
    } catch (error) {
        console.error(error);
        res.redirect('/habits');
    }
});

// READ - Show all habits
router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find({});
        res.render('index', { habits });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// UPDATE - Mark a day as completed, toggle pinned, or like habit
router.put('/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        const { action, dayIndex } = req.body;

        if (action === 'toggleDay') {
            habit.days[dayIndex] = !habit.days[dayIndex];
        } else if (action === 'togglePin') {
            habit.isPinned = !habit.isPinned;
        } else if (action === 'like') {
            habit.likes += 1;
        }

        await habit.save();
        res.redirect('/habits');
    } catch (error) {
        console.error(error);
        res.redirect('/habits');
    }
});

// DELETE - Remove a habit
router.delete('/:id', async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.redirect('/habits');
    } catch (error) {
        console.error(error);
        res.redirect('/habits');
    }
});

module.exports = router;
