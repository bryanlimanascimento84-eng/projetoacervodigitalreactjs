import React, { useState, useEffect } from 'react';
import Certificate from './Certificate';

/*

Criar um componente de "Container" ou "Wrapper" é a melhor prática em React para separar a 
lógica de dados da apresentação UI. Isso segue o padrão Smart and Dumb Components.

O arquivo CertificateContainer.jsx terá os dados fixos em um objeto (Mock Data), 
mas já deixarei a estrutura pronta com um useEffect para que, no futuro, você apenas substitua o comentário pela sua chamada de API (fetch ou axios).



Por que essa estrutura é melhor?
Separação de Preocupações: O arquivo Certificate.jsx só se preocupa em "ficar bonito". Ele não sabe de onde vêm os dados.

Fácil Manutenção: Quando você decidir conectar ao banco de dados (PostgreSQL, MongoDB ou Firebase), você só precisará mexer no CertificateContainer.jsx.

Experiência do Usuário (UX): Adicionamos um estado de loading. Assim, o usuário não vê uma página em branco enquanto os dados são processados.

Escalabilidade: Se no futuro você precisar filtrar os nomes por turma ou ID, você passará esses parâmetros para o Container via URL (usando useParams) e ele fará a busca específica.

*/
const CertificateContainer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de uma busca ao banco de dados (Fetch API)
    const fetchData = async () => {
      setLoading(true);
      try {
        // No futuro, substitua as linhas abaixo por:
        // const response = await fetch('https://api.seubanco.com/certificados');
        // const result = await response.json();
        
        const mockData = {
          participants: ["Ana Beatriz Silva", "Carlos Eduardo Santos", "Mariana Oliveira"],
          courseName: "Análise e Desenvolvimento de Sistemas",
          unitName: "Estácio Curitiba",
          projectName: "Projeto Extensionista: Acervo Digital ReactJS",
          issueDate: "23 de Março de 2026",
          coordinatorName: "Prof. Dr. Coordenador da ADS",
          academicManagerName: "Gerente Acadêmico da Unidade",
          cidade: "São Paulo",
        };

        // Simula um pequeno atraso de rede
        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 800);

      } catch (error) {
        console.error("Erro ao buscar dados dos certificados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
        <p>Carregando dados dos certificados...</p>
      </div>
    );
  }

  return data ? <Certificate {...data} /> : <p>Nenhum dado encontrado.</p>;
};

export default CertificateContainer;