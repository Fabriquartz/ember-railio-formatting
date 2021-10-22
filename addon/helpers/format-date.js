import Helper from '@ember/component/helper';
import { formatDate } from 'ember-railio-formatting';

export default class FormatDateHelper extends Helper {
  compute(params, options) {
    return formatDate(params[0], options);
  }
}
