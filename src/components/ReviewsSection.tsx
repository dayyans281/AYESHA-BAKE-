import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, CheckCircle2, MessageSquarePlus, Sparkles, ThumbsUp, ShieldCheck, Quote } from 'lucide-react';
import { REVIEWS } from '../data/bakeryData';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'birthday' | 'anniversary' | 'signature'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newName, setNewName] = useState('');
  const [newOccasion, setNewOccasion] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCake, setNewCake] = useState('Royal Rasmalai Cake');
  const [submitted, setSubmitted] = useState(false);

  const filterReviews = (revs: Review[]) => {
    if (activeFilter === 'all') return revs;
    if (activeFilter === 'birthday') return revs.filter((r) => r.occasion.toLowerCase().includes('birth'));
    if (activeFilter === 'anniversary') return revs.filter((r) => r.occasion.toLowerCase().includes('anniversary') || r.occasion.toLowerCase().includes('wedding'));
    if (activeFilter === 'signature') return revs.filter((r) => r.cakeOrdered.toLowerCase().includes('rasmalai') || r.cakeOrdered.toLowerCase().includes('fudge'));
    return revs;
  };

  const handleLike = (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likesCount: (r.likesCount || 0) + 1 } : r))
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const added: Review = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      occasion: newOccasion.trim() || 'Special Celebration',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      cakeOrdered: newCake,
      verifiedBuyer: true,
      likesCount: 1,
    };

    setReviewsList([added, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddModal(false);
      setNewName('');
      setNewOccasion('');
      setNewComment('');
    }, 1500);
  };

  const visibleReviews = filterReviews(reviewsList);

  return (
    <section id="reviews" className="py-20 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#BE185D]" />
            Real Customer Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] tracking-tight">
            Loved by Families & <span className="text-[#BE185D]">Celebrations</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D4037] leading-relaxed">
            Real stories from our happy customers across the city. Read genuine experiences 
            about our custom 3D sculpted car cakes, Royal Rasmalai, and decadent chocolate fudge.
          </p>

          {/* Social Proof Badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="p-3 rounded-2xl bg-[#FFF9F5] border border-[#F2DDD2] text-center">
              <span className="text-xl sm:text-2xl font-serif font-black text-[#BE185D] block">4.9 ★</span>
              <span className="text-[11px] text-[#8D6E63] font-semibold">Average Rating</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF9F5] border border-[#F2DDD2] text-center">
              <span className="text-xl sm:text-2xl font-serif font-black text-[#3E2723] block">650+</span>
              <span className="text-[11px] text-[#8D6E63] font-semibold">Cakes Delivered</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF9F5] border border-[#F2DDD2] text-center">
              <span className="text-xl sm:text-2xl font-serif font-black text-[#15803D] block">100%</span>
              <span className="text-[11px] text-[#8D6E63] font-semibold">Fresh Daily</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF9F5] border border-[#F2DDD2] text-center">
              <span className="text-xl sm:text-2xl font-serif font-black text-[#BE185D] block">99.4%</span>
              <span className="text-[11px] text-[#8D6E63] font-semibold">On-Time Arrival</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Cake Experience</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex items-center justify-center flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'birthday', label: 'Birthdays & Kids' },
            { id: 'anniversary', label: 'Anniversaries' },
            { id: 'signature', label: 'Rasmalai & Fudge' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-[#3E2723] text-white'
                  : 'bg-white text-[#5D4037] hover:bg-[#FCE7F3] border border-[#E8D8CF]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {visibleReviews.map((rev) => (
            <motion.div
              key={rev.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#FFF9F5] border border-[#F0DFD5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: User Avatar + Name + Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {rev.avatar ? (
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#BE185D]/30 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#FCE7F3] text-[#BE185D] font-serif font-black text-lg flex items-center justify-center border-2 border-[#BE185D]/20 shrink-0">
                        {rev.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif font-bold text-[#3E2723] text-base leading-snug">
                          {rev.name}
                        </h4>
                        {rev.verifiedBuyer && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-800 bg-[#DCFCE7] px-1.5 py-0.5 rounded-md font-bold">
                            <ShieldCheck className="w-3 h-3 text-[#15803D]" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8D6E63] font-medium">{rev.occasion}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-[#EFE3DB]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mt-4 relative">
                  <Quote className="w-5 h-5 text-[#EAD8CE] absolute -top-1 -left-1 -z-0 opacity-50" />
                  <p className="text-xs sm:text-sm text-[#4E342E] leading-relaxed relative z-10 italic">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Bottom Row: Cake Ordered & Like Button */}
              <div className="mt-5 pt-4 border-t border-[#F2DDD2] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#8D6E63]">Ordered:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FCE7F3] text-[#9D174D] font-bold text-[11px]">
                    {rev.cakeOrdered}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#A88B7D]">{rev.date}</span>
                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1 text-[11px] text-[#6E4F42] hover:text-[#BE185D] font-semibold transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{rev.likesCount || 0}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Leave a Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#F5E6DF] shadow-2xl relative">
            <h3 className="text-xl font-serif font-bold text-[#3E2723]">
              Share Your Sweet Review
            </h3>
            <p className="text-xs text-[#6E4F42] mt-1">
              Your honest feedback helps our home bakery bring smiles to more celebrations!
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-[#3E2723]">Thank you for your love!</h4>
                <p className="text-xs text-[#6E4F42]">Your review has been published with verified status.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#6E4F42] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Fatima / Hamza / Zainab"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAD8CE] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#6E4F42] mb-1">Occasion</label>
                    <input
                      type="text"
                      value={newOccasion}
                      onChange={(e) => setNewOccasion(e.target.value)}
                      placeholder="e.g. 5th Birthday / Eid"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAD8CE] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6E4F42] mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#EAD8CE] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                    >
                      <option value={5}>5 Stars (Loved every bite!)</option>
                      <option value={4}>4 Stars (Very delicious)</option>
                      <option value={3}>3 Stars (Good)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E4F42] mb-1">Cake Ordered</label>
                  <input
                    type="text"
                    value={newCake}
                    onChange={(e) => setNewCake(e.target.value)}
                    placeholder="e.g. Custom 3D Car Cake, Royal Rasmalai..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAD8CE] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E4F42] mb-1">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="How was the taste, presentation, freshness, and delivery?"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAD8CE] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5D4037] hover:bg-[#FAF5EE]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#BE185D] hover:bg-[#9D174D]"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
