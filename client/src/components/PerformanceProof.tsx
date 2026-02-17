import { motion } from "framer-motion";

const PERFORMANCE_PROOF = [
    {
        id: 1,
        client: "Healthy Meals",
        metric: "3.2x ROAS",
        result: "AED 220k Revenue",
        image: "/assets/images/case-studies/prepmeal/Mockup.png" // Using available asset
    },
    {
        id: 2,
        client: "BeyondCars",
        metric: "150+ Leads",
        result: "AED 180 CPL",
        image: "/assets/images/brands/Beyond-Cars/Porsche 718 Cayman.jpg"
    },
    {
        id: 3,
        client: "PrepMeal",
        metric: "150+ Creatives",
        result: "21k+ Deliveries",
        image: "/assets/images/case-studies/prepmeal/Mockup.png"
    }
];

export default function PerformanceProof() {
    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Performance Proof</h2>
                    <p className="text-xl text-gray-400 max-w-2xl">Real campaign snapshots — strategy, creatives, and results.</p>
                    <p className="text-sm text-gray-500 mt-2">* Sensitive client data blurred for confidentiality</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PERFORMANCE_PROOF.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900/40 backdrop-blur-md hover:border-orange-500/50 transition-all duration-300"
                        >
                            <div className="aspect-[4/5] bg-gray-800 relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={`${item.client} Results`}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop")}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="text-orange-500 text-sm font-bold uppercase mb-1">{item.client}</p>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-white text-2xl font-bold">{item.metric}</p>
                                            <p className="text-gray-400 text-sm">{item.result}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
