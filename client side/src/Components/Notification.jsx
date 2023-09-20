import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import { supabase } from '../supabase/client';

export default function Notification ({ index, notification }) {

    let friendship_id;
    async function acceptRequestHandle (notification) {
        console.log(notification)
        friendship_id = uuidv4();
        try {
            const { error } = await supabase.from("jk-friends").insert({ friendship_id: friendship_id, user_1_id: userId, user_2_id: notification.request_sender_id });
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-friend-requests").update({ request_status: "accepted" }).eq("request_id", notification.request_id);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        fetchUserRequests();
    }

    async function denyRequestHandle (notification) {
        try {
            const { error } = await supabase.from("jk-friend-requests").update({ request_status: "denied" }).eq("request_id", notification.request_id);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
    }

    if (!notification) {
        <div className="flex flex-col justify-center px-4 py-2 w-full border-b border-gray-400 mx-auto" key={index}>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-7/10">
                        <div className="w-full h-12 rounded-post bg-gray-800"></div>
                        <div className="w-full h-12 rounded-post bg-gray-500"></div>
                    </div>
                </div>
            </div>
    } else {
        return (
            <div className="flex flex-col justify-center px-4 py-2 w-full border-b border-gray-400 mx-auto" key={index}>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-7/10">
                        <div className="flex w-full">
                            <p>{notification.request_sender_id} wants to add you as a friend. {notification.request_message &&  '"' + notification.request_message + '"'}</p>
                        </div>
                        <div className="text-gray-500 w-full font-light">
                            {notification.created_at}
                        </div>
                    </div>
                    <button className="flex justify-center items-start w-15 text-black hover:text-gray-300 duration-200 " onClick={() => acceptRequestHandle(notification)}>
                        <Check fontSize="large" />
                    </button>
                    <button className="flex justify-center items-start w-15 text-black hover:text-gray-300 duration-200 " onClick={() => denyRequestHandle(notification)}>
                        <Close fontSize="large" />
                    </button>
                </div>
            </div>
        )
    }
}