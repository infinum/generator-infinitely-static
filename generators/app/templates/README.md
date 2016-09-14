<%= opt.name %>
=================

<%= opt.description %>

## First run

Start by issuing `npm install` or `npm i`.

## Development

Be sure to have Node version `> 5.x.x`.

You can run:

<% if (opt.server) { %>
* `npm start` and that will start a development server
<% } %>
* `npm run build` and that will produce a build in `build/` folder
