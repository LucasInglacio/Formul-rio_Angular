async function buscarEndereco(): Promise<void> {
  const cepInput: HTMLInputElement | null = document.getElementById('cep') as HTMLInputElement;
  const enderecoInput: HTMLTextAreaElement | null = document.getElementById('endereco') as HTMLTextAreaElement;

  if (!cepInput || !enderecoInput) {
      console.error('Elementos não encontrados.');
      return;
  }

  const cep: string = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (cep.length !== 8) {
      enderecoInput.value = ''; // Limpa o campo de endereço se o CEP for inválido
      return;
  }

  try {
      const response: Response = await fetch(https://viacep.com.br/ws/${cep}/json/);
      const data: any = await response.json();
      if (data.erro) {
          enderecoInput.value = ''; // Limpa o campo de endereço se o CEP não for encontrado
      } else {
          enderecoInput.value = ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf};
      }
  } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      alert('Erro ao buscar o endereço. Por favor, tente novamente mais tarde.');
  }
}

document.getElementById('cep')?.addEventListener('input', buscarEndereco); // Adiciona o evento de entrada no campo de CEP
