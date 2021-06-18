import Link from 'next/link';
import React from 'react';
import BottomLink from '../BottomLink';
import {
    AMBASSADORS,
    AMBASSADORS_LABEL,
    CANDIDATES,
    CANDIDATES_LABEL, HIRING_PROCESS, HIRING_PROCESS_LABEL, INSIGHT, INSIGHT_LABEL, OFFICE,
    OFFICE_LABEL,
    SETTINGS,
    SETTINGS_LABEL, SOCIAL, SOCIAL_LABEL, TIPS, TIPS_LABEL
} from "../../constants/routes";
import {getSession} from "next-auth/client";

class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            setValue: () => {},
            data: null,
            selectedTab: [1,0,0,0,0,0,0],
            selectedIndex: 0
        }

    }
    componentDidMount() {
        const session = getSession().then(response => { this.setState({data: response }) })
    }

    render () {
        const data = this.state;
        const selectedTab=data.selectedTab;
        const handleChange = (n) => {
            let tempTab = [];
            let count = 0;
            for(let s of selectedTab) {
                count === n ? tempTab.push(1) : tempTab.push(0);
                count++;
            }
            this.setState({selectedTab: tempTab});
        };

        if(data) {
        return(
        <div className="bar">
            {/*//TODO: refactoring avec un arary.map()*/}
            <BottomLink selected={selectedTab[0]} index={0} onChange={handleChange}><Link href={CANDIDATES}>{CANDIDATES_LABEL}</Link> </BottomLink>
            <BottomLink selected={selectedTab[1]} index={1} onChange={handleChange}><Link href={HIRING_PROCESS}>{HIRING_PROCESS_LABEL}</Link> </BottomLink>
            <BottomLink selected={selectedTab[2]} index={2} onChange={handleChange}><Link href={TIPS}>{TIPS_LABEL}</Link> </BottomLink>
            <BottomLink selected={selectedTab[3]} index={3} onChange={handleChange}><Link href={OFFICE}>{OFFICE_LABEL}</Link> </BottomLink>
            <BottomLink selected={selectedTab[4]} index={4} onChange={handleChange}><Link href={AMBASSADORS}>{AMBASSADORS_LABEL}</Link> </BottomLink>
            <BottomLink selected={selectedTab[5]} index={4} onChange={handleChange}><Link href={SOCIAL}>{SOCIAL_LABEL}</Link> </BottomLink>
            <BottomLink selected={selectedTab[6]} index={4} onChange={handleChange}><Link href={INSIGHT}>{INSIGHT_LABEL}</Link> </BottomLink>

            <style jsx>{`
                .bar {
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    left: -0.15%;
                }            
            `}</style>
        </div>
        )}
        else {
            return (
                <BottomLink>Nothing to watch</BottomLink>
            )
        }
    };

}

export default BottomNav;