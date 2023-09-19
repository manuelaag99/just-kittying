import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import LoadingSpinner from "./Portals/LoadingSpinner";

import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';

export default function Notifications ({ userId }) {

    const [notifications, setNotifications] = useState();

    async function fetchUserRequests() {
        try {
            const { data, error } = await supabase.from("jk-friend-requests").select("*").eq("request_receiver_id", userId);
            if (error) console.log(error);
            console.log(data)
            setNotifications(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserRequests();
    }, [])

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

    function denyRequestHandle () {
        console.log("no")
    }

    if (!notifications) {
        return (
            <LoadingSpinner open={true} />
        )
    } else {
        return (
            <div className="w-full sm:w-6/10 bg-white ">
                {notifications && notifications.map((notification, index) => {
                    if (notification.request_status === "pending") {
                        return (
                            <div className="flex flex-col justify-center px-4 py-2 w-full border-b border-gray-400" key={index}>
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
                                    <button className="flex justify-center items-start w-15 text-black hover:text-gray-300 duration-200 " onClick={denyRequestHandle}>
                                        <Close fontSize="large" />
                                    </button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}