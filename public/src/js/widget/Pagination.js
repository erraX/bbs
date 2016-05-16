import util from '../common/util';
import _ from 'underscore';

const defaults = {};

export default class Pagination {
    constructor(opts) {
        $.extend(this, defaults, opts);
        this.$el = $(this.$el);

        this.initStructure();
        this.initEvents();
    }

    initStructure() {
        this.$pageBtns = this.$el.find('.btn-page');
        this.$sel = this.$el.find('.page-selector');

        // 添加页码option
        const options = _.map(util.range(this.totalPage), i => `<option value="${i}">${i}</option>`).join('');
        this.$sel
            .append(options)
            .val(this.curPageNo);
    }

    initEvents() {
        this.$pageBtns.on('click', ::this.onThumbPage);
        this.$sel.on('change', ::this.onSelectPage);
    }

    redirect(pageNo) {
        // console.info(`redirect to page: ${pageNo}`);
        let nextUrl;
        const curUrl = location.href;
        const search = location.search;

        if (this.hasPageParam(search)) {
            nextUrl = curUrl.replace(/(page)=\d*/, `$1=${pageNo}`);
        }
        else if (search) {
            nextUrl = curUrl + `&page=${pageNo}`;
        }
        else {
            nextUrl = curUrl + `?page=${pageNo}`;
        }

        location.href = nextUrl;
    }

    hasPageParam(search) {
        return /page=/.test(search);
    }

    onSelectPage(evt) {
        const selPage = parseInt(evt.target.value, 10);
        this.redirect(selPage);
    }

    onThumbPage(evt) {
        const $el = $(evt.target);
        const action = $el.data('action');
        const curPageNo = this.curPageNo;

        const find = {
            previous: (cur) => cur <= 1 ? 1 : cur - 1,
            next: (cur) => cur >= this.totalPage ? this.totalPage : cur + 1,
        };

        const pageAction = {
            previous:() => {
                if (curPageNo === 1) return;
                // 上一页
                this.redirect(find.previous(curPageNo));
            },
            next: () => {
                if (curPageNo === this.totalPage) return;
                // 下一页
                this.redirect(find.next(curPageNo));
            },
            first: () => {
                if (curPageNo === 1) return;
                // 第一页
                this.redirect(1);
            },
            last: () => {
                if (curPageNo === this.totalPage) return;
                // 最后页
                this.redirect(this.totalPage);
            }
        };

        pageAction[action]();
    }
}
