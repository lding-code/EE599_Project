const { exec, spawn } = require('child_process');

console.log('child spawned');

let result = '';

exec('bazel test test:test', {'shell': 'pwsh.exe'}, (err, stdout, stderr) => {
    if (err) {
        result = err;
        console.log(typeof result.message);
        console.log('result string: ', result.message);
    } else {
        result = stdout;
        console.log(typeof stdout);
        if (result.includes('PASSED')) {
            console.log('Bazel test passed');
        } else {
            console.log('Bazel test failed');
        }
    }
})

