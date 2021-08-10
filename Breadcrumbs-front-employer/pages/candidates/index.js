import Head from 'next/head'
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useAuthContext} from "utils/context";
import DefaultThead from 'components/table/Thead';
import TdProfile from 'components/table/TdProfile';
import TdStatus from 'components/table/TdStatus';
import TdItem from 'components/table/TdItem';
import TdCheckbox from 'components/table/TdCheckBox';
import MilestoneButton from "./milestonButton";

axios.defaults.baseURL = process.env.BASE_API_URL;

const axios_url = process.env.NEXT_PUBLIC_AXIOS_URL
const fetchData = async (token) => await
    axios.get(`${axios_url}/users/candidates`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            return res.data})
        .catch((e) => console.log(e))


const Candidates = () => {
    const [udata, setData]  = useState([]);
    const context = useAuthContext();

    
    useEffect(() => {
        fetchData(context.token).then((res) => {
            setData(res)
        })
    }, [])

    return (
        <>
            <Head><title> Candidates view</title></Head>
            
            <div className="inline">
                <h1 className="inline font-medium text-2xl">Candidates</h1>
                <button className="inline rounded-md shadow text-white bg-royalblue p-2 ml-20" title="Fontionnalité non-disponible">+ Invite a new candidate</button>
            </div>
            <div className="flex flex-col mt-10">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <DefaultThead />
                                { udata && (
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    { udata.map((person, i) => (
                                        <tr key={person.last_name + i}>
                                            <TdCheckbox />
                                            <TdProfile first_name={person?.first_name} last_name={person?.last_name} email={person.email} image={person?.image} />
               
                                            <TdItem className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`tel:${person?.phone}`}>
                                                    <a
                                                        className={`text-sm text-gray-500 ${person?.phone && 'hover:text-gray-700 cursor-pointer '}`}>
                                                        {person?.phone ?? "unknown"}
                                                    </a>
                                                </Link>
                                            </TdItem>
                                            <TdItem>
                                                <MilestoneButton user={person} />
                                            </TdItem>
                                            <TdStatus />              
                                            <TdItem className="text-sm text-gray-500">{person.role}</TdItem>
                                            <TdItem className="text-sm text-gray-500">{person?.position}</TdItem>
                                        </tr>
                                    ))}
                                </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

/* export const getServerSideProps = async () => {
    const data = await fetchData();
    return {
        props: data,
    };
}
 */

export default Candidates;
