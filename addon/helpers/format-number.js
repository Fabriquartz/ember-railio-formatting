import Ember from 'ember';
import { formatNumber } from 'ember-railio-formatting';

export default Ember.Helper.extend({
  compute(params, options) {
    return formatNumber(params[0], options);
  }
});
