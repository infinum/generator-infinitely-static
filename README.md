infinitely-static
===================

This is a static page generator with basic support for routing. The idea
behind this tool is to streamline development of static webpages with
the best of Webpack and related tools.

## What is included?

* Linting tools with sane defaults - stylelint and eslint
* Hot reloading in development
* Babel with env preset activted that takes care of polyfills aswell
* JavaScript minification and dead code removal
* SASS compilation, prefixing, and minification
* A library for managing media breakpoints ([media-blender](https://github.com/infinum/media-bledner))
* Handlebars for templating language (with helpers)
* Support for routes

## Getting started

Running this is really simple. You'll need this generator and `yo` installed.

```bash
npm install -g yo generator-infinitely-static
mkdir my-project
yo infinitely-static
```

## Development

When Yeoman finishes you have a working project.

### Running hot reload server

```
npm start
```

### Production build

```
npm run build
```

### Routes

Adding routes is also simple. In the root of the project you will find `routes.json` containing the intial `index` route. This also supports nesting.

```javascript
{
  "index": "/", // correlates to the template file in app/templates/pages/index.hbs
  "contact": "contact/us" // will take file app/templates/pages/contact.hbs
}
```