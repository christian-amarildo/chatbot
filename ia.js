const  OpenAIApi  = require('openai');
require('dotenv').config()
// Configura a API da OpenAI com sua chave


const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

// Função que envia uma pergunta para a API e retorna a resposta
async function obterResposta(pergunta, base) {
  try {
    const  completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",//"gpt-3.5-turbo",
    messages: [
        { role: "system", content:"voce só responde perguntas sobre os correios sempre que alguem lhe pedir mais do que sua base de dados permitir você diz que não pode responder\nvoce tem uma base de dados para se embasar  que é esta" + base},        
        {
            role: "user",
            content: pergunta,
        },
        
    ],
    });

    // Retorna o texto da resposta gerada
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao se comunicar com a API da OpenAI:", error);
    return 'Erro ao obter a resposta da OpenAI';
  }
}

// Exporta a função para ser usada em outros arquivos
module.exports = obterResposta;