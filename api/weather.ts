import axios from 'axios'
import { apiKey } from '@/constants'

const forecastEndpoints = (params: any) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationEndpoints = (params: any) => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`

const apiCall = async (endpoint: any) => {
    const options = {
        method: 'GET',
        url: endpoint,
    }
    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const fetchForecastData = (params: any) => {
    return apiCall(forecastEndpoints(params))
}

export const fetchLocations = (params: any) => {
    return apiCall(locationEndpoints(params))
}