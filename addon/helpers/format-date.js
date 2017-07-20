import Helper from 'ember-helper';
import { formatDate } from 'ember-railio-formatting';

export default Helper.extend({
  compute(params, options) {
    return formatDate(params[0], options);
  }
});
