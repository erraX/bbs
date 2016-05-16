import Pagination from '../widget/Pagination';

export default {
    start() {
        new Pagination({
            $el: '#pagination' ,
            totalPage: $('#pagination').data('totalPage'),
            curPageNo: $('#pagination').data('pageNo')
        });
    },
}
