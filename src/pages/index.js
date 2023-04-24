import {useSession, signIn, signOut} from 'next-auth/react';
import {useState} from 'react';
import {searchYoutube, addToPlaylist} from "@/pages/api/youtubeApi";

export default function Home() {
    const {data: session} = useSession();
    const [list, setList] = useState([]);
    const newList = [];
    const getMyPlaylists = async () => {
        const res = await fetch('/api/playlists');
        const {items} = await res.json();
        setList(items);
    };

    const convertToYT = async () => {
        const res = await fetch('/api/youtubeApi');
        for (var item in list){
            newList.push(await res.json());
        }
        console.log(newList);
    };

    if (session) {
        return (
            <>
                <div className="flex-auto align-middle justify-items-center">
                    <div className="align-middle items-center">
                        Signed in as {session?.token?.email}<br />
                        <button onClick={() => signOut()}>Sign out</button>
                        <hr />

                        <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
                    </div>

                    <ul role="list" className="divide-y divide-gray-100 flex-none items-center align-middle">
                        {list.map((item) => (
                            <li key={item.id} className="flex items-center align-middle gap-x-6 py-5">
                                <div className="flex gap-x-4 items-center" onClick={() => convertToYT()}>
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.images[0]?.url} alt="" />
                                    <div className="min-w-0 flex items-center">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}