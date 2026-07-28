import { useState, useEffect } from "react"
import type { BuilderCatalog, Product, Plan, Protection } from "../types"

const BASE_URL = "https://bundlebuilder-xiu5.onrender.com"

async function fetchAll(): Promise<BuilderCatalog> {
  const [cameras, sensors, accessories, plans, protections] = await Promise.all([
    fetch(`${BASE_URL}/cameras`).then(r => r.json()) as Promise<Product[]>,
    fetch(`${BASE_URL}/sensors`).then(r => r.json()) as Promise<Product[]>,
    fetch(`${BASE_URL}/accessories`).then(r => r.json()) as Promise<Product[]>,
    fetch(`${BASE_URL}/plans`).then(r => r.json()) as Promise<Plan[]>,
    fetch(`${BASE_URL}/protections`).then(r => r.json()) as Promise<Protection[]>,
  ])
  return { cameras, sensors, accessories, plans, protections }
}

export function useBuilderCatalog(): {
  catalog: BuilderCatalog | null
  isLoading: boolean
  error: string | null
} {
  const [catalog, setCatalog] = useState<BuilderCatalog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    fetchAll()
      .then(data => {
        if (!cancelled) {
          setCatalog(data)
          setIsLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load catalog")
          setIsLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { catalog, isLoading, error }
}
