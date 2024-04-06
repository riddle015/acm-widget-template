import { Router } from 'express';
import db from './db.js';

const router = Router();

router.post('/isEven', (req, res) => {
    const num = req.body.num;

    console.log(`Evaluating if ${num} is even or odd`);

    res.send({ isEven: num % 2 === 0 });
});

router.get('/attendees', (req, res) => {
    db.all(`SELECT rowid AS id, * FROM attendees`, (err, rows) => {
        res.send(rows);
    });
});

router.get('/attendees/:id', (req, res) => {
    db.get(
        `SELECT rowid AS id, * FROM attendees WHERE rowid=$id`,
        { $id: req.params.id },
        (err, row) => {
            res.send(row);
        }
    );
});

router.post('/attendees', (req, res) => {
    const { firstname, lastname, linkedin, role} = req.body;
    console.log(req.body.firstname)
    console.log(`${firstname} ${lastname}`)
    const stmt = db.prepare('INSERT INTO attendees VALUES (?, ?, ?, ?)');
    try {
        stmt.run([firstname, lastname, linkedin, role]);
        stmt.finalize();
        res.status(201).json({
            firstname,
            lastname,
            linkedin,
            role
        });
    } catch (error) {
        res.status(500).send();
    }

})

export default router;
