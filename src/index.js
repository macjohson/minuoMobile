import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 1. Initialize
const app = dva({
  history:createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/init'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
