import AdminLayout from "@/components/layout/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Mail } from "lucide-react";

export default function ContactManager() {
    const { data: contacts, isLoading } = trpc.contact.list.useQuery();

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Message Inbox</h2>
                    <p className="text-neutral-400">Review all client inquiries and contact submissions.</p>
                </div>
                
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                    {isLoading ? (
                        <div className="p-8 text-center text-neutral-500 font-medium">Loading messages...</div>
                    ) : contacts?.length === 0 ? (
                        <div className="p-12 text-center text-neutral-500 font-medium italic">No messages found.</div>
                    ) : (
                        <div className="divide-y divide-neutral-800/50">
                            {contacts?.map((contact: any) => (
                                <div key={contact.id} className="p-6 hover:bg-neutral-800/30 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-neutral-800 rounded-lg text-orange-500">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">{contact.name}</h4>
                                                <p className="text-sm text-neutral-400">{contact.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-800 px-3 py-1 rounded-full">
                                            {contact.service}
                                        </div>
                                    </div>
                                    {contact.details && (
                                        <div className="pl-14 text-sm text-neutral-300">
                                            <p className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800">{contact.details}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
