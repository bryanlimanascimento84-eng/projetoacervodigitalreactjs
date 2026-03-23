import React from 'react';
import styles from './Certificate.module.css';

const Certificate = ({ 
  participants = [], 
  courseName, 
  unitName, 
  projectName, 
  issueDate,
  coordinatorName,
  academicManagerName,
  cidade
}) => {
  return (
    <div className={styles.container}>
      {participants.map((person, index) => (
        <div key={index} className={styles.certificatePage}>
          <div className={styles.borderOuter}>
            <div className={styles.borderInner}>
              
              <header className={styles.header}>
                <h1 className={styles.institution}>{unitName}</h1>
                <h2 className={styles.title}>Certificado de Extensão Universitária</h2>
              </header>

              <main className={styles.content}>
                <p className={styles.text}>
                  Certificamos que <strong>{person}</strong> participou com êxito das atividades 
                  extensionistas vinculadas à disciplina <strong>{courseName}</strong>, atuando 
                  diretamente no projeto <strong>{projectName}</strong>.
                </p>
                
                <p className={styles.description}>
                  Durante o período de desenvolvimento, o aluno demonstrou alto empenho na aplicação 
                  prática dos conhecimentos acadêmicos em prol da comunidade, evidenciando 
                  competências de resolução de problemas reais, responsabilidade social e 
                  protagonismo acadêmico, pilares fundamentais da nossa trajetória educacional.
                </p>
              </main>

              <footer className={styles.footer}>
                <p className={styles.date}>{cidade}, {issueDate}</p>
                
                <div className={styles.signatureRow}>
                  <div className={styles.signatureBox}>
                    <div className={styles.line}></div>
                    <p className={styles.signerName}>{coordinatorName}</p>
                    <p className={styles.role}>Coordenador de Curso</p>
                  </div>
                  
                  <div className={styles.signatureBox}>
                    <div className={styles.line}></div>
                    <p className={styles.signerName}>{academicManagerName}</p>
                    <p className={styles.role}>Gerente Acadêmico</p>
                  </div>
                </div>
              </footer>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certificate;
