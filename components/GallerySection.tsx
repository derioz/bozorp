import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShimmeringText } from '@/components/ui/elevenlabs/shimmering-text';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/elevenlabs/carousel';
import { Card, CardContent } from '@/components/ui/elevenlabs/card';
import Button from './ui/Button';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

// ============================================================================
// DATA
// ============================================================================
interface MediaItem {
    id: string;
    type: 'image' | 'video';
    src: string;
    title: string;
    category: string;
}

// Fallback data in case Firestore is unreachable
const FALLBACK_ITEMS: MediaItem[] = [
    { id: '1', type: 'image', src: 'https://images.unsplash.com/photo-1542259684-250878c772e4?q=80&w=2072&auto=format&fit=crop', title: 'Neon Nights', category: 'City Life' },
    { id: '2', type: 'image', src: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop', title: 'The Enforcer', category: 'Characters' },
    { id: '3', type: 'image', src: 'https://images.unsplash.com/photo-1624138784181-2999e96fb4ae?q=80&w=2070&auto=format&fit=crop', title: 'High Stakes', category: 'Action' },
    { id: '4', type: 'video', src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop', title: 'Heist Prep', category: 'Missions' },
    { id: '5', type: 'image', src: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1951&auto=format&fit=crop', title: 'Midnight Run', category: 'Vehicles' },
    { id: '6', type: 'image', src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop', title: 'Underground', category: 'Locations' },
];

// ============================================================================
// COMPONENT
// ============================================================================
const GallerySection: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>(FALLBACK_ITEMS);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const q = query(collection(db, 'gallery'), orderBy('order', 'asc'));
                const snap = await getDocs(q);
                if (snap.size > 0) {
                    setMediaItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MediaItem)));
                }
            } catch (err) {
                console.error('Failed to fetch gallery from Firestore, using fallback:', err);
            }
        };
        fetchGallery();
    }, []);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImage]);

    return (
        <section
            id="gallery"
            ref={ref}
            className="w-full py-32 bg-[#050002] relative scroll-mt-20 overflow-hidden"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30" />
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff0033]/50 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,51,0.1),transparent_70%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/20 text-[#ff0033] text-xs font-bold uppercase tracking-[0.3em] mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] animate-pulse" />
                            Visual Evidence
                        </motion.span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
                            MEDIA{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(to right, #ff0033, #ff6666)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                GALLERY
                            </span>
                        </h2>

                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            A glimpse into the chaos, the quiet moments, and everything in between.
                        </p>
                    </motion.div>
                </div>

                {/* Carousel Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-6xl mx-auto"
                    >
                        <CarouselContent>
                            {mediaItems.map((item, index) => (
                                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 p-4">
                                    <div className="p-1">
                                        <Card className="overflow-hidden border-white/5 bg-[#0a0004] hover:border-[#ff0033]/30 transition-all duration-500 group cursor-pointer" onClick={() => setSelectedImage(item.src)}>
                                            <CardContent className="flex aspect-[4/5] items-center justify-center p-0 relative">
                                                {/* Image */}
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                    style={{ backgroundImage: `url(${item.src})` }}
                                                />

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                                {/* Content */}
                                                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <span className="text-[#ff0033] text-xs font-bold uppercase tracking-widest block mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{item.category}</span>
                                                    <span className="text-2xl font-display text-white block">{item.title}</span>
                                                </div>

                                                {/* Video Icon */}
                                                {item.type === 'video' && (
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-[#ff0033]/80 transition-colors">
                                                            <span className="material-symbols-outlined text-4xl text-white">play_arrow</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12 bg-black/50 border-white/10 hover:bg-[#ff0033] hover:border-[#ff0033] text-white" />
                        <CarouselNext className="hidden md:flex -right-12 bg-black/50 border-white/10 hover:bg-[#ff0033] hover:border-[#ff0033] text-white" />
                    </Carousel>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <Button variant="outline" size="md">
                        VIEW FULL GALLERY
                    </Button>
                </motion.div>

            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="absolute top-4 right-4 z-[101] cursor-pointer group p-2 rounded-full hover:bg-white/10"
                            whileHover={{ scale: 1.1 }}
                        >
                            <span className="material-symbols-outlined text-4xl text-white/50 group-hover:text-white transition-colors">
                                close
                            </span>
                        </motion.div>

                        <motion.img
                            src={selectedImage}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-[95vw] max-h-[95vh] rounded-lg shadow-2xl"
                            alt="Full size preview"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySection;
