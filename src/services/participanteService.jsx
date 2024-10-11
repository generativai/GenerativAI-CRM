const API_URL = import.meta.env.VITE_API_URL;

/**
 * Cadastra um novo participante no sistema.
 * 
 * @param {string} remoteJid - O contato do participante (ex: WhatsApp).
 * @param {string} personName - O nome do participante.
 * @returns {Promise<Object>} - A resposta da API após o cadastro.
*/

export async function cadastrarParticipante(remoteJid, personName) {
    const getFirstName = (fullName) => {
      return fullName.split(' ')[0];
    };
  
    const payload = {
      remote_jid: remoteJid,
      person_name: personName,
      nickname: getFirstName(personName),
      description: 'Cliente membro do grupo do whatsapp'
    };

    console.log('Payload enviado:', payload);
  
    const response = await fetch(`${API_URL}/pessoas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Erro ao cadastrar participante:', errorDetails);
      throw new Error('Erro ao cadastrar participante');
    }
  
    return await response.json();
}  
