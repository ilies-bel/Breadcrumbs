
import TdItem from './TdItem';

export default function TdStatus(props) {
    return (
        <TdItem>
            <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${props?.status === 'active' ? 'bg-green-100' : 'bg-red-100'} text-green-800`}>
            {props?.status ?? "Inactive"}
            </span>
        </TdItem>
    )
}