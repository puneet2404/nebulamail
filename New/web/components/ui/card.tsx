import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  card?: any;
  onSelect?: (card: any) => void;
}

export function Card({ children, card, onSelect, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border bg-white shadow p-4${onSelect ? ' cursor-pointer' : ''}`}
      onClick={() => onSelect?.(card)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="font-bold text-lg mb-2">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-700">{children}</div>;
}
