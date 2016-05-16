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
        let options = _.map(util.range(this.totalPage), i => `<option value="${i}">${i}</option>`).join('');
        this.$sel
            .append(options)
            .val(this.curPageNo);
    }

    initEvents() {
        this.$pageBtns.on('click', ::this.onThumbPage);
        this.$sel.on('change', ::this.onSelectPage);
    }

    redirect(pageNo) {
        console.info(`redirect to page: ${pageNo}`);
        let nextUrl;
        let curUrl = location.href;
        let search = location.search;

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

    currentPageNo() {
        let search = location.search;
        let pageNo;

        // 没有query，或者有query但没有page参数
        if (!this.hasPageParam(search)) {
            pageNo = 1;
        }

        let matched = search.match(/page=(\d*)/);
        if (matched && matched[1]) {
            pageNo = parseInt(matched[1], 10);
        }
        else {
            pageNo = 1;
        }

        return pageNo;
    }

    onSelectPage(evt) {
        let selPage = parseInt(evt.target.value, 10);
        this.redirect(selPage);
    }

    onThumbPage(evt) {
        let $el = $(evt.target);
        let action = $el.data('action');
        // let curPageNo = this.currentPageNo();
        let curPageNo = this.curPageNo;

        let find = {
            pre: (cur) => cur <= 1 ? 1 : cur - 1,
            next: (cur) => cur >= this.totalPage ? this.totalPage : cur + 1,
        };

        if (action === 'pre') {
            if (curPageNo === 1) return;
            // 上一页
            this.redirect(find.pre(curPageNo));
        }
        else if (action === 'next') {
            if (curPageNo === this.totalPage) return;
            // 下一页
            this.redirect(find.next(curPageNo));
        }
        else if (action === 'first') {
            if (curPageNo === 1) return;
            // 第一页
            this.redirect(1);
        }
        else if (action === 'last') {
            if (curPageNo === this.totalPage) return;
            // 最后页
            this.redirect(this.totalPage);
        }
    }
}
