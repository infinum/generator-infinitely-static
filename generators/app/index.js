const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const prompts = require('./prompts');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      `Welcome to ${chalk.red('Infinum')} Webpack generator!`
    ));

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: {
    config() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {opt: this.props}
      );
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {opt: this.props}
      );
      this.fs.copy(
        this.templatePath('webpack.helpers.js'),
        this.destinationPath('webpack.helpers.js')
      );
      this.fs.copy(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );
      this.fs.copy(
        this.templatePath('routes.json'),
        this.destinationPath('routes.json')
      );
      this.fs.copy(
        this.templatePath('postcss.config.js'),
        this.destinationPath('postcss.config.js')
      );
      this.fs.copy(
        this.templatePath('postcss.config.js'),
        this.destinationPath('postcss.config.js')
      );
      this.fs.copy(
        this.templatePath('browserslist'),
        this.destinationPath('browserslist')
      );
      this.fs.copy(
        this.templatePath('_stylelintrc'),
        this.destinationPath('.stylelintrc')
      );
      this.fs.copy(
        this.templatePath('_eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_babelrc'),
        this.destinationPath('.babelrc')
      );
    },

    app() {
      this.fs.copyTpl(
        this.templatePath('app/templates/pages/index.hbs'),
        this.destinationPath('app/templates/pages/index.hbs'),
        {opt: this.props}
      );
      this.fs.copy(
        this.templatePath('app/templates/layouts/index.hbs'),
        this.destinationPath('app/templates/layouts/index.hbs')
      );
      this.fs.copy(
        this.templatePath('app/templates/helpers/linkTo.js'),
        this.destinationPath('app/templates/helpers/linkTo.js')
      );
      this.fs.copy(
        this.templatePath('app/templates/helpers/getDataAsString.js'),
        this.destinationPath('app/templates/helpers/getDataAsString.js')
      );
      this.fs.copy(
        this.templatePath('app/scripts/index.js'),
        this.destinationPath('app/scripts/index.js')
      );
      this.fs.copy(
        this.templatePath('app/styles/index.scss'),
        this.destinationPath('app/styles/index.scss')
      );
      this.fs.copy(
        this.templatePath('app/assets/_gitkeep'),
        this.destinationPath('app/styles/.gitkeep')
      );
    }
  },

  install() {
    this.npmInstall();
  }
});
