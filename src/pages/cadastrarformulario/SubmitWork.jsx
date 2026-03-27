import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import styles from './SubmitWork.module.css';
import ProgressBar from './ProgressBar';

import { supabase } from '../../infra/supabase/supabaseClient'

const SubmitWork = () => {

  console.log("URL do Supabase:", process.env.REACT_APP_SUPABASE_URL);
  console.log("Ambiente de execução:", process.env.NODE_ENV);
  const [erroMensagem, setErroMensagem] = useState(null); // Estado para a mensagem de erro

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nucleo: '',
    nome: '',
    matricula: '',
    regional: '',
    unidade: '',
    cursos: [],
    eixo: '',
    periodo: '',
    atividade: '',
    realizou: ''
  });

  const handleCheckbox = (curso) => {
    const updated = formData.cursos.includes(curso)
      ? formData.cursos.filter(c => c !== curso)
      : [...formData.cursos, curso];
    setFormData({ ...formData, cursos: updated });
  };

  const handleAvançar = () => {
    navigate('/SubmitWorkTela02', { state: { data: formData } });
  };

  /*
  const regionaisData = {
    Sudeste: ['Angra dos Reis', 'Bangu', 'Brooklin', 'Cabo Frio'],
    Nordeste: ['Alagoinhas', 'Aracaju', 'Canindé', 'Costa Azul'],
    "Norte-Sul": ['Curitiba', 'Cristo Rei', 'Cuiabá', 'Dourados'],
    Wyden: ['Adrianópolis I', 'Boa vista - Wyden', 'Dunas-CE', 'Rio Vermelho']
  };*/

  const [dadosRegional, setDadosRegional] = useState([])
  useEffect(() => {
    async function fetchItems() {

          try {
              console.log ("Estrutura objeto Supabase: - ",supabase)

             
              /*
              Após criar a tabela no Supabase precisa tornar ela comacesso público, caso contrário não serão selecionados dados.
              Via Dashboard do Supabase (Recomendado)
              Acesse seu projeto no painel do Supabase.
              Vá em Database > Policies (ou Authentication > Policies).
              Encontre sua tabela e clique em Create Policy.
              Selecione a opção Enable read access for all users  - Botão lado direito com select em Verde.
              Clique em Review e depois em Save policy. 
              */
              // Selecionar dados da tabela Estado criada no Supabase.
              //let data  = await supabase.from('Estado').select('*')
              const { data } = await supabase.from('Regional').select('*')
              const { data: Regional, error } = await supabase.from('Regional').select('*')
              console.log ("************")
              console.log ("Dados tabela Regional - ",data,data.id,data.nome_regional)

              setDadosRegional(data)// Carrega os dados do select
              if (error) {
                  console.error('Erro ao buscar dados:', error)
              } else {
                  console.log('Dados de Regional:', Regional)
              }
        } catch (error) {
              setErroMensagem('Erro ao buscar dados (SubmitWork.jsx): ' + error.message);
              console.error('Erro ao buscar dados:', error);
        }
      }
  
      fetchItems()
    }, []) 

  const [dadosUnidadeRegional, setUnidadeRegional] = useState([])
  useEffect(() => {
    async function fetchItems() {

          try {
            /*
              console.log ("Estrutura objeto Supabase: - ",supabase)

              // Selecionar dados da tabela Unidades_Regional criada no Supabase.
              const { data } = await supabase.from('Unidades_Regional').select('*')
              console.log ("Dados tabela Regional - ",data,data.id,data.nome_regional)
              
              setUnidadeRegional(data)// Carrega os dados do select

              const { data: Unidades_Regional, error } = await supabase.from('Unidades_Regional').select('*')
              if (error) {
                  console.error('Erro ao buscar dados Unidades_Regional:', error)
              } else {
                  console.log('Dados de Unidades_Regional:', Unidades_Regional)
              }
                  */
        } catch (error) {
              setErroMensagem('Erro ao buscar dados  (SubmitWork.jsx): ' + error.message);
              console.error('Erro ao buscar dados:', error);
        }
      }
  
      fetchItems()
    }, []) 

  return (
    <div >
      <ProgressBar currentStep={1} />
      <header >
        <h2>Envio de Evidências {formData.nucleo === 'LTD/NID' && '- LTD/NID 2026.1'}</h2>
      </header>

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
            !erroMensagem && dadosUnidadeRegional.length === 0 ? (
              <div >
                Olá, <strong>Douglas</strong>. Quando você enviar este formulário, o proprietário verá seu nome e endereço de e-mail.
                <p><span >*</span> Obrigatória</p> 
              
               <label>3. Selecione sua Regional <span >*</span></label>
               <br></br>  
               <span >Esta pergunta é obrigatória.</span>
                              <br></br>  
               <select onChange={(e) => setFormData({...formData, regional: e.target.value})} >
                  <option value="">Selecionar sua resposta</option>

                  {/* 
                    O que mudou?
                    dadosRegional.map: Como o Supabase retorna uma lista (array), iteramos diretamente sobre ela.
                    key={reg.id}: É importante usar um identificador único da sua tabela (geralmente o id) para a propriedade key.
                    value={reg.id}: Geralmente, no banco de dados, queremos salvar o ID da regional, mas mostrar o nome para o usuário.
                    {reg.nome_regional}: Aqui é onde o texto aparecerá para o usuário.*/}

                    {dadosRegional.map((reg) => (
                      <option key={reg.id} value={reg.id}>
                        {reg.nome_regional}
                      </option>
                    ))}
                </select>
                

              </div>
              
              
            ) 
              : 
            (
              <p>Algum erro ocorreu</p>
            )
            
        }
    </div>
  )
}
             


export default SubmitWork;

/*
O que foi implementado:
Persistência de Dados: Os dados da Tela 01 são passados para a Tela 02 via location.state. Na Tela 02, eles são mesclados (...dadosAnteriores) com os novos campos e enviados para a Tela 03.

Validação de Negócio: O campo de texto tem limite de 1000 caracteres e o input de arquivo valida o tamanho (10MB) e extensões permitidas.

Layout Organizado: Os radiobuttons na Tela 02 seguem o padrão de alinhamento à esquerda solicitado anteriormente.

*/