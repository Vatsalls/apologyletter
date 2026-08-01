import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminData, MessageItem } from '../types';
import { X, Mail, Eye, Clock, Shield, Sparkles, Check, Trash2, Heart } from 'lucide-react';

interface SecretInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminData: AdminData | null;
  onMarkRead?: (id: string) => void;
}

export const SecretInboxModal: React.FC<SecretInboxModalProps> = ({
  isOpen,
  onClose,
  adminData,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-amber-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FFFDF6] p-6 sm:p-8 rounded-3xl max-w-3xl w-full border-4 border-[#CA8A04] polaroid-shadow relative my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-full border border-amber-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 border-b-2 border-dashed border-amber-300 pb-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FEF08A] border-2 border-[#CA8A04] flex items-center justify-center text-2xl shrink-0">
              🔑
            </div>
            <div>
              <h3 className="font-cute text-2xl font-bold text-amber-950 flex items-center gap-2">
                Vatsal's Private Inbox & Visitor Stats
                <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-400">
                  Secret View
                </span>
              </h3>
              <p className="font-handwritten text-lg text-amber-800">
                Messages received & live visitor link stats for Vatsal 🌻
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-amber-100/60 p-4 rounded-2xl border-2 border-amber-300 flex items-center gap-4">
              <div className="p-3 bg-amber-200 rounded-xl text-amber-900">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="font-cute text-xs text-amber-800 uppercase font-bold">Total Link Visits</span>
                <p className="font-cute text-3xl font-bold text-amber-950">
                  {adminData?.visitorCount || 1} <span className="text-sm font-normal">times viewed</span>
                </p>
              </div>
            </div>

            <div className="bg-yellow-100/60 p-4 rounded-2xl border-2 border-amber-300 flex items-center gap-4">
              <div className="p-3 bg-yellow-200 rounded-xl text-amber-900">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="font-cute text-xs text-amber-800 uppercase font-bold">Target Email</span>
                <p className="font-cute text-sm font-bold text-amber-950 truncate max-w-[200px]">
                  vatsalpatelwork20@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Messages Received Section */}
          <div className="space-y-4">
            <h4 className="font-cute text-lg font-bold text-amber-900 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              Received Notes ({adminData?.messages?.length || 0})
            </h4>

            {(!adminData?.messages || adminData.messages.length === 0) ? (
              <div className="p-8 text-center bg-amber-50 rounded-2xl border border-dashed border-amber-300 font-handwritten text-2xl text-amber-800">
                No notes sent yet. When she writes a message, it will show up right here! 🌻
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {adminData.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 bg-white rounded-2xl border-2 border-amber-300 shadow-xs relative"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-cute font-bold text-amber-950 text-base flex items-center gap-1.5">
                        <span>{msg.mood || '🌻'}</span> {msg.senderName}
                      </span>
                      <span className="font-cute text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <p className="font-handwritten text-2xl text-amber-900 mt-2 whitespace-pre-wrap">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visitor Log Summary */}
          {adminData?.visitors && adminData.visitors.length > 0 && (
            <div className="mt-6 pt-4 border-t border-dashed border-amber-300">
              <h5 className="font-cute text-sm font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-700" /> Recent Link Views
              </h5>
              <div className="bg-amber-50 p-3 rounded-xl max-h-32 overflow-y-auto text-xs font-mono text-amber-900 space-y-1">
                {adminData.visitors.slice(0, 10).map((v, i) => (
                  <div key={i} className="flex justify-between border-b border-amber-200/50 pb-1">
                    <span>{new Date(v.time).toLocaleTimeString()}</span>
                    <span className="truncate max-w-[220px] opacity-70">{v.userAgent}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close button */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-cute font-bold rounded-xl shadow-xs transition-colors"
            >
              Close Private Corner 🔑
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
