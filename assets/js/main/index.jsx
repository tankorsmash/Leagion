require("expose-loader?reverse!common/reverse");

import ReactDOM from 'react-dom';
import { AppContainer  } from 'react-hot-loader';
import { Base } from 'main/base';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const render = Component => {
	ReactDOM.render(
		<MuiThemeProvider>
			<AppContainer>
				<Component />
			</AppContainer>
		</MuiThemeProvider>,
		document.getElementById('root')
	)
}

render(Base);

if (module.hot) {
    module.hot.accept('main/base', () => {
        render(Base)
    });
}
