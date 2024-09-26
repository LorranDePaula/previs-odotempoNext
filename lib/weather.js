export async function fetchCityCoordinates(city){
    const apiKey = '8212368e1712730a0e83c612c9c42b65'
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
        const res = await fetch(geocodeUrl);
        if (!res.ok){
            throw new Error('Cidade não encontrada');
        }
        const [cityData] = await res.json();
        if (!cityData){
            throw new Error('Dados da cidade não encontrados');
        }
        return { lat:cityData.lat, lon: cityData.lon };
    } catch (error){
            console.error('Erro ao buscar coordenadasa da cidade:', error);
            return null;
        }
    }

export async function fetchCurrentWeather(lat, lon){
    const apiKey = '8212368e1712730a0e83c612c9c42b65'
    const CurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(CurrentWeatherUrl);
        if (!res.ok){
            throw new Error('Erro ao buscar temperatura atual');
        }
        const currentWeatherData = await res.json();
        return currentWeatherData;
    } catch (error){
            console.error('Erro ao buscar temperatura atual:', error);
            return null;
        }
    }

    export async function fetchWeatherForecast(lat, lon){
        const apiKey = '8212368e1712730a0e83c612c9c42b65'
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
        try {
            const res = await fetch(forecastUrl);
            if (!res.ok){
                throw new Error('Erro ao buscar dados da previsão do tempo');
            }
            const forecastData = await res.json();
            return forecastData;
        } catch (error){
                console.error('Erro ao buscar dados da previsão do tempo:', error);
                return null;
            }
        }

        export async function fetchWeatherData(city) {
            const coordinates = await fetchCityCoordinates(city);
            if (!coordinates) return null;

            const [currentWeather, forecast] = await Promise.all([
                fetchCurrentWeather(coordinates.lat, coordinates.lon),
                fetchWeatherForecast(coordinates.lat, coordinates.lon),
            ]);

            if (!currentWeather || !forecast) return null;

            return { currentWeather, forecast };
        }