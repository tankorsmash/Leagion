require("expose-loader?reverse!common/reverse");

import ReactDOM from 'react-dom';
import { AppContainer  } from 'react-hot-loader';
import { Base } from 'main/base';

import style from 'app.scss';
import 'react-select/dist/react-select.css';

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
