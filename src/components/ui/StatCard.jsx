
const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  accent,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#251E2C] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#C3B1E1]/30">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#F4EFEA]/55">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#F4EFEA]">
            {value}
          </h3>
        </div>

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${accent}20`,
            color: accent,
          }}
        >
          <Icon size={23} />
        </div>
      </div>

      <p className="mt-4 text-xs text-[#F4EFEA]/40">
        {description}
      </p>
    </div>
  );
};

export default StatCard;
