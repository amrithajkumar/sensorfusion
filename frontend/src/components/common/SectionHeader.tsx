interface SectionHeaderProps {
  title: string;
  description?: string;
}

function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="space-y-2">

      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>

      {description && (
        <p className="max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
          {description}
        </p>
      )}

    </div>
  );
}

export default SectionHeader;