import { Redirect, Route } from "wouter";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageData from "./pages/ManageData/ManageData";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            toast.error(error.message)
        }
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            toast.error(error.message)
        }
    })
})

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__:
        import("@tanstack/react-query").QueryClient;
    }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export default function App() {
    return <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <main className="flex flex-col text-white gap-8 p-4">
                <Route path="/"><Redirect to="/dashboard" /></Route>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/manage" component={ManageData} />
            </main>
        </div>
        <Toaster position="bottom-right" toastOptions={{ style: { backgroundColor: "#1d293d", color: "white" }, className: "bg-slate-900 text-white", duration: 3000 }} />
    </QueryClientProvider>
}