"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

/**
 * Simple toast for admin panel. Auto-dismisses after 4 seconds.
 * @param {boolean} visible
 * @param {string} message
 * @param {function} onClose
 * @param {'warning'|'error'} variant - warning (amber), error (red)
 */
export default function Toast({ visible, message, onClose, variant = "warning" }) {
  useEffect(() => {
    if (!visible || !message) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [visible, message, onClose]);

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-20 right-4 z-[100] max-w-sm"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${
              variant === "error"
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
                : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200"
            }`}
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
