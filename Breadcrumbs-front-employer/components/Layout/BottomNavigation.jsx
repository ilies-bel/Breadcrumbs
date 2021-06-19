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
import {Building, ClipboardList, InfoCircle, Social, School} from 'tabler-icons-react';

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
            <BottomLink selected={selectedTab[0]} index={0} onChange={handleChange} href={CANDIDATES}>

                    <span className='spanLink'>
                        <ClipboardList size={30} strokeWidth={1} color={!selectedTab[0] ? 'royalblue' : 'white'} className="ml-14"/>
                        {CANDIDATES_LABEL}
                    </span>

            </BottomLink>
            <BottomLink selected={selectedTab[1]} index={1} onChange={handleChange} href={HIRING_PROCESS}>

                    <div className='spanLink'>
                        <ClipboardList size={30} strokeWidth={1} color={!selectedTab[1] ? 'royalblue' : 'white'} className="ml-14" />
                        {HIRING_PROCESS_LABEL}
                    </div>
            </BottomLink>
            <BottomLink selected={selectedTab[2]} index={2} onChange={handleChange} href={TIPS}>
                    <span className='spanLink'>
                        <InfoCircle size={30} strokeWidth={1} color={!selectedTab[2] ? 'royalblue' : 'white'} className="ml-14" />
                        {TIPS_LABEL}
                    </span>
            </BottomLink>
            <BottomLink selected={selectedTab[3]} index={3} onChange={handleChange} href={OFFICE}>
                    <span className='spanLink'>
                        <Building size={30} strokeWidth={1} color={!selectedTab[3] ? 'royalblue' : 'white'} className="ml-14" />
                        {OFFICE_LABEL}
                    </span>
            </BottomLink>
            <BottomLink selected={selectedTab[4]} index={4} onChange={handleChange} href={AMBASSADORS}>

                    <span className='spanLink'>
                <School size={30} strokeWidth={1} color={!selectedTab[4] ? 'royalblue' : 'white'} className="ml-14" />
                    {AMBASSADORS_LABEL}
                    </span>

            </BottomLink>
            <BottomLink selected={selectedTab[5]} index={4} onChange={handleChange} href={SOCIAL}>{SOCIAL_LABEL} </BottomLink>
            <BottomLink selected={selectedTab[6]} index={4} onChange={handleChange} href={INSIGHT}>{INSIGHT_LABEL} </BottomLink>

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