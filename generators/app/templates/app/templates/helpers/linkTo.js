import routes from 'routes.json';

export default function linkTo(routeName) {
  const route = routes.hasOwnProperty(routeName)
    ? routes[routeName]
    : routes.index;

  const name = route[0] === '/' ? '' : route;

  return `/${name}`;
}
