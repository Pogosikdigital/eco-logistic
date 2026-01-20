// src/components/FeedbackPopup.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/feedback-popup.css";
import { getLeadContext } from "../utils/sourceMapper";

const STORAGE_KEY = "ecohub_feedback_popup_v2";
const SCROLL_THRESHOLD = 0.4; // 40%

const initialForm = {
  fullName: "",
  phone: "",
};

function validatePhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length < 10) return "Phone number should contain at least 10 digits.";
  return "";
}

export default function FeedbackPopup() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);

  // запоминаем реальный скролл при срабатывании
  const triggeredScrollRef = useRef(null);

  const alreadyDone = useMemo(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }, []);

  const validateField = (name, value) => {
    const v = String(value || "").trim();

    if (name === "fullName") {
      if (!v) return "Please enter your full name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      return "";
    }

    if (name === "phone") {
      if (!v) return "Please enter your phone number.";
      return validatePhone(v);
    }

    return "";
  };

  const validateForm = (data) => {
    const next = {};
    ["fullName", "phone"].forEach((k) => {
      const err = validateField(k, data[k]);
      if (err) next[k] = err;
    });
    return next;
  };

  const persistDontShow = () => {
    if (!dontShow) return;
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  const resetState = () => {
    setSuccess(false);
    setIsSubmitting(false);
    setSubmitError("");
    setTouched({});
    setErrors({});
    setForm(initialForm);
    triggeredScrollRef.current = null;
  };

  const close = () => {
    // ✅ закрываем всегда, без условий
    persistDontShow();
    setOpen(false);

    // сброс после небольшой анимации (если есть)
    setTimeout(() => resetState(), 180);
  };

  // show only on Home + only after 40% scroll
  useEffect(() => {
    if (!isHome) {
      setOpen(false);
      return;
    }
    if (alreadyDone) return;
    if (open) return;
    if (success) return;

    let raf = 0;
    let activated = false;

    const calcProgress = () => {
      const doc = document.documentElement;
      const total = (doc.scrollHeight - window.innerHeight) || 1;
      const y = window.scrollY || 0;
      return y / total;
    };

    const onScroll = () => {
      if (activated) return;
      if (raf) return;

      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const p = calcProgress();

        if (p >= SCROLL_THRESHOLD) {
          activated = true;

          // ✅ фиксируем реальный % скролла
          triggeredScrollRef.current = Math.max(0, Math.min(100, Math.round(p * 100)));

          setOpen(true);
        }
      });
    };

    // run once (если человек уже проскроллил)
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [alreadyDone, isHome, open, success]);

  // focus + lock scroll + ESC
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => firstInputRef.current?.focus(), 60);

    const onKey = (e) => {
      // ✅ ESC всегда закрывает
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onBackdropClick = (e) => {
    // ✅ клик по затемнению закрывает
    if (e.target === e.currentTarget) close();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((p) => ({ ...p, [name]: err || undefined }));
    }

    setSubmitError("");
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const err = validateField(name, value);
    setErrors((p) => ({ ...p, [name]: err || undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const found = validateForm(form);
    setErrors(found);
    setTouched({ fullName: true, phone: true });

    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      dialogRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = getLeadContext({
        source: "scroll-popup",
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        phoneDigits: form.phone.replace(/\D/g, ""),
        scrollPercent: triggeredScrollRef.current ?? Math.round(SCROLL_THRESHOLD * 100),
      });

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        // ignore
      }

      if (!res.ok || (data && data.ok === false)) {
        throw new Error(data?.error || `send_failed_${res.status}`);
      }

      // ✅ после успешной отправки — не показывать снова
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }

      setSuccess(true);
    } catch (err) {
      console.error("Popup lead submit error:", err);
      setSubmitError("We couldn't send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fp-overlay" role="presentation" onMouseDown={onBackdropClick}>
      <div
        className="fp-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fp-title"
        aria-describedby="fp-desc"
      >
        <div className="fp-glow" />

        {/* ✅ X closes always */}
        <button className="fp-close" type="button" onClick={close} aria-label="Close popup">
          ✕
        </button>

        {!success ? (
          <>
            <div className="fp-head">
              <span className="fp-badge">Quick contact</span>
              <h2 id="fp-title" className="fp-title">
                Want a faster quote?
              </h2>
              <p id="fp-desc" className="fp-subtitle">
                Leave your details — a coordinator will contact you shortly.
              </p>
            </div>

            {submitError && (
              <p className="fp-error-global" aria-live="assertive">
                {submitError}
              </p>
            )}

            <form className="fp-form" onSubmit={onSubmit} noValidate>
              <div className="fp-grid fp-grid--2">
                <div className="fp-field">
                  <label htmlFor="fp-fullName">Full name</label>
                  <input
                    ref={firstInputRef}
                    id="fp-fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Carter"
                    value={form.fullName}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fp-fullName-err" : undefined}
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <span id="fp-fullName-err" className="fp-field-error">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="fp-field">
                  <label htmlFor="fp-phone">Phone</label>
                  <input
                    id="fp-phone"
                    name="phone"
                    type="tel"
                    placeholder="(650) 999-9660"
                    value={form.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "fp-phone-err" : undefined}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <span id="fp-phone-err" className="fp-field-error">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="fp-foot">
                <label className="fp-check">
                  <input
                    type="checkbox"
                    checked={dontShow}
                    onChange={(e) => setDontShow(e.target.checked)}
                  />
                  <span>Don’t show again</span>
                </label>

                <button className="fp-btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send ▸"}
                </button>
              </div>

              <p className="fp-note">We’ll contact you about your request. No spam.</p>
            </form>
          </>
        ) : (
          <div className="fp-success" role="status" aria-live="polite">
            <span className="fp-success-badge">✅ Sent!</span>
            <h3 className="fp-success-title">We received your details</h3>
            <p className="fp-success-text">A coordinator will contact you soon.</p>
            <div className="fp-success-actions">
              <button className="fp-btn" type="button" onClick={close}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
