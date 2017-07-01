export const Ribbon = (props) => {
    return (
		<div className="two-sided-ribbon">
			<div className="p ribbon-left">
				{props.leftEl}
			</div>
			<div className="p ribbon-right">
				{props.rightEl}
			</div>
		</div>
    );
};

