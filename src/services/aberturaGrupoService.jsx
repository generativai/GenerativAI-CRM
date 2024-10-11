const API_URL = import.meta.env.VITE_API_URL;

export async function criarGrupo(groupData) {
  try {
    const response = await fetch(`${API_URL}/grupos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });

    if (!response.ok) {
      const errorData = await response.json();  // Tenta capturar o corpo da resposta com detalhes do erro
      console.error('Erro detalhado ao criar grupo:', errorData);  // Exibe o erro detalhado da resposta
      throw new Error('Erro ao criar o grupo');
    }

    return await response.json();  // Retorna a resposta da API, se bem-sucedido
  } catch (error) {
    console.error('Erro ao criar grupo (catch):', error);  // Log detalhado do erro
    throw error;  // Relança o erro
  }
}