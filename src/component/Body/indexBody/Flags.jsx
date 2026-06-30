import { useEffect, useState } from "react";

const Flags = () => {
  const [flagsData, setFlagsData] = useState([]);
  const [label, setLabel] = useState("Delivering to 27+ Countries");

  useEffect(() => {
    fetch("/api/flags.json")
      .then((res) => res.json())
      .then((data) => {
        setFlagsData(data.flags ?? []);
        if (data.label) setLabel(data.label);
      })
      .catch(() => setFlagsData([]));
  }, []);

  return (
    <div className="flags-strip">
      <div className="flags-strip-inner">
        <span className="flags-label">{label}</span>

        <div className="flags-divider"></div>

        <div className="flags-track-wrap">
          <div className="flags-track">
            {flagsData.map((flag) => (
              <div className="flag-item" key={flag.id}>
                <div className="flag-image-wrap">
                  <img src={flag.images?.[0] || ""} alt={flag.alt || flag.country} />
                </div>
                <span className="flag-country-name">{flag.country}</span>
              </div>
            ))}

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
