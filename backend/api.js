import express from 'express';
import config from '../config.js';

// DO NOT CHANGE THIS FILE

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS setup
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,PATCH,OPTIONS,DELETE'
    );
    res.append('Access-Control-Allow-Headers', [
        'Content',
        'Content-Type',
        'Authorization',
    ]);

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

import router from './router.js';

app.use(config.routerBasePath, router);

app.listen(5000, () => {
    console.log(`[server]: Server is running at http://127.0.0.1:5000`);
});

if (config.routerBasePath.includes('REPLACEME')) {
    console.warn(
        "\nWARNING: You haven't set your widget/package name yet. You should run 'node init.js' in order to set the package details.\n" +
            'Make sure you use the same name as your collaborators or have one person set and commit to github.\n'
    );
}

export default app;
