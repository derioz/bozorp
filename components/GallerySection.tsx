import React, { useState, useEffect } from 'react';

interface MediaItem {
    id: number;
    type: 'image' | 'video';
    src: string;
    title: string;
    category: string;
    colSpan?: number; // 1, 2, or 3
    rowSpan?: number; // 1 or 2
}

const mediaItems: MediaItem[] = [
    {
        id: 1,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1542259684-250878c772e4?q=80&w=2072&auto=format&fit=crop',
        title: 'Neon Nights',
        category: 'City Life',
        colSpan: 2,
        rowSpan: 2,
    },
    {
        id: 2,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop',
        title: 'The Enforcer',
        category: 'Characters',
        colSpan: 1,
        rowSpan: 1,
    },
    {
        id: 3,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1624138784181-2999e96fb4ae?q=80&w=2070&auto=format&fit=crop',
        title: 'High Stakes',
        category: 'Action',
        colSpan: 1,
        rowSpan: 1,
    },
    {
        id: 4,
        type: 'video', // Placeholder for video style
        src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop', // Still image representing video
        title: 'Heist Prep',
        category: 'Missions',
        colSpan: 1,
        rowSpan: 2,
    },
    {
        id: 5,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1951&auto=format&fit=crop',
        title: 'Midnight Run',
        category: 'Vehicles',
        colSpan: 2,
        rowSpan: 1,
    },
    {
        id: 6,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop',
        title: 'Underground',
        category: 'Locations',
        colSpan: 1,
        rowSpan: 1,
    },
];

const GallerySection: React.FC = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImage]);

    // Helper to determine class names based on span
    const getSpanClasses = (col: number = 1, row: number = 1) => {
        const colClass = col === 2 ? 'md:col-span-2' : col === 3 ? 'md:col-span-3' : 'md:col-span-1';
        const rowClass = row === 2 ? 'md:row-span-2' : 'md:row-span-1';
        return `${colClass} ${rowClass}`;
    };

    return (
        <section id="gallery" className="w-full py-24 bg-[#080205] relative scroll-mt-20 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-40 pointer-events-none"></div>
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-[#05000200] to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 relative">
                    {/* Glitch Effect elements could go here if we used pure CSS, 
                 but simple DOM structure is often better for React compat. 
             */}
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-pulse font-display">
                        Visual Evidence
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display text-white mb-6 tracking-wide drop-shadow-2xl">
                        LIFE IN THE <span className="relative inline-block" style={{
                            background: 'linear-gradient(to right, #ff0033, #ff5e00)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent' // Fallback
                        }}>
                            CIRCUS
                            {/* Glitch Overlay */}
                            <span className="absolute top-0 left-0 -ml-[2px] text-red-500 opacity-50 animate-ping" style={{ clipPath: 'inset(0 0 0 0)' }}>CIRCUS</span>
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-body font-light text-lg">
                        A glimpse into the chaos, the quiet moments, and everything in between.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {mediaItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedImage(item.src)}
                            className={`relative group rounded-2xl overflow-hidden border border-white/5 bg-[#12030b] cursor-pointer transition-all duration-500 hover:z-20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,0,50,0.3)] hover:border-primary/50 ${getSpanClasses(
                                item.colSpan,
                                item.rowSpan
                            )}`}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Image Layer */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                                style={{ backgroundImage: `url(${item.src})` }}
                            />

                            {/* Overlays */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                            {/* Video Play Icon Indicator */}
                            {item.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-primary/80 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                        <span className="material-symbols-outlined text-4xl text-white pl-1">play_arrow</span>
                                    </div>
                                </div>
                            )}

                            {/* Content Info */}
                            <div className={`absolute bottom-0 left-0 p-6 w-full transform transition-all duration-500 ${hoveredId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 md:opacity-100 md:translate-y-0'}`}>
                                <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-black bg-primary rounded-sm shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                                    {item.category}
                                </span>
                                <h3 className="text-xl md:text-2xl font-display text-white drop-shadow-md tracking-wide">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Shine / Glare Effect on Hover */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                        </div>
                    ))}
                </div>

                {/* Footer / More Button */}
                <div className="mt-12 text-center">
                    <button className="relative px-8 py-3 bg-transparent border border-primary/50 text-white font-display uppercase tracking-widest text-sm hover:bg-primary/10 hover:border-primary transition-all duration-300 group overflow-hidden">
                        <span className="relative z-10 transition-colors group-hover:text-primary-foreground">View Full Gallery</span>
                        <div className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12"></div>
                    </button>
                </div>

            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="absolute top-4 right-4 z-[101] cursor-pointer group p-2">
                        <span className="material-symbols-outlined text-4xl text-white/50 group-hover:text-white transition-colors">close</span>
                    </div>

                    <img
                        src={selectedImage}
                        className="max-w-[95vw] max-h-[95vh] rounded-md shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300"
                        alt="Full size preview"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    />

                    <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 text-sm font-light">
                        Click anywhere outside to close
                    </div>
                </div>
            )}

        </section>
    );
};

export default GallerySection;
