class CenterLabel extends React.Component {
    render() {
        const { datum, active, color } = this.props;
        const text = [ `${directions[datum._x]}`, `${Math.round(datum._y1)} mph` ];
        const baseStyle = { fill: color.highlight, textAnchor: "middle" };
        const style = [
            { ...baseStyle, fontSize: 18, fontWeight: "bold" },
            { ...baseStyle, fontSize: 12 }
        ];

        return active ?
            (
                <VictoryLabel
                    text={text} style={style} x={175} y={175} renderInPortal
                />
            ) : null;
    }
}