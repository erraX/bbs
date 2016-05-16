import Pagination from '../widget/Pagination';

export default {
    start(options) {
        this.initStructure();
        this.initEvents();
    },

    initStructure() {
        this.pagination = new Pagination({
            $el: '#pagination' ,
            totalPage: $('#pagination').data('totalPage'),
            curPageNo: $('#pagination').data('pageNo')
        });
    },

    initEvents() {
    }
}
