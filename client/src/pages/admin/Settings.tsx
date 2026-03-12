import AdminLayout from "@/components/layout/AdminLayout";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                        <SettingsIcon className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
                        <p className="text-neutral-500 text-sm italic">Manage global site configurations and admin preferences.</p>
                    </div>
                </div>

                <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-12 text-center text-neutral-500">
                    <p className="font-medium italic">Settings module coming soon. Use Content Manager for site data modifications.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
