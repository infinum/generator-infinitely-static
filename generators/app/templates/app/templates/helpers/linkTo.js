import routes from 'routes.json';

export default function linkTo(routeName) {
  const route = routes.hasOwnProperty(routeName)
    ? routes[routeName].route
    : routes.index.route;

  const name = route[0] === '/' ? '' : route;

  return `/${name}`;
}
