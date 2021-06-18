import React from 'react';
import axios from 'axios';
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

axios.defaults.baseURL = 'http://localhost:3000';
const fetchData = async () => await
    axios.get('/api/tips')
        .then(res => ({
            error: false,
            tipsList: res.data,
        }))
        .catch(() => ({
                error: true,
                tipsList: null,
            }),
        );

const Tips = ({tipsList, error}) => {

    return (
        <>
        <div>
        {error && <div>There was an error.</div>}
            <ol>
                {
                    !error && tipsList && (
                        tipsList.map((tips, index) => 
                        
                        <li key={index} style={style.list}>
                            <span style={style.num}>{index}</span> {tips.title}
                            <span style={style.nested}>{tips.description}</span>
                        </li>
                    )
                        )
                }

            </ol>
        </div>
        </>

    );
}

export const getServerSideProps = async () => {
    const data = await fetchData();
    return {
        props: data,
    };
}

export default Tips;