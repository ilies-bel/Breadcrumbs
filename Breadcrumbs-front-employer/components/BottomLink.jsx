import React from 'react';
import {theme} from '../utils/themes'


class BottomLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            hover: false
        }
        this.mouse = () => {
            this.setState((state) => {
                state.hover = true
            })
        }
        this.handleClick = () => {
            console.log("clicked")
            this.props.onChange(this.props.index)
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.selected !== prevProps.selected && this.setState({selected: this.props.selected})
    }

    render (){
        return(
        <span onClick={this.handleClick} className={this.state.selected ? 'selected' : 'unactive'}>
            {this.props.children}
            <style jsx>
                {`
                span {
                    height: 50px;
                    display: inline-block;
                    padding: 30px;
                    justify-content: center;
                    text-align: center;
                    }
                    `}
            </style>
            <style jsx>
                {`
                span:hover {
                    background: ${theme.background.default};
                    border-style: ${this.state.hover ? 'solid' : 'none'};
                    border-width: 4px;
                    color: ${theme.label.main};
                    }
                span.selected {
                    background: ${theme.primary.main};
                    border-style: 'none';
                    border-width: 4px;
                    color: ${theme.label.selected};
                }
                `}
            </style>
        </span>
        )
    }
}

export default BottomLink;