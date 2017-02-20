import get from 'lodash.get';
import isPlainObject from 'lodash.isplainobject';

export default function getDataAsString(objectPath) {
  const context = this.htmlWebpackPlugin.options.context;
  const resolved = get(context, objectPath);

  return isPlainObject(resolved) ? JSON.stringify(resolved) : resolved;
}
