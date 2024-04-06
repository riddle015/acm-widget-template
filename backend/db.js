import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':memory:');

// Default Attendees Table:
// id: number/INTEGER
// firstname: string/TEXT
// lastname: string/TEXT
// linkedin: string/TEXT
// role: string/TEXT

db.serialize(() => {
    db.run(
        'CREATE TABLE IF NOT EXISTS attendees ([firstname] TEXT, [lastname] TEXT, [linkedin] TEXT, [role] TEXT)'
    );
    const stmt = db.prepare('INSERT INTO attendees VALUES (?, ?, ?, ?)');

    let attendees = [
        [
            'julian',
            'edwards',
            'https://www.linkedin.com/in/julian-edwards/',
            'full-stack web developer',
        ],
    ];
    for (let attendee of attendees) {
        stmt.run(attendee);
    }

    stmt.finalize();
});

db.run(
    "INSERT INTO attendees VALUES ('john', 'doe', 'https://www.linkedin.com/in/john-doe', 'frontend developer')"
);

db.serialize(() => {
    db.each('SELECT rowid AS id, * FROM attendees', (err, row) => {
        console.log('Users in database:');
        console.log(
            `${row.id}: ${row.firstname}, ${row.lastname}, ${row.linkedin}, ${row.role}`
        );
    });
});

export default db;
