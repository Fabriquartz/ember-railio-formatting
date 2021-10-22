import Helper from '@ember/component/helper';
import { formatNumber } from 'ember-railio-formatting';

export default class FormatNumberHelper extends Helper {
  compute(params, options) {
    return formatNumber(params[0], options);
  }
}
