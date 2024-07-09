import { GeoPoint } from "@/models";

export function getMapThirdLink(cord: GeoPoint) {
  return `https://google.com/maps/place/${cord.latitude}+${cord.longitude}`;
}