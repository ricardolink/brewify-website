"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import type { FoundingMember } from "@/types/founding";
import { useLanguage } from "@/context/LanguageContext";

const SITE_URL = "https://brewifycoffee.com";

interface MemberDetailModalProps {
  member: FoundingMember | null;
  onClose: () => void;
  onOrder: (member: FoundingMember) => void;
  onTransfer: (member: FoundingMember, newOwner: string) => void;
}

export function MemberDetailModal({
  member,
  onClose,
  onOrder,
  onTransfer,
}: MemberDetailModalProps) {
  const { t } = useLanguage();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [showTransferInput, setShowTransferInput] = useState(false);
  const [transferValue, setTransferValue] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [showEarningsHelp, setShowEarningsHelp] = useState(false);

  if (!member) return null;

  const dateCrafted = member.createdAt
    ? new Date(member.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "—";
  const owner = member.owner ?? member.instagram ?? "Anonymous";
  const maxPointsForBar = Math.max(member.pointsEarned, 100);
  const progressPct = Math.min(100, (member.pointsEarned / maxPointsForBar) * 100);

  const handleOrder = async () => {
    setOrderLoading(true);
    try {
      await onOrder(member);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleTransferConfirm = async () => {
    if (!transferValue.trim()) return;
    setTransferLoading(true);
    try {
      await onTransfer(member, transferValue.trim());
      setShowTransferInput(false);
      setTransferValue("");
    } finally {
      setTransferLoading(false);
    }
  };

  const handleShareDownload = async () => {
    if (!shareCardRef.current) return;
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `brewify-the100-${member.number}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      >
        <button
          type="button"
          aria-label={t.modal.close}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto bg-brew-black border-t md:border border-brew-ivory/20 rounded-t-2xl md:rounded-2xl max-w-[520px] shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-end bg-brew-black/95 backdrop-blur px-4 py-3 border-b border-zinc-900/80">
            <button
              type="button"
              onClick={onClose}
              className="text-brew-warm-gray hover:text-brew-ivory transition-colors text-sm uppercase tracking-widest"
            >
              {t.modal.close}
            </button>
          </div>

          <div className="p-6 space-y-8">
            <p className="text-[11px] text-brew-warm-gray leading-relaxed">
              {t.modal.amazonNote}
            </p>

            {/* Header */}
            <div>
              <p className="font-mono text-3xl md:text-4xl text-brew-ivory">{member.number}</p>
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray mt-1">
                {t.modal.foundingMember}
              </p>
            </div>

            {/* Blend details */}
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-medium">{member.blendName}</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-brew-warm-gray">
                {member.roastLevel} · #{member.number}
              </p>
              <div className="flex flex-wrap gap-2">
                {member.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-2.5 py-1 text-[11px] uppercase tracking-wider border border-brew-ivory/30 rounded-full text-brew-ivory/90"
                  >
                    {note}
                  </span>
                ))}
              </div>
              {member.emotionalDescription && (
                <p className="text-sm text-brew-ivory/90 leading-relaxed pt-1">
                  {member.emotionalDescription}
                </p>
              )}
              {member.instagram && (
                <p className="text-xs text-brew-warm-gray">{member.instagram}</p>
              )}
              <p className="text-[11px] text-brew-warm-gray">
                {t.modal.crafted} {dateCrafted}
              </p>
            </div>

            {/* Revenue */}
            <div className="border border-zinc-800/80 rounded-lg p-5 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">
                {t.modal.blendRevenue}
              </p>
              <p className="text-3xl md:text-4xl font-medium text-brew-ivory">
                {member.pointsEarned} pts
              </p>
              <p className="text-sm text-brew-warm-gray">
                {member.ordersCount} {t.modal.orders}
              </p>
              <p className="text-[11px] text-brew-warm-gray">{t.modal.redeemable}</p>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brew-ivory/80 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="space-y-2 text-[11px] text-brew-warm-gray">
                <p>{t.modal.pointValue}</p>
                <p>{t.modal.minRedemption}</p>
                <button
                  type="button"
                  onClick={() => setShowEarningsHelp((s) => !s)}
                  className="text-left underline underline-offset-2 hover:text-brew-ivory transition-colors"
                >
                  {t.modal.howEarnings}
                </button>
                {showEarningsHelp && (
                  <p className="pt-2 leading-relaxed">{t.modal.earningsExplain}</p>
                )}
              </div>
            </div>

            {/* Ownership */}
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">
                {t.modal.currentOwner}
              </p>
              <p className="text-sm">{owner}</p>
              {!showTransferInput ? (
                <button
                  type="button"
                  onClick={() => setShowTransferInput(true)}
                  className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-4 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
                >
                  {t.modal.transferBtn}
                </button>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder={t.modal.transferPlaceholder}
                    value={transferValue}
                    onChange={(e) => setTransferValue(e.target.value)}
                    className="w-full bg-transparent border border-zinc-800 px-3 py-2 text-sm outline-none focus:border-brew-ivory/80 placeholder:text-zinc-600"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleTransferConfirm}
                      disabled={transferLoading || !transferValue.trim()}
                      className="rounded-full border border-brew-ivory px-4 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-50"
                    >
                      {transferLoading ? t.modal.confirming : t.modal.confirm}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowTransferInput(false); setTransferValue(""); }}
                      className="rounded-full border border-zinc-700 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-brew-warm-gray hover:text-brew-ivory transition-colors"
                    >
                      {t.modal.cancel}
                    </button>
                  </div>
                </div>
              )}
              <p className="text-[10px] text-brew-warm-gray leading-relaxed">
                {t.modal.transferWarning}
              </p>
            </div>

            {/* Order */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleOrder}
                disabled={orderLoading}
                className="w-full inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {orderLoading ? t.modal.ordering : t.modal.orderBtn}
              </button>
              <p className="text-[10px] text-brew-warm-gray text-center">{t.modal.earnNote}</p>
            </div>

            {/* Share */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleShareDownload}
                className="w-full inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
              >
                {t.modal.share}
              </button>
              <div
                ref={shareCardRef}
                className="absolute -left-[9999px] w-[320px] bg-brew-black border border-brew-warm-gray/40 rounded-lg p-5 text-brew-ivory"
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">
                  Brewify Coffee — The 100
                </p>
                <p className="font-mono text-2xl mt-2">{member.number}</p>
                <p className="text-lg font-medium mt-1">{member.blendName}</p>
                <p className="text-xs text-brew-warm-gray mt-1">{member.flavorNotes.join(" · ")}</p>
                {member.instagram && <p className="text-xs mt-2">{member.instagram}</p>}
                <p className="text-[9px] uppercase tracking-[0.2em] text-brew-warm-gray mt-3">
                  {SITE_URL}/the-100
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
