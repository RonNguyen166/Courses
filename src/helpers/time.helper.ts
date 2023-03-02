import moment from 'moment';

export function isExpire(timestamp: number | Date) {
  return moment().unix() > timestamp;
}
