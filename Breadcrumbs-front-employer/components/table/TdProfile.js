
import Link from 'next/link';

import TdItem from './TdItem';

export default function TdProfile(props) {
    return (
        <TdItem>
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full"
                            src={props?.image ??
                            "https://s2.qwant.com/thumbr/0x380/4/7/114875467240bf18e79dc9538d91ccdb9746f329f05e279e6e3399a9c673dd/480px-Ic_account_circle_48px.svg.png?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fbd%2FIc_account_circle_48px.svg%2F480px-Ic_account_circle_48px.svg.png&q=0&b=1&p=0&a=0"}
                            alt="No picture yet"/>
                </div>
                <div className="ml-4">
                    <div
                        className="text-sm font-medium text-gray-900">{props.first_name} {props.last_name}</div>
                    <Link href={`mailto:${props?.email}`}>
                        <a
                            className={`text-sm text-gray-500 ${props?.email && 'hover:text-gray-700 cursor-pointer '}`}>{props.email}</a>
                    </Link>
                </div>
             </div>
        </TdItem>
    )
}