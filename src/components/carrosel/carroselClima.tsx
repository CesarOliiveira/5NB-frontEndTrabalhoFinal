import { FlatList } from "react-native"
import { Clima } from "./clima"
import { useEffect, useState } from "react";
import { DB_URL } from "@/src/db/credentials";
import { getClimaByLatitudeAndLongitude } from "@/src/db/client/climaClient";


export const CarroselClima = () => {
    const [climasCidades, setClimaCidades] = useState([]);

     const cidades = [
        { nome: "São Paulo" },
        { nome: "Brasilia" },
        { nome: "Rio de Janeiro" },
    ];

    async function getClimaCidades() {
        try {
            // Cria um array de promessas, uma para cada cidade
            const promises = cidades.map(async (cidade) => {
                const response = await fetch(`${DB_URL}/api/clima/${cidade?.nome}`);

                if (!response.ok) { 
                    throw new Error(`Erro ao buscar clima para ${cidade?.nome}: ${response.statusText}`);
                }

                const data = await response.json();
                return { nome: cidade?.nome, ...data }; 
            });

            
            const todosOsClimas = await Promise.all(promises);

            
            setClimaCidades(todosOsClimas);
            console.log("Climas carregados:", todosOsClimas);

        } catch (error) {
            console.error("Erro ao carregar os climas das cidades:", error);
    
        }
    }


    useEffect(() => {
        getClimaCidades()
        console.log(climasCidades)
    }, [])


    return (

        <FlatList
            data={climasCidades}
            renderItem={({ item }) => <Clima clima={item} />}
            horizontal={true}
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
        />

    )
}