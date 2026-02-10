"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { getFrontendClient } from "@/lib/supabase/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const supabase = getFrontendClient();
    const axiosAuth = useAxiosAuth();

    const getProtectedData = async() => {
        const response = await axiosAuth.get('/protected');
        console.log('Protected Data', response.data);
    }

    useEffect(()=> {
        const checkSession = async()=> {
            const { data } = await supabase.auth.getSession();
            console.log('Session : ', data);

            if(!data.session) {
                router.push('/login')
            } else {
                setUser(data.session.user);
                getProtectedData();
            }
        }
        checkSession();
    },[])

    const logout = async() => {
        await supabase.auth.signOut()
        router.push('/login');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}