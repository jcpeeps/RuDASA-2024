import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useUser({ redirectTo = '', redirectIfFound = false } = {})
{
    const { data: user, mutate: mutateUser } = useSWR('/api/user');

    useEffect(() => {
            //Redirect not required or no user data available yet
            if(!redirectTo || !user) return;

            if ((redirectTo && !redirectIfFound && !user?.isLoggedIn) || // redirectTo is set, but redirect if user not found
                (redirectIfFound && user?.isLoggedIn)) // redirectIfFound is also set, redirect if user found
            { Router.push(redirectTo) }

        },
        [user, redirectIfFound, redirectTo]);

    return { user, mutateUser }
}