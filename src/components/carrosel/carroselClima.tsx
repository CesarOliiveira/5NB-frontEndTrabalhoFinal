import { FlatList } from "react-native"
import { Clima } from "./clima"


export const CarroselClima = () => {
    const climasTest = [
        {
            temperatura: 20,
            temperaturaMaxima: 23,
            temperaturaMinima: 17,
            image: "https://openweathermap.org/img/wn/04n@2x.png",
            cidade: {
                nome: "São Paulo"
            }
        },
        {
            temperatura: 15,
            temperaturaMaxima: 21,
            temperaturaMinima: 17,
            image: "https://openweathermap.org/img/wn/04n@2x.png",
            cidade: {
                nome: "Rio de Janeiro"
            }
        },
        {
            temperatura: 19,
            temperaturaMaxima: 26,
            temperaturaMinima: 17,
            image: "https://openweathermap.org/img/wn/04n@2x.png",
            cidade: {
                nome: "Brasilia"
            }
        },
        {
            temperatura: 16,
            temperaturaMaxima: 19,
            temperaturaMinima: 17,
            image: "https://openweathermap.org/img/wn/04n@2x.png",
            cidade: {
                nome: "Rio grande do sul"
            }
        }
    ]

    return (

        <FlatList
            data={climasTest}
            renderItem={({ item }) => <Clima clima={item} />}
            horizontal={true}
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
        />

    )
}