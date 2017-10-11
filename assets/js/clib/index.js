import '../../style/clib.scss';
import '../../style/app.scss';
import'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import "expose-loader?reverse!common/reverse";

import ReactDOM from 'react-dom';
import { AppContainer  } from 'react-hot-loader';
import Base from 'clib/base';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Base);

if (module.hot) {
    module.hot.accept();
}
