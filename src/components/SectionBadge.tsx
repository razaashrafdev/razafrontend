const SectionBadge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs tracking-wide mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
    {text}
  </span>
);

export default SectionBadge;
