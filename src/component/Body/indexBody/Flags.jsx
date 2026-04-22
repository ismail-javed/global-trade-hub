import mocData from "@data/moc_Data.json";

const flagsCategory = mocData.categories.find(
  (category) => category.category_name === "flags"
);
const flagsData = flagsCategory?.flags_list ?? [];

const Flags = () => {
  return (
    <div className="flags-strip">
      <div className="flags-strip-inner">
        <span className="flags-label">Delivering to 27+ Countries</span>

        <div className="flags-divider"></div>

        <div className="flags-track-wrap">
          <div className="flags-track">

            {/* Dynamic Flags */}
            {flagsData.map((flag) => (
              <div className="flag-item" key={flag.id}>
                <div className="flag-image-wrap">
                  <img src={flag.images?.[0] || ""} alt={flag.alt || flag.country} />
                </div>
                <span className="flag-country-name">{flag.country}</span>
              </div>
            ))}

            {/* Duplicate for seamless loop */}
            {flagsData.map((flag) => (
              <div className="flag-item" key={`dup-${flag.id}`}>
                <div className="flag-image-wrap">
                  <img src={flag.images?.[0] || ""} alt={flag.alt || flag.country} />
                </div>
                <span className="flag-country-name">{flag.country}</span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Flags;