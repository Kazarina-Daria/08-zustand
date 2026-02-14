"use client";

import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const router = useRouter();
  const handleClose = useMemo(() => {
    return onClose || (() => router.back());
  }, [onClose, router]);
  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "auto";
    };
  }, [handleClose]);

  if (!modalRoot) return null;
  const backDropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={backDropClick}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
