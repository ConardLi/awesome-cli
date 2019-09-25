const { Signale } = require('signale');
const chalk = require('chalk');
const { Spinner } = require('cli-spinner');

let spinner = new Spinner('');


const options = {
    types: {
        error: {
            badge: ' ❌ ',
            color: 'red',
            label: '失败'
        },
        success: {
            badge: ' 🎉 ',
            color: 'green',
            label: '成功'
        },
        info: {
            badge: '',
            color: '',
            label: ''
        }
    }
};

const signale = new Signale(options);


module.exports = {
    success: function (msg) {
        signale.success(chalk.green(msg));
    },
    error: function (msg) {
        signale.error(chalk.red(msg));
    },
    info: function (msg) {
        signale.info(chalk.blue(msg));
    },
    loading: (title = '加载中...') => {
        spinner.setSpinnerTitle(` 💫  ${title}  %s`);
        spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');
        spinner.start();
    },
    stop: () => {
        spinner.stop();
        console.log();
    }
};
