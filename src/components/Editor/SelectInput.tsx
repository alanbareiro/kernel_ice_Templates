import React from 'react';

interface SelectInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange, options }) => {
    return (
        <div className="mb-2">
            <label className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 block mb-0.5">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-1.5 py-0.5 text-[10px] border rounded-lg bg-white dark:bg-neutral-800"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
};