import log4js from 'log4js'
import m from 'moment'

const logger = log4js.getLogger('normal');
const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

m.updateLocale('en', {
    relativeTime : {
        future: "%s内",
        past:   "%s前",
        s:  "秒",
        m:  "一分钟",
        mm: "%d分钟",
        h:  "一小时",
        hh: "%d小时",
        d:  "一天",
        dd: "%d天",
        M:  "一个月",
        MM: "%d个月",
        y:  "一年",
        yy: "%d年"
    }
});

export default function processor(data, keyName) {
    let isoTime = data[keyName].toISOString();

    let time = m(m.utc(isoTime).format(TIME_FORMAT));
    let now = m();

    // logger.debug(time.from(now), isoTime);

    data[keyName] = time.from(now);
    return data;
}
