require("expose-loader?reverse!common/reverse");

import ReactDOM from 'react-dom';
import { AppContainer  } from 'react-hot-loader';
import Base from 'main/base';

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	)
}

render(Base);

if (module.hot) module.hot.accept('main/base', () => render(Base));
