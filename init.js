import fs from 'fs/promises';
import readline from 'node:readline/promises';

async function main() {
    const [widgetName, packageName] = await requestPackageName();

    const pkgJSON = await fs.readFile('./package.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        return data;
    });

    const lockfile = await fs.readFile(
        './package-lock.json',
        'utf8',
        (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            return data;
        }
    );

    const updatedPkgJSON = pkgJSON.replace(/REPLACEME/g, packageName);
    const updatedLockfile = lockfile.replace(/REPLACEME/g, packageName);

    await fs.writeFile('./package.json', updatedPkgJSON);
    await fs.writeFile('./package-lock.json', updatedLockfile);

    const config = await fs.readFile('./config.js', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        return data;
    });

    const updatedConfig = config.replace(/REPLACEME/g, widgetName);

    await fs.writeFile('config.js', updatedConfig);
}

async function requestPackageName() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const widgetName = await rl.question(
        'What would you like to call your widget?\n' +
            'Please use only lowercase alphabetical characters.\n'
    );

    const lowerAlphaRegex = new RegExp('^[a-z]+$');
    if (!lowerAlphaRegex.test(widgetName)) {
        throw new Error(
            `Widget name "${widgetName}" doesn't pass regex '^[a-z]+$'\n` +
                'Try a lowercase name containing only the characters a-z.'
        );
    }

    const packageName = '@acm-widgets/' + widgetName;

    console.log(
        `Your widget will be called "${widgetName}" with NPM package "${packageName}"`
    );
    rl.close();

    return [widgetName, packageName];
}

main();
