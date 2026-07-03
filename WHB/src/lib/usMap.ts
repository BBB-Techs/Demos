import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import topology from "@/data/us-states-10m.json";
import { territory } from "@/lib/content";

const WIDTH = 960;
const HEIGHT = 600;

const NASHVILLE: [number, number] = [-86.7816, 36.1627];

const servedNames = new Set<string>(
  territory.map((t) => (t.includes("Florida") ? "Florida" : t)),
);

const topo = topology as unknown as Topology;
const statesGeo = feature(
  topo,
  topo.objects.states as GeometryCollection,
) as unknown as {
  features: Array<{
    id: string;
    properties: { name: string };
    geometry: unknown;
  }>;
};

const projection = geoAlbersUsa().fitSize(
  [WIDTH, HEIGHT],
  statesGeo as never,
);
const path = geoPath(projection);

export const mapViewBox = `0 0 ${WIDTH} ${HEIGHT}`;

export const statePaths = statesGeo.features
  .map((f) => ({
    id: f.id,
    name: f.properties.name,
    d: path(f as never) ?? "",
    served: servedNames.has(f.properties.name),
  }))
  .filter((s) => s.d);

const nashvillePoint = projection(NASHVILLE);
export const hqPoint = nashvillePoint
  ? { x: nashvillePoint[0], y: nashvillePoint[1] }
  : null;
