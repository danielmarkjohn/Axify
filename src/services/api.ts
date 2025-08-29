
const API_BASE_URL = 'https://api.axsphere.in/api' 

export interface ApiAppConfig {
  title: string
  adminPassword: string
  categories: string[]
  // Add other config fields as needed
}

export const apiService = {
  async getAppConfig(): Promise<ApiAppConfig> {
    const response = await fetch(`${API_BASE_URL}/app-configs/axify-store`)
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.statusText}`)
    }
    return response.json()
  }
}