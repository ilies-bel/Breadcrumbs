import {ChevronDown, Search} from "tabler-icons-react";

export default function DefaultThead(props) {
    return (
        <thead className="bg-white-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <input type="checkbox" />
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name <ChevronDown className="inline cursor-pointer" />
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
                                        Interview Process <ChevronDown className="inline cursor-pointer" />
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Connexion <ChevronDown className="inline cursor-pointer" />
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Role <ChevronDown className="inline cursor-pointer" />
                                    </th>
                                    <th scope="col"
                                    className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <span>position applied to</span>
                                    </th>
                                </tr>
                                </thead>
    )

}