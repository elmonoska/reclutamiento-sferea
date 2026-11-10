import type { SlotProps } from "input-otp";

export default function Slot({ char, placeholderChar, isActive }: SlotProps) {
    return (
        <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg border text-xl font-medium transition-colors ${
                isActive
                    ? "border-orange-500 text-orange-500"
                    : "border-gray-300 text-gray-400"
            }`}
        >
            {char ?? placeholderChar ?? ""}
        </div>
    );
}