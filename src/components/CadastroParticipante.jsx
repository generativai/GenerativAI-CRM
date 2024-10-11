import React, { useState } from 'react';
import { cadastrarParticipante } from '../services/participanteService';

function CadastroParticipante({ nextStep, addParticipantes }) {
  const [participantes, setParticipantes] = useState([{ personName: '', remoteJid: '' }]);
  const [erroAPI, setErroAPI] = useState(null);
  const [loading, setLoading] = useState(false);

  // Adiciona um novo participante
  const addParticipante = () => {
    setParticipantes([...participantes, { personName: '', remoteJid: '' }]);
  };

  // Atualiza os dados do participante
  const updateParticipante = (index, field, value) => {
    const updatedParticipantes = [...participantes];
    updatedParticipantes[index][field] = value;
    setParticipantes(updatedParticipantes);
  };

  // Verifica se os campos de um participante estão preenchidos
  const isCurrentParticipanteValid = () => {
    const lastParticipante = participantes[participantes.length - 1];
    return lastParticipante.personName.trim() !== '' && lastParticipante.remoteJid.trim() !== '';
  };

  // Envia o formulário para cadastrar participantes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroAPI(null);
    setLoading(true);

    if (participantes.some(p => p.personName && p.remoteJid)) {
      try {
        for (const participante of participantes) {
          if (participante.personName && participante.remoteJid) {
            await cadastrarParticipante(participante.remoteJid, participante.personName);
          }
        }

        addParticipantes(participantes.filter(p => p.personName && p.remoteJid));
      } catch (error) {
        console.error('Erro ao cadastrar participantes:', error);
        setErroAPI('Erro ao cadastrar participante(s). Verifique os dados e tente novamente.');
        setLoading(false);
        return;
      }
    }

    nextStep();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Cadastro de Participantes (Opcional)</h2>

      {participantes.map((participante, index) => (
        <div key={index} className="space-y-2">
          <div>
            <label className="block text-sm font-medium">Nome do Participante</label>
            <input
              type="text"
              value={participante.personName}
              onChange={(e) => updateParticipante(index, 'personName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Digite o nome do participante (opcional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">WhatsApp (Contato)</label>
            <input
              type="text"
              value={participante.remoteJid}
              onChange={(e) => updateParticipante(index, 'remoteJid', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Digite o número do WhatsApp (opcional)"
            />
          </div>
        </div>
      ))}

      {/* Botão para adicionar novo participante */}
      <button
        type="button"
        onClick={addParticipante}
        className="w-full text-blue-500 hover:text-blue-700 font-medium mt-4"
      >
        + Adicionar Participante
      </button>

      {/* Botão "Cadastrar Participante(s)" */}
      <button
        type="submit"
        className="bg-black-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-4 w-full"
        disabled={!isCurrentParticipanteValid() || loading}  // Desativado até que os campos estejam preenchidos
      >
        {loading ? 'Enviando...' : participantes.length > 1 ? 'Cadastrar Participantes' : 'Cadastrar Participante'}
      </button>

      {/* Botão "Pular" para avançar sem cadastrar participantes */}
      <button
        type="button"
        onClick={nextStep}
        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-2 w-full"
        disabled={loading}  // Desativado durante o envio
      >
        Pular
      </button>

      {/* Exibe erro, se houver */}
      {erroAPI && <p className="text-red-500 mt-2">{erroAPI}</p>}
    </form>
  );
}

export default CadastroParticipante;