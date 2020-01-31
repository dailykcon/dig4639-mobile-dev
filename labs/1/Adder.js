class Adder {
    props;
    constructor(props){
        this.props = props;
    }
    sum(){
        return this.props.a + this.props.b;
    }
    render(){
        return `<p>The sum of ${this.props.a} and ${this.props.b} is ${this.sum()}</p>`;
    }
}

module.exports = Adder