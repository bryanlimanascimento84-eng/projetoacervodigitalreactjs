/*
  3. Atenção ao Frontend (React)
Não se esqueça que o seu Mapa no React também precisa de pacotes específicos para desenhar o Brasil na tela. Caso ainda não tenha instalado na raiz do projeto (ou na pasta do front), execute:

Bash
npm install react-leaflet leaflet react-router-dom
*/
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

export default function MapPageBD() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const [erroMensagem, setErroMensagem] = useState(null); // Estado para a mensagem de erro
  useEffect(() => {
      const carregarDados = async () => {
        try {
          setErroMensagem(null); // Limpa erros anteriores
          
          const response = await fetch('http://localhost:3001/api/locations');

          if (!response.ok) {
            // Trata erros HTTP (ex: 404, 500)
            throw new Error(`Erro do servidor: ${response.status}. Verifique o backend.`);
          }

          const data = await response.json();
          setLocations(data);

        } catch (err) {
          console.error("Erro capturado:", err);
          
          // Mensagem específica para quando o servidor está desligado (TypeError)
          if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
            setErroMensagem("O servidor backend está offline. Por favor, execute 'cd backend e node server.js' em um novo terminal.");
          } else {
            setErroMensagem(err.message);
          }
        }
      };

      carregarDados();
    }, []);

  return (

      <div  style={{ height: "500px", width: "100%" }}>
            {/* Exibição da mensagem de erro em HTML caso exista */}
            {erroMensagem && (
              <div style={{ 
                    backgroundColor: '#ffebee', 
                    color: '#c62828', 
                    padding: '15px', 
                    borderRadius: '8px', 
                    border: '1px solid #ef9a9a',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                  }
                  }>
                ⚠️ Atenção: {erroMensagem}
              </div>
            )}

            {/* Renderização condicional do Mapa ou lista */}
            {
                !erroMensagem && locations.length === 0 ? (
                  <p>Carregando pontos do Hard Rock...</p>
                ) : (
                    // Inicio do bloco da versão 1.0
                    <div style={{ height: "500px", width: "100%" }}>
                      <MapContainer center={[-25, -50]} zoom={4} style={{ height: "200%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {locations.map(loc => (
                          <CircleMarker 
                            key={loc.id} 
                            center={[loc.lat, loc.lng]} 
                            radius={15}
                            eventHandlers={{ click: () => navigate(`/detailsbd/${loc.id}`) }}
                          >
                            <Tooltip>{loc.name}</Tooltip>
                          </CircleMarker>
                        ))}
                      </MapContainer>
                    </div>
                    // Fim do bloco da versão 1.0 
                )
            }
      </div>
    ); // Fim do return
} // Fim da função