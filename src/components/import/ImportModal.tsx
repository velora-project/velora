"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Link, Type, Loader2, Sparkles, Upload } from "lucide-react";
import { generateCardsFromText } from "@/lib/ai";
import { addImport } from "@/lib/storage";
import type { FeedCard, ImportedContent } from "@/types";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardsGenerated: (cards: FeedCard[]) => void;
}

type ImportTab = "text" | "url" | "file";

export function ImportModal({
  isOpen,
  onClose,
  onCardsGenerated,
}: ImportModalProps) {
  const [tab, setTab] = useState<ImportTab>("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadingSteps = [
    "Extracting key concepts…",
    "Structuring topics…",
    "Generating quiz cards…",
    "Creating mini-games…",
    "Finalizing your feed…",
  ];

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
    };
    reader.readAsText(file);
  }, [title]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleSubmit = async () => {
    const rawText =
      tab === "text" ? text : tab === "url" ? url : fileContent;
    const finalTitle =
      title || (tab === "url" ? url : tab === "file" ? fileName : "My Notes");

    if (!rawText.trim()) return;

    setIsLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((s) => Math.min(s + 1, loadingSteps.length - 1));
    }, 800);

    try {
      const cards = await generateCardsFromText(rawText, finalTitle);

      const imported: ImportedContent = {
        id: `import_${Date.now()}`,
        title: finalTitle,
        rawText,
        type: tab === "url" ? "url" : tab === "file" ? "file" : "text",
        timestamp: Date.now(),
      };
      addImport(imported);

      onCardsGenerated(cards);
      onClose();
      setText("");
      setUrl("");
      setTitle("");
      setFileName("");
      setFileContent("");
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const tabs: { id: ImportTab; label: string; icon: React.ReactNode }[] = [
    { id: "text", label: "Text", icon: <Type size={14} /> },
    { id: "url", label: "URL", icon: <Link size={14} /> },
    { id: "file", label: "File", icon: <FileText size={14} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-4 bottom-0 z-50 mx-auto max-w-lg rounded-t-3xl pb-safe sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
            style={{
              background: "rgba(13,13,26,0.97)",
              border: "1px solid rgba(124,58,237,0.2)",
              boxShadow:
                "0 0 60px rgba(124,58,237,0.15), 0 24px 64px rgba(0,0,0,0.6)",
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Loading overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 rounded-3xl"
                  style={{ background: "rgba(13,13,26,0.97)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #7c3aed, #06b6d4, transparent)",
                      }}
                    />
                    <div className="relative h-14 w-14 rounded-full bg-velora-dark" />
                  </motion.div>
                  <div className="flex flex-col items-center gap-2">
                    <Sparkles size={18} className="text-velora-purple-light" />
                    <p className="text-sm font-medium text-velora-text">
                      {loadingSteps[loadingStep]}
                    </p>
                    <p className="text-xs text-velora-muted">
                      AI is generating your learning feed
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2
                    className="text-lg font-bold text-velora-text"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Import Learning Material
                  </h2>
                  <p className="text-xs text-velora-muted mt-0.5">
                    AI will turn it into an interactive feed
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-velora-border text-velora-muted hover:text-velora-text transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Title input */}
              <input
                type="text"
                placeholder="Topic title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4 w-full rounded-xl border border-velora-border bg-velora-dark px-4 py-2.5 text-sm text-velora-text placeholder:text-velora-muted outline-none focus:border-velora-purple transition-colors"
              />

              {/* Tabs */}
              <div className="mb-4 flex rounded-xl bg-velora-dark p-1">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
                      tab === t.id
                        ? "bg-velora-card text-velora-text shadow-sm"
                        : "text-velora-muted hover:text-velora-text"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Content area */}
              {tab === "text" && (
                <textarea
                  placeholder="Paste your notes, textbook excerpts, or any study material…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={7}
                  className="w-full resize-none rounded-xl border border-velora-border bg-velora-dark px-4 py-3 text-sm text-velora-text placeholder:text-velora-muted outline-none focus:border-velora-purple transition-colors leading-relaxed"
                />
              )}

              {tab === "url" && (
                <div className="flex flex-col gap-3">
                  <input
                    type="url"
                    placeholder="https://en.wikipedia.org/wiki/…"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full rounded-xl border border-velora-border bg-velora-dark px-4 py-3 text-sm text-velora-text placeholder:text-velora-muted outline-none focus:border-velora-purple transition-colors"
                  />
                  <p className="text-xs text-velora-muted">
                    Paste a Wikipedia article, blog post, or any public web page
                  </p>
                </div>
              )}

              {tab === "file" && (
                <div
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-10 transition-colors ${
                    isDragging
                      ? "border-velora-purple bg-velora-purple/5"
                      : "border-velora-border bg-velora-dark hover:border-velora-purple/50"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".txt,.md,.csv"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                    }}
                  />
                  <Upload size={28} className="text-velora-muted" />
                  {fileName ? (
                    <p className="text-sm font-medium text-velora-purple-light">
                      {fileName}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-velora-text">
                        Drop a file or click to browse
                      </p>
                      <p className="text-xs text-velora-muted">.txt, .md, .csv</p>
                    </>
                  )}
                </div>
              )}

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  (tab === "text" && !text.trim()) ||
                  (tab === "url" && !url.trim()) ||
                  (tab === "file" && !fileContent.trim())
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.3)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )}
                {isLoading ? "Generating…" : "Generate Learning Feed"}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
