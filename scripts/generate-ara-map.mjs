import fs from "node:fs";
import { geoPath, geoMercator, geoCentroid } from "d3-geo";
import { simplify } from "@turf/simplify";

const HIDDEN_CODES = new Set(["03", "15", "63"]);

const ARA_CODES = [
  "01", "03", "07", "15", "26", "38", "42", "43", "63", "69", "73", "74",
];

/** Lon/lat WGS84 — adresses siège & agence commerciale */
const MAP_OFFICES = [
  {
    id: "siege",
    shortLabel: "Siège",
    title: "Charbonnières-les-Bains",
    lon: 4.7492,
    lat: 45.7839,
  },
  {
    id: "agence",
    shortLabel: "Agence",
    title: "Jacob-Bellecombette · Chambéry",
    lon: 5.9228,
    lat: 45.5582,
  },
];

const geo = JSON.parse(fs.readFileSync("/tmp/depts.geojson", "utf8"));

const allFeatures = geo.features.filter((f) =>
  ARA_CODES.includes(f.properties.code)
);
const features = allFeatures.filter(
  (f) => !HIDDEN_CODES.has(f.properties.code)
);

const width = 720;
const height = 560;
const padding = 14;

const projection = geoMercator().fitExtent(
  [
    [padding, padding],
    [width - padding, height - padding],
  ],
  { type: "FeatureCollection", features }
);

const pathGen = geoPath(projection);

const paths = {};
const labels = [];

for (const f of features) {
  const code = f.properties.code;
  const simplified = simplify(f, { tolerance: 0.012, highQuality: false });
  const d = pathGen(simplified);
  if (!d) continue;
  paths[code] = d;
  const [lx, ly] = projection(geoCentroid(f));
  labels.push({
    code,
    name: f.properties.nom,
    labelX: Math.round(lx * 10) / 10,
    labelY: Math.round(ly * 10) / 10,
  });
}

const offices = MAP_OFFICES.map((o) => {
  const [x, y] = projection([o.lon, o.lat]);
  return {
    id: o.id,
    shortLabel: o.shortLabel,
    title: o.title,
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
  };
});

const payload = {
  viewBox: { width, height },
  paths,
  departments: labels,
  offices,
};

const jsonPath = new URL(
  "../src/data/ara-departments.json",
  import.meta.url
);
fs.writeFileSync(jsonPath, JSON.stringify(payload));
const bytes = fs.statSync(jsonPath).size;
console.log("Wrote", Object.keys(paths).length, "departments,", bytes, "bytes");
