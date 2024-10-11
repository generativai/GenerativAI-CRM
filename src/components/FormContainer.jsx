import React, { useState } from 'react';
import FormImage from "../assets/images/form-image.webp";
import CadastroParticipante from './CadastroParticipante';
import AberturaGrupo from './AberturaGrupo';

function FormContainer() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('');
  const [participantes, setParticipantes] = useState([]);

  const nextStep = () => {
    setDirection('next');  // Controla a direção do deslizamento
    setStep(step + 1);
  };

  const previousStep = () => {
    setDirection('prev');  // Controla a direção do deslizamento
    setStep(step - 1);
  };

  const addParticipantes = (novosParticipantes) => {
    setParticipantes([...participantes, ...novosParticipantes]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">  
      <div className="flex flex-col lg:flex-row bg-black overflow-hidden w-full lg:max-w-4xl">  
        <div className="hidden lg:block w-1/2">
          <img
            src={FormImage}
            alt="Imagem do formulário"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 px-10 py-24">  
          <div className="w-full max-w-lg mb-8">
            {/* Barra de progresso */}
            <div className="flex items-center justify-between">
              <div className={`w-1/2 h-2 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`w-1/2 h-2 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          {/* Container relativo para garantir altura correta */}
          <div className="relative w-full h-auto">
            {/* Cadastro Participante */}
            <div
              className={`transition-transform duration-500 ease-in-out transform ${
                step === 1
                  ? 'translate-x-0'  // Formulário inicial aparece normal
                  : direction === 'next'
                  ? 'translate-x-full'  // Sai para a direita
                  : '-translate-x-full' // Volta da esquerda ao clicar em "Voltar"
              }`}
            >
              {step === 1 && (
                <CadastroParticipante nextStep={nextStep} addParticipantes={addParticipantes} />
              )}
            </div>

            {/* Abertura do Grupo */}
            <div
              className={`transition-transform duration-500 ease-in-out transform ${
                step === 2
                  ? 'translate-x-0'  // Formulário da etapa 2 aparece normal
                  : direction === 'next'
                  ? '-translate-x-full'  // Entra da direita ao avançar
                  : 'translate-x-full'   // Sai para a direita ao clicar em "Voltar"
              }`}
            >
              {step === 2 && (
                <AberturaGrupo previousStep={previousStep} participantes={participantes} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
