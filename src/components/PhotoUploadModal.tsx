import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Sparkles, Image as ImageIcon, RotateCcw, Check, Heart, ShieldCheck } from 'lucide-react';
import { useCustomPhotos, BakeryPhotos } from '../utils/customPhotoStore';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({ isOpen, onClose }) => {
  const { photos, saveCustomPhoto, resetCustomPhotos, isCustomized } = useCustomPhotos();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const carInputRef = useRef<HTMLInputElement>(null);
  const sonicInputRef = useRef<HTMLInputElement>(null);
  const rateCardInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (key: keyof BakeryPhotos, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read as Base64 Data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        saveCustomPhoto(key, dataUrl);
        setSuccessMsg(`Photo successfully updated for ${key}!`);
        setTimeout(() => setSuccessMsg(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (key: keyof BakeryPhotos, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        saveCustomPhoto(key, dataUrl);
        setSuccessMsg(`Photo successfully updated for ${key}!`);
        setTimeout(() => setSuccessMsg(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const photoSlots: {
    key: keyof BakeryPhotos;
    title: string;
    sub: string;
    desc: string;
    preview: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
  }[] = [
    {
      key: 'carCake',
      title: '1. Handcrafted 3D Yellow Car Cake',
      sub: 'Dayyan King 3D Vehicle Cake',
      desc: 'Yellow buttercream rosettes, white piped windshield, two chocolate eyes, smile, and cookie wheels.',
      preview: photos.carCake,
      inputRef: carInputRef,
    },
    {
      key: 'sonicCake',
      title: '2. Sonic & Dinosaurs Birthday Cake',
      sub: 'Sonic the Hedgehog Theme',
      desc: 'Sky-blue & white piped frosting, Sonic character cutouts, chocolate spheres, and dinosaur base.',
      preview: photos.sonicCake,
      inputRef: sonicInputRef,
    },
    {
      key: 'rateCard',
      title: '3. Ayesha Baking House Price List Poster',
      sub: 'Official Cakes Menu & Rate Card',
      desc: 'Colorful rates flyer with ornamental badge, pink ribbon, 12 menu items, and corner dessert cakes.',
      preview: photos.rateCard,
      inputRef: rateCardInputRef,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#FDF4F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border-4 border-[#FCE7F3] relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-[#3E2723] hover:bg-rose-100 flex items-center justify-center shadow transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pt-8 pb-6 px-6 text-center bg-gradient-to-r from-[#FDE2E4] via-[#FFF1F2] to-[#FAF5FF] border-b border-[#F0D0D5]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-pink-200 text-[#BE185D] text-xs font-bold uppercase mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Real Photo Manager</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#3E2723]">
              Apni Real Bakery Photos Upload Karein
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#5D4037] max-w-xl mx-auto">
              Aap apni WhatsApp ya gallery wali <strong>same 3 photos</strong> yahan 1-click me select ya drag-and-drop kar sakte hain. Ye poori website par foran live apply ho jayengi!
            </p>

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold"
              >
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </div>

          {/* Photo Slots Grid */}
          <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-4">
            {photoSlots.map((slot) => (
              <div
                key={slot.key}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(slot.key, e)}
                className="p-4 rounded-2xl bg-white border-2 border-dashed border-[#F472B6]/40 hover:border-[#BE185D] transition-colors flex flex-col sm:flex-row items-center gap-4 shadow-2xs"
              >
                {/* Photo Preview */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-pink-50 border border-pink-200 shrink-0 shadow-xs">
                  <img
                    src={slot.preview}
                    alt={slot.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Active
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-sm sm:text-base font-bold text-[#3E2723]">{slot.title}</h3>
                  <p className="text-xs text-[#BE185D] font-semibold">{slot.sub}</p>
                  <p className="text-xs text-[#6D4C41] mt-1 leading-relaxed">{slot.desc}</p>

                  <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      ref={slot.inputRef}
                      onChange={(e) => handleFileChange(slot.key, e)}
                      className="hidden"
                    />
                    <button
                      onClick={() => slot.inputRef.current?.click()}
                      className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#BE185D] hover:bg-[#9D174D] shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Same Photo from Device</span>
                    </button>
                    <span className="text-[11px] text-[#8D6E63] italic hidden sm:inline">
                      (or Drag & Drop image here)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Controls */}
          <div className="p-4 sm:p-5 bg-pink-50/60 border-t border-[#F0D0D5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-[#5D4037]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Photos are saved securely in your browser & active immediately.</span>
            </div>

            <div className="flex items-center gap-2">
              {isCustomized && (
                <button
                  onClick={resetCustomPhotos}
                  className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-100 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Generated Copies</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#3E2723] hover:bg-[#2C1810] text-white font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
