import Head from 'next/head'
import Link from 'next/link';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3000';


const fetchData = async () => await
    axios.get('/api/users')
        .then(res => ({
            error: false,
            users: res.data,
        }))
        .catch(() => ({
                error: true,
                users: null,
            }),
        );


const Candidates = ({users, error}) => {

    return (
        <>
            <Head><title> Candidates view</title></Head>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Phone number
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Role
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                {!error && users && (
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((person, i) => (
                                        <tr key={person.last_name + i}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full"
                                                             src={person?.image ??
                                                             "https://s2.qwant.com/thumbr/0x380/4/7/114875467240bf18e79dc9538d91ccdb9746f329f05e279e6e3399a9c673dd/480px-Ic_account_circle_48px.svg.png?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fbd%2FIc_account_circle_48px.svg%2F480px-Ic_account_circle_48px.svg.png&q=0&b=1&p=0&a=0"}
                                                             alt="No picture yet"/>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div
                                                            className="text-sm font-medium text-gray-900">{person.first_name} {person.last_name}</div>
                                                        <Link href={`mailto:${person?.mail}`}>
                                                            <div
                                                                className={`text-sm text-gray-500 ${person?.mail && 'hover:text-gray-700 cursor-pointer '}`}>{person.mail}</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`tel:${person?.phone_number}`}>
                                                    <div
                                                        className={`text-sm text-gray-500 ${person?.phone_number && 'hover:text-gray-700 cursor-pointer '}`}>
                                                        {person?.phone_number ?? "unknown"}
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
            <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${person.status === 'active' ? 'bg-green-100' : 'bg-red-100'} text-green-800`}>
            {person.status ?? "Inactive"}
            </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </a>
                                            </td>
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

export const getServerSideProps = async () => {
    const data = await fetchData();
    return {
        props: data,
    };
}


export default Candidates;
