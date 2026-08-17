import { onMounted, ref, type Ref } from 'vue'
import { loadMockData, type MockData } from '@/services/mockDataService'

type DirectMockDataSection = Exclude<keyof MockData, 'soldierAttributes'>

export type MockDataSection = DirectMockDataSection | 'soldiers' | 'soldierFields'

type MockDataSectionValue<K extends MockDataSection> =
  K extends 'soldiers'
  ? MockData['soldierAttributes']['soldiersDetails']
  : K extends 'soldierFields'
  ? MockData['soldierAttributes']['soldierFields']
  : K extends DirectMockDataSection
  ? MockData[K]
  : never

export type RequestedMockData<K extends readonly MockDataSection[]> = {
  [P in K[number]]: MockDataSectionValue<P>
}

function getSection<K extends MockDataSection>(mockData: MockData, section: K): MockDataSectionValue<K> {
  if (section === 'soldiers') {
    return mockData.soldierAttributes.soldiersDetails as MockDataSectionValue<K>
  }

  if (section === 'soldierFields') {
    return mockData.soldierAttributes.soldierFields as MockDataSectionValue<K>
  }

  return mockData[section as DirectMockDataSection] as MockDataSectionValue<K>
}

export function useMockDataSections<const K extends readonly MockDataSection[]>(sections: K): {
  data: Ref<RequestedMockData<K> | null>
  loading: Ref<boolean>
  error: Ref<unknown | null>
} {
  const data = ref<RequestedMockData<K> | null>(null) as Ref<RequestedMockData<K> | null>
  const loading = ref(true)
  const error = ref<unknown | null>(null)

  onMounted(async () => {
    try {
      const mockData = await loadMockData()
      const requestedData = Object.fromEntries(
        sections.map(section => [section, getSection(mockData, section)])
      ) as RequestedMockData<K>

      data.value = requestedData
    }
    catch (caughtError: unknown) {
      error.value = caughtError
    }
    finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
