import { cn } from "@/lib/utils" // shadcn UI utility for className merging

interface InboxZenTitleProps {
  className?: string;
}

export function InboxZenTitle({ className }: InboxZenTitleProps) {
  return (
    <h1
      className={cn(
        "text-2xl font-bold drop-shadow-lg zen-title-wave",
        className
      )}
    >
      Inbox Zen
    </h1>
  );
}

export default InboxZenTitle;
