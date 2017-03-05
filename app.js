/* Enhance is a Higher Order Component which takes WrappedComponent as an arg and returns another Component which toggles data every 3 seconds*/
const Enhance = WrappedComponent => class extends React.Component {
    constructor() {
        super()
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        this.timerId = setInterval(() => this.setState({
            data: this.state.data
                ? null
                : "Hello React"
        }), 3000)
    }
    render() {
        return (<WrappedComponent
            {...this.props}
            data={this.state.data}
            enhancedProp={"I am a prop passed just like any other prop"}/>)
    }

}
/* A normal React Component*/
class SimpleComponent extends React.Component {
    render() {
        return (this.props.data
            ? <div>{this.props.data}
                    <span style={{
                        color: 'green'
                    }}>{this.props.outerProp}</span>
                </div>
            : <div>{"Waiting for data"}
                <span style={{
                    color: 'red'
                }}>{this.props.enhancedProp}</span>
            </div>)
    }
}

const EnhancedComponent = Enhance(SimpleComponent) // Can be exported using an export 

ReactDOM.render(
    <EnhancedComponent outerProp={"I am a prop passed after getting enhanced"}/>, document.getElementById('root'))