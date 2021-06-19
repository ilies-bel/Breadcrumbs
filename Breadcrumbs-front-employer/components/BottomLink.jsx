import React from 'react';
import {theme} from '../utils/themes'
import Link from 'next/link';

class BottomLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            hover: false
        }
        this.handleClick = () => {
            console.log("clicked")
            this.props.onChange(this.props.index)
        }
        this.href=this.props.href
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.selected !== prevProps.selected && this.setState({selected: this.props.selected})
    }

    render (){
        return(
            <Link href={this.href}>
               <a onClick={this.handleClick} className={this.state.selected ? 'selected' : 'unactive'}>
                     {this.props.children}
                    <style jsx>
                        {`
                        a {
                            width: 100%;
                            display: inline-block;
                            padding: 30px;
                            justify-content: center;
                            text-align: center;
                            }
                            a {
                                outline-color: blue;
                            }
                            `}
                    </style>
                    <style jsx>
                        {`
                        a:hover, a:focus {
                            background: ${theme.background.default};
                            border-style: ${this.state.hover ? 'solid' : 'none'};
                            border-width: 4px;
                            color: ${theme.label.main};
                            outline-color: royalblue;
                            }
                        a.selected {
                            background: ${theme.primary.main};
                            border-style: none;
                            border-width: 4px;
                            color: ${theme.label.selected};
                        }
                        `}
                    </style>
                </a>
            </Link>
        )
    }
}

export default BottomLink;