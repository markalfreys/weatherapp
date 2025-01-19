
import { AxiosError } from 'axios';


export type WeatherData = {
    cod: number,
    id: number,
    name: string,
    sys: {
      country: string
    },
    main: {
        temp: number,
        humidity: number
    },
    wind:{
        speed: number
    },
    coord: {
        lon: number,
        lat: number
    },
    weather: [{
        description: string,
        icon: string
    }],
};

export type WeatherContextType = {
    weatherData: WeatherData | null;
    isLoading: boolean,
    isError: boolean,
    status: string,
    handleSetWeatherData: (w: WeatherData | null) => void
};

export interface WeatherParams {
    lat: number;
    lon: number;
    units: string
}

export interface WeatherAddInfoBoxProps {
    icon: React.ReactNode;
    value: number | undefined;
    title: string;
    type: string
}

export interface SearchResultBoxProps {
    error: Error | AxiosError | null;
    isLoading: boolean;
    searchResult: any; 
    handleSelectSearch: () => void
}

export interface DailyforecastProps {
    id: number;
    lat: number;
    lon: number;
    units: string;
}

export interface DailyforecastDayBoxProps {
    day: string,
    weatherIcon: string,
    temp: number
}

export type TemperatureUnit = 'C' | 'F';

export type TemperatureButtonProps = { 
    unit: string, 
    btnUnit: string, 
    pressFn: () => void, 
    dispalyedText: string 
}

export interface TemperatureContextProps {
    unit: TemperatureUnit;
    toggleUnit: (selectedUnit: TemperatureUnit) => void;
}

export interface FavoriteBoxProp {
    city: string, 
    handleRemoveFav: (city: string) => void, 
    handleSelectCity: (city: string) => void,
}

export type FavoriteStackParamList = {
  Favorites: undefined; 
  FavoriteCityWeatherScreen: { city: string }; 
};


export type RouteParams = {
    params: {
        city: string;
    };
};