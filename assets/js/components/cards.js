import FontAwesome from 'react-fontawesome';

export const Card = ({children, className}) => {
    className = className || '';
    return (
        <div className={'le-card ' + className}>
            {children}
        </div>
    );
};

export const NoDataCard = ({children, className, user}) => {
    className = className || '';
    return (
        <Card className={'le-no-data-card ' + className}>
            <FontAwesome name="exclamation-triangle"/>
            {user &&
                <h4>{'Hi ' + user.first_name + '!'}</h4>
            }
            {children}
        </Card>
    );
};
