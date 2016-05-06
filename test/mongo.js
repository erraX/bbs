import manager from '../modules/manager'
import Q from 'q'

async function get() {
    let data = await manager.getTopicDetailById('1910514', 'asc');
    console.log(data);
}

get();
