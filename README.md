# Mi Plata — como publicar no GitHub Pages

App de finanças pessoais para a Salomé (Colômbia). Página única, sem servidor,
sem login e sem backend: **os dados ficam só no celular dela**, no armazenamento
do próprio navegador. O que é publicado aqui é apenas o código do app.

## Por que precisa ser publicado

No iPhone **não dá** para abrir um arquivo `.html` recebido pelo WhatsApp:

- nenhum navegador do iOS abre `file://` (nem o Chrome, que lá é o Safari por dentro);
- o iOS só mostra uma prévia via Quick Look, que **não executa JavaScript**;
- desde o Safari 11, `localStorage` em arquivo local dá `SecurityError`.

Servido por uma URL `https`, tudo isso funciona: o app roda, salva os dados e
ainda pode ser instalado na tela de início com ícone próprio.

## Passo a passo

1. **Criar o repositório**
   Em <https://github.com/new>, nome sugerido: `mi-plata`.
   Precisa ser **público** — o GitHub Pages em repositório privado exige plano pago.
   Não tem problema: o app não guarda dado nenhum, então não há nada privado aqui.

2. **Subir os arquivos** (qualquer um dos dois caminhos)

   Pelo site, sem usar git:
   na página do repositório vazio → *uploading an existing file* → arraste
   **todos** os arquivos desta pasta → *Commit changes*.

   Ou pelo terminal, a partir desta pasta (o commit já está feito):

   ```bash
   git remote add origin https://github.com/SEU-USUARIO/mi-plata.git
   git push -u origin main
   ```

3. **Ligar o Pages**
   No repositório: *Settings* → *Pages* → em **Source** escolha
   *Deploy from a branch* → branch `main`, pasta `/ (root)` → *Save*.

4. **Pegar o link** (leva cerca de 1 minuto para ficar no ar)

   ```
   https://SEU-USUARIO.github.io/mi-plata/
   ```

## O que mandar para ela

Manda **o link**, não o arquivo. E manda junto esta instrução, porque a ordem importa:

> Abre o link **no Safari** (não no Chrome). Toca no botão de compartilhar
> (o quadradinho com a seta para cima) → **Adicionar à Tela de Início**.
> Depois usa sempre pelo ícone do gatinho, não pelo link.

### Por que Safari, e por que antes de começar a usar

- No iPhone, só o Safari cria de verdade o app na tela de início (tela cheia,
  ícone próprio, sem barra de endereço).
- **O app na tela de início tem armazenamento separado do navegador.** Se ela
  usar pelo link durante uma semana e só depois adicionar à tela de início,
  os lançamentos daquela semana ficam para trás. Por isso: **instala primeiro,
  usa depois.**

## Backup continua valendo

Agora os dados persistem de verdade, mas ainda é bom ela mandar uma cópia para
si mesma no WhatsApp de vez em quando (aba **Más** → *Enviarme la copia por
WhatsApp*). O app cobra isso sozinho a cada 14 dias.

## Atualizar o app depois

Substitua o `index.html` e dê push. O service worker serve a versão em cache e
baixa a nova por trás, então ela recebe a atualização na abertura seguinte.
Se mudar algum ícone ou o manifest, troque também o nome do cache em `sw.js`
(`miplata-v1` → `miplata-v2`) para forçar a renovação.

## Arquivos

| arquivo | para quê |
|---|---|
| `index.html` | o app inteiro, sem dependência externa |
| `manifest.webmanifest` | nome, cores e ícones do app instalado |
| `sw.js` | cache para funcionar sem internet |
| `apple-touch-icon.png` | ícone da tela de início no iPhone (o iOS exige PNG) |
| `icon-192.png`, `icon-512.png`, `icon-maskable.png` | ícones do Android |
| `icon-32.png` | ícone da aba do navegador |
