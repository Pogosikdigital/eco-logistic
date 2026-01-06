// src/hooks/usePhoneInput.js
import { useState, useCallback, useEffect, useMemo } from "react";

// Базовый список стран (можешь потом расширять)
const COUNTRY_LIST = [
  { iso2: "US", dialCode: "+1", name: "United States" },
  { iso2: "CA", dialCode: "+1", name: "Canada" },
  { iso2: "MX", dialCode: "+52", name: "Mexico" },
];

const findCountry = (iso2) =>
  COUNTRY_LIST.find((c) => c.iso2 === iso2) || COUNTRY_LIST[0];

export default function usePhoneInput({
  defaultIso2 = "US",
  initialValue = "",
} = {}) {
  const [country, setCountry] = useState(() => findCountry(defaultIso2));
  const [value, setValue] = useState(initialValue);

  // формат локального номера под страну
  const formatLocal = useCallback(
    (raw) => {
      const digits = raw.replace(/\D/g, "").slice(0, 10);
      if (!digits) return "";

      // US / CA маска: (XXX) XXX-XXXX
      if (country.iso2 === "US" || country.iso2 === "CA") {
        if (digits.length <= 3) return `(${digits}`;
        if (digits.length <= 6) {
          return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        }
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
          6
        )}`;
      }

      // Для остальных стран — простые группы
      if (digits.length <= 3) return digits;
      if (digits.length <= 7) {
        return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      }
      return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
    },
    [country]
  );

  const handleInputChange = useCallback(
    (nextValue) => {
      setValue(formatLocal(nextValue));
    },
    [formatLocal]
  );

  const digits = useMemo(() => value.replace(/\D/g, ""), [value]);

  const e164Phone = useMemo(() => {
    if (!digits) return "";
    return `${country.dialCode}${digits}`;
  }, [country, digits]);

  // смена страны по ISO-коду (для селекта)
  const setCountryIso2 = useCallback((iso2) => {
    if (!iso2) return;
    setCountry(findCountry(iso2.toUpperCase()));
  }, []);

  // Авто-детект страны по IP (опционально)
  useEffect(() => {
    let cancelled = false;

    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;
        const data = await res.json();
        const iso = (data.country || "").toUpperCase();
        if (!iso) return;

        const detected = findCountry(iso);
        if (!cancelled) {
          setCountry(detected);
        }
      } catch (e) {
        console.warn("Country detect failed:", e);
      }
    }

    detectCountry();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    country, // текущая страна
    countries: COUNTRY_LIST,
    inputValue: value, // что отображаем в инпуте
    handleInputChange, // onChange для инпута
    digits, // только цифры
    e164Phone, // формат для API: +1XXXXXXXXXX
    setCountryIso2, // можно вызвать из UI-селекта
  };
}
