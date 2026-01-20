// src/hooks/usePhoneInput.js
import { useState, useCallback, useMemo } from "react";

// Базовый список стран (можешь потом расширять)
const COUNTRY_LIST = [
  { iso2: "US", dialCode: "+1", name: "United States", maxDigits: 10 },
  { iso2: "CA", dialCode: "+1", name: "Canada", maxDigits: 10 },
  { iso2: "MX", dialCode: "+52", name: "Mexico", maxDigits: 10 },
];

const findCountry = (iso2) =>
  COUNTRY_LIST.find((c) => c.iso2 === iso2) || COUNTRY_LIST[0];

function onlyDigits(raw) {
  return String(raw || "").replace(/\D/g, "");
}

function normalizeForCountry(countryIso2, rawDigits) {
  let d = rawDigits;

  // Если человек вставил +1XXXXXXXXXX или 1XXXXXXXXXX — уберём ведущую 1 для US/CA
  if ((countryIso2 === "US" || countryIso2 === "CA") && d.length > 10) {
    if (d.startsWith("1")) d = d.slice(1);
  }

  return d;
}

export default function usePhoneInput({ defaultIso2 = "US", initialValue = "" } = {}) {
  const [country, setCountry] = useState(() => findCountry(defaultIso2));
  const [value, setValue] = useState(initialValue);

  const maxDigits = country.maxDigits || 15;

  // формат локального номера под страну
  const formatLocal = useCallback(
    (raw) => {
      const rawDigits = onlyDigits(raw);
      let digits = normalizeForCountry(country.iso2, rawDigits).slice(0, maxDigits);

      if (!digits) return "";

      // US / CA маска: (XXX) XXX-XXXX
      if (country.iso2 === "US" || country.iso2 === "CA") {
        if (digits.length <= 3) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }

      // Для остальных стран — простые группы
      if (digits.length <= 3) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
    },
    [country.iso2, maxDigits]
  );

  const handleInputChange = useCallback(
    (nextValue) => {
      setValue(formatLocal(nextValue));
    },
    [formatLocal]
  );

  const digits = useMemo(() => {
    const d = onlyDigits(value);
    return normalizeForCountry(country.iso2, d).slice(0, maxDigits);
  }, [value, country.iso2, maxDigits]);

  const e164Phone = useMemo(() => {
    if (!digits) return "";
    // dialCode уже содержит "+"
    return `${country.dialCode}${digits}`;
  }, [country.dialCode, digits]);

  // смена страны по ISO-коду (для селекта)
  const setCountryIso2 = useCallback((iso2) => {
    if (!iso2) return;
    setCountry(findCountry(String(iso2).toUpperCase()));
  }, []);

  // ✅ чтобы Contact мог сбрасывать поле после отправки
  const setInputValue = useCallback((next) => {
    setValue(formatLocal(next));
  }, [formatLocal]);

  return {
    country,
    countries: COUNTRY_LIST,
    inputValue: value,
    handleInputChange,
    digits,
    e164Phone,
    setCountryIso2,
    setInputValue,
  };
}
