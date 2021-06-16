import React from 'react';
import { BottomNav } from "../../components/Layout/DrawerLeft"

const tipsList =  [
    {
        ranking: 5,
        title: "Bien serrer la main",
        description: "Serrer très fort"
    },
    {
        ranking: 2,
        title: "Se tenir droit",
        description: "Ne pas voûter le dos"
    },
    {
        ranking: 15,
        title: "Prendre des notes",
        description: "Prévoir un bloc-note"
    },
    {
        ranking: 15,
        title: "Porter une Chemise",
        description: "Prévoir un bloc-note"
    },
]

const style = {
    num: {
        display: 'inline-block',
        width: '40px',
        height: '40px',
        borderRadius: '100px',
        backgroundColor: '#D7E3FC',
        textAlign: 'center',
        padding: '8px',
        marginRight: '10px',
        color: 'royalBlue'
    },
    nested: {
      paddingLeft: '80px',
    },
    bottomBorder: {
        width: "100%",
        height: "1px",
        backgroundColor: 'lightblue',
    },
    list : {
        listStyleType: 'none'
    }
}

function Tips() {

    return (
        <>
        <div>
            <ol>
                {
                tipsList.map((tips, index) => 
                <li key={index} style={style.list}>
                    <span style={style.num}>{index}</span> {tips.title}
                    <li><span style={style.nested}>{tips.description}</span></li>
                </li>
                    )
                }

            </ol>
        </div>
        </>

    );
}

export default Tips;