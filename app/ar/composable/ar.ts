import { distanceFromLatLonInKm } from "@/plugins/geolocation";
import { LatLng } from "react-native-maps";

export type ARInfo = typeof WALL_INFOS[number];

// vedi fortress point; init point
export const WALL_INFOS: {
  point: LatLng,
  id: number,
  name: string,
  briefDesc: string,
  images: number[],
  model: number,
  [key: string]: any
}[] = [
  {
    point: {
      latitude: 39.925806,
      longitude: 44.7415,
    },
    id: 1,
    name: 'Vedi Fortress: Lower wall',
    briefDesc: 'Vedi Fortress: Lower wall',
    model: require("@assets/models/wall/wall1.glb"),
    images: [require('@/assets/images/wall4.jpg')],
  },
  {
    point: {
      latitude: 39.925778,
      longitude: 44.741444,
    },
    id: 2,
    name: 'Vedi Fortress: Upper wall',
    briefDesc: 'Vedi Fortress: Upper wall',
    model: require("@assets/models/wall/wall2.glb"),
    images: [require('@/assets/images/wall3.jpg')],
  },
  {
    id: 3,
    point: {
      latitude: 39.9261389,
      longitude: 44.7382778,
    },
    reversed: true,
    name: 'Vedi Fortress: Lower wall From Back',
    briefDesc: 'Vedi Fortress: Lower wall From Back',
    model: require("@assets/models/wall/wall1-reverse.glb"),
    images: [require('@/assets/images/wall2.jpg')],
  }
] as const;

export const vedi_point = {
  latitude: 39.92634215565024,
  longitude: 44.74058628178656,
};

export function useARReconstruction(location?: LatLng) {
  if (__DEV__) {
    // local test
    return WALL_INFOS.at(0);
  }
  if (!location) {
    return null;
  }
  for (const wall_point of WALL_INFOS) {
    const { point } = wall_point;
    const distance = distanceFromLatLonInKm(location, point) * 1000;
    // in 10m, guide user to reconstruction;
    if (distance < 10) {
      return wall_point;
    }
  }
  return null;
}