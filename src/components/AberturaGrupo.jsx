import React, { useState } from 'react';
import { criarGrupo } from '../services/aberturaGrupoService';

function AberturaGrupo({ previousStep, participantes }) {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [packageId, setPackageId] = useState(0);
  const [additionalParticipants, setAdditionalParticipants] = useState([{ remoteJid: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const packages = [
    { package_id: 1, package_name: 'Pacote Especial' },
    { package_id: 2, package_name: 'Pacote Global Dois Em Um' },
  ];

  const addAdditionalParticipant = () => {
    setAdditionalParticipants([...additionalParticipants, { remoteJid: '' }]);
  };

  const updateAdditionalParticipant = (index, value) => {
    const updatedParticipants = [...additionalParticipants];
    updatedParticipants[index].remoteJid = value;
    setAdditionalParticipants(updatedParticipants);
  };

  const getAllParticipants = () => {
    return [
      ...participantes.map(p => p.remoteJid),
      ...additionalParticipants.map(p => p.remoteJid),
    ];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    console.log('Iniciando envio de grupo...');
  
    if (!packageId) {
      setError('Selecione um pacote.');
      setLoading(false);
      console.log('Erro: Nenhum pacote selecionado.');
      return;
    }

    const groupData = {
      group_name: groupName,
      description: description,
      package_id: packageId,
      participants: getAllParticipants(),
    };

    console.log('Payload sendo enviado:', JSON.stringify(groupData, null, 2));
    
    try {
      const response = await criarGrupo(groupData);
      console.log('Grupo criado com sucesso:', response);
    
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      setError('Erro ao criar grupo. Por favor, tente novamente.');
      console.log('Dados enviados durante o erro:', JSON.stringify(groupData, null, 2));
    } finally {
      setLoading(false);
      console.log('Finalizando envio...');
    }
  };  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Criação do Grupo</h2>

      <div>
        <label className="block text-sm font-medium">Nome do Grupo</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Digite o nome do grupo"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Descrição do Grupo</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Digite a descrição do grupo"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Pacote</label>
        <select
            value={packageId}
            onChange={(e) => setPackageId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            >
            <option value="" disabled>Selecione um pacote</option>
            {packages.map((pkg) => (
                <option key={pkg.package_id} value={pkg.package_id}>
                {pkg.package_name}
                </option>
            ))}
        </select>

      </div>

      <div>
        <label className="block text-sm font-medium">Participantes da Empresa</label>
        {additionalParticipants.map((participant, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={participant.remoteJid}
              onChange={(e) => updateAdditionalParticipant(index, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Digite o número do WhatsApp"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addAdditionalParticipant}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          + Adicionar Participante
        </button>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={previousStep}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Voltar
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Grupo'}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default AberturaGrupo;
