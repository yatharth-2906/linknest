import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

function useToken() {
    const [token, setToken] = useState(Cookies.get("token") ?? null);

    useEffect(() => {
        const interval = setInterval(() => {
            const newToken = Cookies.get("token");

            if (!newToken) {
                setToken(null);
                clearInterval(interval);
            } else if (newToken !== token) {
                setToken(newToken);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [token]);

    return token;
}

export function UserProvider({ children }) {
    const backend_url = 'https://linknest-git-main-yatharth-2906s-projects.vercel.app/';
    // const backend_url = import.meta.env.VITE_BACKEND_URL;

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleLogout = () => {
        Cookies.remove("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    let token = useToken();

    useEffect(() => {
        async function fetchUser() {
            if (!token) {
                localStorage.removeItem("user");
                setUser(null);
                return;
            }

            try {
                const response = await fetch(`${backend_url}/user/login?token=${token}`);
                const data = await response.json();
                
                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
                } else {
                    Cookies.remove("token");
                    localStorage.removeItem("user");
                    setUser(null);
                }
            } catch (err) {
                console.log("User Authentication Error:", err);
                Cookies.remove("token");
                localStorage.removeItem("user");
                setUser(null);
            }
        }

        fetchUser();
    }, [token]);
    

    return (
        <UserContext.Provider value={{ user, setUser, handleLogout, backend_url }}>
            {children}
        </UserContext.Provider>
    );
}

export function useContextUser() {
    return useContext(UserContext);
}