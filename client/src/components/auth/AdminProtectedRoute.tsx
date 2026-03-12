import { ReactNode, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

import { APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
    const [, setLocation] = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState("");
    const { data: user, isLoading } = trpc.auth.me.useQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user || user.role !== "admin") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
                <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-20 h-20 rounded-xl bg-orange-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-orange-500/20">
                            G
                        </div>
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold tracking-tight">{APP_TITLE}</h1>
                            <p className="text-sm text-neutral-400">
                                {user ? "You do not have admin permissions." : "Please sign in as an admin to continue."}
                            </p>
                        </div>
                    </div>
                    {user ? (
                        <Button
                            onClick={() => {
                                setLocation("/");
                            }}
                            size="lg"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-orange-500/10"
                        >
                            Back to Home
                        </Button>
                    ) : (
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setIsLoggingIn(true);
                                setError("");
                                try {
                                    const res = await fetch("/api/login", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ username, password }),
                                    });

                                    if (!res.ok) {
                                        const data = await res.json();
                                        setError(data.error || "Login failed");
                                    } else {
                                        window.location.reload();
                                    }
                                } catch (err) {
                                    setError("Network error");
                                } finally {
                                    setIsLoggingIn(false);
                                }
                            }}
                            className="w-full flex flex-col gap-4"
                        >
                            <Input
                                type="text"
                                placeholder="Admin Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-neutral-950 border-neutral-700 text-white placeholder:text-neutral-500"
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-neutral-950 border-neutral-700 text-white placeholder:text-neutral-500"
                                required
                            />
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isLoggingIn}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-orange-500/10 disabled:opacity-50"
                            >
                                {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
