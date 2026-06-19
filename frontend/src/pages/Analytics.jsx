import { useState, useEffect } from "react";
import { api } from "../lib/axios";

const Analytics = () => {
    const [token, setToken] = useState(() => sessionStorage.getItem("analyticsToken"));
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [data, setData] = useState(null);
    const [fetchError, setFetchError] = useState("");

    useEffect(() => {
        if (!token) return;
        api.get("/analytics", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setData(res.data.data))
            .catch(() => {
                setFetchError("Failed to load analytics.");
                sessionStorage.removeItem("analyticsToken");
                setToken(null);
            });
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            const res = await api.post("/analytics/auth", { username, password });
            sessionStorage.setItem("analyticsToken", res.data.token);
            setToken(res.data.token);
        } catch {
            setLoginError("Invalid credentials.");
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <form onSubmit={handleLogin} className="card bg-white shadow-md p-8 w-full max-w-sm gap-4 flex flex-col">
                    <h1 className="text-xl font-bold text-center">Login for Analytics</h1>
                    <input
                        className="input input-bordered"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="input input-bordered"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {loginError && <p className="text-error text-sm">{loginError}</p>}
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
            </div>
        );
    }

    if (fetchError) {
        return <div className="min-h-screen flex items-center justify-center text-error">{fetchError}</div>;
    }

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto flex flex-col gap-8">
            <h1 className="text-2xl font-bold">Analytics</h1>

            <div className="flex gap-4">
                <div className="stat bg-base-200 rounded-box flex-1 min-w-0">
                    <div className="stat-title text-xs sm:text-sm">Total Page Views</div>
                    <div className="stat-value text-2xl sm:text-4xl">{data.totalViews}</div>
                </div>
                <div className="stat bg-base-200 rounded-box flex-1 min-w-0">
                    <div className="stat-title text-xs sm:text-sm">Unique Sessions</div>
                    <div className="stat-value text-2xl sm:text-4xl">{data.uniqueSessions}</div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2 pl-2 sm:pl-0">Views by Page</h2>
                <table className="table table-zebra table-fixed w-full">
                    <thead>
                        <tr><th className="w-3/4">Page</th><th className="w-1/4">Views</th></tr>
                    </thead>
                    <tbody>
                        {data.byPage.map((row) => (
                            <tr key={row._id}><td>{row._id}</td><td>{row.count}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2 pl-2 sm:pl-0">Views by Month</h2>
                <table className="table table-zebra table-fixed w-full">
                    <thead>
                        <tr><th className="w-3/4">Month</th><th className="w-1/4">Views</th></tr>
                    </thead>
                    <tbody>
                        {data.byMonth.map((row) => (
                            <tr key={row._id}><td>{row._id}</td><td>{row.count}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2 pl-2 sm:pl-0">Views by Day</h2>
                <table className="table table-zebra table-fixed w-full">
                    <thead>
                        <tr><th className="w-3/4">Date</th><th className="w-1/4">Views</th></tr>
                    </thead>
                    <tbody>
                        {data.byDay.map((row) => (
                            <tr key={row._id}><td>{row._id}</td><td>{row.count}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Analytics;
