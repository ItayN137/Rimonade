<script lang="ts">
export interface MapLocationItem {
  id: string | number
  name: string
  latitude: number
  longitude: number
}

export type MapCenter = [latitude: number, longitude: number]
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = withDefaults(
  defineProps<{
    locations: MapLocationItem[]
    selectedId?: string | number | null
    selectable?: boolean
    zoom?: number
    center?: MapCenter
    markerSymbol?: string
  }>(),
  {
    selectedId: null,
    selectable: true,
    zoom: 7,
    center: () => [0, 0],
    markerSymbol: '✚'
  }
)

const emit = defineEmits<{
  select: [location: MapLocationItem]
}>()

const mapElement = ref<HTMLElement | null>(null)
let map: L.Map | null = null
const markers = new Map<string | number, L.Marker>()

function createMarkerIcon(selected: boolean): L.DivIcon {
  const symbol = document.createElement('span')
  symbol.className = 'map-location-marker__symbol'
  symbol.textContent = props.markerSymbol

  return L.divIcon({
    className: selected
      ? 'map-location-marker map-location-marker--selected'
      : 'map-location-marker',
    html: symbol,
    iconSize: selected ? [46, 46] : [38, 38],
    iconAnchor: selected ? [23, 23] : [19, 19]
  })
}

function initializeMap(): void {
  if (map || !mapElement.value) {
    return
  }

  map = L.map(mapElement.value, { zoomControl: true }).setView(props.center, props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
}

function clearMarkers(): void {
  markers.forEach(marker => marker.remove())
  markers.clear()
}

function renderMarkers(): void {
  const activeMap = map

  if (!activeMap) {
    return
  }

  clearMarkers()

  props.locations.forEach((location) => {
    const marker = L.marker(
      [location.latitude, location.longitude],
      {
        icon: createMarkerIcon(location.id === props.selectedId),
        title: location.name
      }
    )
      .addTo(activeMap)
      .bindTooltip(location.name, { direction: 'top', offset: [0, -18] })
      .on('click', () => {
        if (props.selectable) {
          emit('select', location)
        }
      })

    markers.set(location.id, marker)
  })
}

function updateMarkerSelection(): void {
  markers.forEach((marker, locationId) => {
    marker.setIcon(createMarkerIcon(locationId === props.selectedId))
  })
}

onMounted(() => {
  initializeMap()
  renderMarkers()
})

watch(() => props.locations, renderMarkers, { deep: true })
watch([() => props.selectedId, () => props.markerSymbol], updateMarkerSelection)
watch([() => props.center, () => props.zoom], () => {
  map?.setView(props.center, props.zoom)
}, { deep: true })

onBeforeUnmount(() => {
  clearMarkers()
  map?.remove()
  map = null
})
</script>

<template>
  <div ref="mapElement" class="map-location"></div>
</template>

<style scoped>
.map-location {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  direction: ltr;
}

:deep(.map-location-marker) {
  display: grid;
  place-items: center;
  border: 3px solid white;
  border-radius: 50% 50% 50% 0;
  background: #bd4167;
  color: white;
  box-shadow: 0 4px 12px rgba(72, 18, 35, 0.35);
  transform: rotate(-45deg);
}

:deep(.map-location-marker__symbol) {
  transform: rotate(45deg);
  font-size: 1.15rem;
  line-height: 1;
}

:deep(.map-location-marker--selected) {
  border-color: #fff4b0;
  background: #811037;
  box-shadow: 0 0 0 5px rgba(173, 23, 70, 0.25), 0 5px 15px rgba(72, 18, 35, 0.4);
}
</style>
