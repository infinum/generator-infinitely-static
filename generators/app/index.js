'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./prompts');

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
    config: function () {
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
        this.templatePath('_eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('_stylelintrc'),
        this.destinationPath('.stylelintrc')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
    },
    app: function () {
      this.fs.copyTpl(
        this.templatePath('config/webpack.config.js'),
        this.destinationPath('config/webpack.config.js'),
        {opt: this.props}
      );

      if (this.props.server) {
        this.fs.copyTpl(
          this.templatePath('config/webpack.server.js'),
          this.destinationPath('config/webpack.server.js'),
          {opt: this.props}
        );
      }

      this.fs.copyTpl(
        this.templatePath('app/scripts/application.js'),
        this.destinationPath('app/scripts/application.js'),
        {opt: this.props}
      );

      this.fs.copyTpl(
        this.templatePath('app/styles/application.scss'),
        this.destinationPath('app/styles/application.scss'),
        {opt: this.props}
      );

      this.fs.copy(
        this.templatePath('app/styles/colors.scss'),
        this.destinationPath('app/styles/colors.scss')
      );

      this.fs.copy(
        this.templatePath('app/styles/media.scss'),
        this.destinationPath('app/styles/media.scss')
      );

      this.fs.copyTpl(
        this.templatePath('app/index.html'),
        this.destinationPath('app/index.html'),
        {opt: this.props}
      );

      this.fs.copy(
        this.templatePath('app/assets/_gitkeep'),
        this.destinationPath('app/styles/.gitkeep')
      );
    }
  },

  install: function () {
    this.spawnCommandSync('git', ['init']);
    this.npmInstall();
  },

  end: function () {
    this.spawnCommandSync('git', ['add', '.']);
    this.spawnCommandSync('git', ['commit', '-m', '🍺 Repo init']);
  }
});
