import { shallowRef } from 'vue'

export interface MockUser {
  username: string
  password: string
  fullName: string
}

export type SoldierFieldValue = string | number | boolean | null

export interface Soldier {
  personalNumber: string
  fullName: string
  gender: string
  age: number
  profile: number
  [key: string]: SoldierFieldValue
}

export interface SoldierField {
  label: string
  key: string
}

export interface SoldierAttributes {
  soldierFields: SoldierField[]
  soldiersDetails: Soldier[]
}

export interface SeverityLevel {
  name: string
  color: string
}

export interface Hospital {
  id: number
  name: string
  city: string
  address: string
  location: {
    latitude: number
    longitude: number
  }
  distanceFromCurrentLocationKm: number
}

export interface InfoField {
  label: string
  key: string
  suffix?: string
}

export interface EvacuationData {
  personalNumber: string
  soldier: Soldier | null
  injuryType: string
  severity: string
  notes: string
}

export interface CurrentEvacuationData extends EvacuationData {
  selectedHospital?: Hospital
}

export interface MockData {
  users: MockUser[]
  soldierAttributes: SoldierAttributes
  injuryTypes: string[]
  severityLevels: SeverityLevel[]
  hospitals: Hospital[]
  hospitalFields: InfoField[]
  evacuationSummaryFields: InfoField[]
  evacuationData: EvacuationData
}

let mockDataRequest: Promise<MockData> | null = null
const currentEvacuationData = shallowRef<CurrentEvacuationData | null>(null)

async function requestMockData(): Promise<MockData> {
  const response = await fetch('/mockdata.json')

  if (!response.ok) {
    throw new Error(`Unable to load mock data (${response.status})`)
  }

  return response.json() as Promise<MockData>
}

export function loadMockData(): Promise<MockData> {
  if (!mockDataRequest) {
    mockDataRequest = requestMockData().catch((error: unknown) => {
      mockDataRequest = null
      throw error
    })
  }

  return mockDataRequest
}

export function setCurrentEvacuationData(evacuationData: EvacuationData): void {
  currentEvacuationData.value = evacuationData
}

export function getCurrentEvacuationData(): CurrentEvacuationData | null {
  return currentEvacuationData.value
}

export function confirmEvacuationHospital(hospital: Hospital): void {
  if (currentEvacuationData.value) {
    currentEvacuationData.value = {
      ...currentEvacuationData.value,
      selectedHospital: hospital
    }
  }
}
