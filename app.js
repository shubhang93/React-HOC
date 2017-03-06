/* Enhance is a Higher Order Component which takes WrappedComponent as an arg and returns another Component which toggles data every 3 seconds*/
const Enhance = WrappedComponent => class Enhanced extends React.Component {
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
            normalProp={"I am a prop passed just like any other prop"}/>)
    }

}
/* A  Functional  Component*/
// class SimpleComponent extends React.Component {     render() {         return
// (this.props.data             ? <div>{this.props.data} <span style={{
//       color: 'green' }}>{this.props.outerProp}</span>  </div>             :
// <div>{"Waiting for data"}                 <span style={{ color: 'red'
//         }}>{this.props.enhancedProp}</span> </div>)     } }

const SimpleComponent = (props) => (props.data
    ? <div>{props.data}
            <span style={{
                color: 'slateblue'
            }}>
                {props.outerProp}</span>
        </div>
    : <div>{"Waiting for data"}</div>)

const ButtonComponent = (props) => (props.data
    ? <button>{props.data}</button>
    : <p>{"No data to render a button"} 
         <span style={{
            color: 'limegreen'
        }}>{props.normalProp}</span>
    </p>)

const EnhancedSimpleComponent = Enhance(SimpleComponent) // Can be exported using an export
const EnhancedButtonComponent = Enhance(ButtonComponent)

ReactDOM.render(
    <div><EnhancedSimpleComponent
    outerProp={"I am a prop passed after getting enhanced"}/><EnhancedButtonComponent/></div>, document.getElementById('root'))