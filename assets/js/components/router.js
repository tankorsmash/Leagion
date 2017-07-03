import {Route as RouterRoute} from 'react-router-dom';

//https://github.com/ReactTraining/react-router/issues/4105
const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

export const Route = ({ component, ...rest  }) => {
    return (
        <RouterRoute {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};
