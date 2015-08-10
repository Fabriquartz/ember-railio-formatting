import Ember from 'ember';
import { formatDate } from 'ember-railio-formatting';

export default Ember.Helper.extend({
  compute(params, options) {
    return formatDate(params[0], options);
  }
});
