import React, { useState } from 'react';

interface ComboboxInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const ComboboxInput: React.FC<ComboboxInputProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder,
}) => {
    const [isCustom, setIsCustom] = useState(!options.some(opt => opt.value === value));

    return (
        <div className="mb-2">
            <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 block mb-1">{label}</label>
            <div className="flex gap-2">
                <select
                    className="flex-1 px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    value={isCustom ? '__custom__' : value}
                    onChange={(e) => {
                        if (e.target.value === '__custom__') {
                            setIsCustom(true);
                            onChange('');
                        } else {
                            setIsCustom(false);
                            onChange(e.target.value);
                        }
                    }}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                    <option value="__custom__">✏️ Personalizado...</option>
                </select>
                {isCustom && (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder || "https://... o #seccion"}
                        className="flex-1 px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    />
                )}
            </div>
        </div>
    );
};