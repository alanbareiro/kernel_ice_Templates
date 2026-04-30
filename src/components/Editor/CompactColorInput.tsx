import { Check, Copy, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CompactColorInputProps {
    label: string;
    value: string | undefined;
    onChange: (color: string) => void;
    defaultValue?: string;
    description?: string;
    inputId?: string;
}

export const CompactColorInput: React.FC<CompactColorInputProps> = ({
    label,
    value,
    onChange,
    defaultValue = '#000000',
    description,
    inputId,
}) => {
    const [copied, setCopied] = useState(false);
    const [localValue, setLocalValue] = useState<string>(value || defaultValue);

    useEffect(() => {
        if (value !== undefined && value !== localValue) {
            setLocalValue(value);
        }
    }, [value, localValue]);

    const handleColorChange = (newColor: string) => {
        setLocalValue(newColor);
        onChange(newColor);
    };

    const handleCopy = () => {
        if (localValue) {
            navigator.clipboard.writeText(localValue);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const handleReset = () => {
        if (defaultValue) {
            handleColorChange(defaultValue);
        }
    };

    const displayValue = localValue || defaultValue;
    const uniqueId = inputId || `color-${label.replace(/\s/g, '')}`;

    return (
        <div className="mb-2">
            <div className="flex items-center justify-between gap-1.5">
                <label className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 w-16 flex-shrink-0">
                    {label}
                </label>
                <div className="flex items-center gap-1 flex-1">
                    <div className="relative">
                        <div
                            className="w-5 h-5 rounded-full border border-neutral-300 dark:border-neutral-600 cursor-pointer shadow-sm hover:scale-105 transition-transform"
                            style={{ backgroundColor: displayValue }}
                            onClick={() => {
                                const input = document.getElementById(uniqueId) as HTMLInputElement;
                                if (input) input.click();
                            }}
                        />
                        <input
                            id={uniqueId}
                            type="color"
                            value={displayValue}
                            onChange={(e) => handleColorChange(e.target.value)}
                            className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
                        />
                    </div>
                    <input
                        type="text"
                        value={displayValue}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="flex-1 px-1 py-0.5 text-[9px] font-mono border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800"
                        pattern="^#[0-9A-Fa-f]{6}$"
                    />
                    <button
                        onClick={handleCopy}
                        className="p-0.5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                        title="Copiar color"
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                        title="Restablecer"
                    >
                        <RefreshCw className="w-3 h-3" />
                    </button>
                </div>
            </div>
            {description && <p className="text-[8px] text-neutral-500 mt-0.5 ml-16">{description}</p>}
        </div>
    );
};