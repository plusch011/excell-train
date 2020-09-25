import './scss/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Table} from '@/components/table/Table';
import {Formula} from '@/components/formula/Formula';

import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReduxer';
import {storage} from '@core/utils';

const store = createStore(rootReducer, storage('excel-state'));

store.subscribe(state => {
  storage('excel-state', state);
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();

window.onunload = () => excel.destroy();
