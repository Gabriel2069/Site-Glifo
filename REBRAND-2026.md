# Glifo · Transição digital da identidade de novembro de 2026

> Estado: PROPOSTA IMPLEMENTADA EM BRANCH. Não é aprovação estética final nem prova de implantação. Não publicar, mesclar ou alterar o Studio sem autorização específica.

## Fonte primária

Kit fornecido pelo autor em 22/11/2026: `Glifo IDV(1).zip`, raiz `Glifo IDV/`. Os componentes usados derivam de `Glifo_Caderno_Final.pdf`, `02 Cor e tipografia/Glifo.css` e dos SVGs originais indicados abaixo. O ZIP entregue pelo autor permanece como matriz externa preservada. Não substituir originais por capturas ou reconstruções.

## Paleta oficial

Azul-tinta `#091321`; Violeta `#351F53`; Petróleo `#123F49`; Prata `#C5CFD2`; Lunar `#E8EBE9`; Latão `#C4AA78`. Títulos: Almendra; texto e interface: Manrope. Assinaturas e emblemas não devem ser redesenhados.

## Objetivo da primeira iteração

Deslocar a percepção da fantasia celestial literal para um ateliê autoral de design: direção editorial, gravura de ofício, clareza profissional, trabalho demonstrado e detalhes materiais. Preservar o site existente, navegação, casos e as interações do observatório.

## Mudanças executadas neste ramo

- Tokens públicos usam a paleta oficial e aliases para componentes antigos.
- `src/styles/glifo-2026.css` reorganiza a primeira dobra como composição tipográfica com observatório contido, espaço para descrição e caminhos claros.
- Trabalho e serviços ganham prioridade na ordem da home; o prólogo e a narrativa permanecem disponíveis após a apresentação comercial.
- A seção sobre autoria usa fundo lunar e a narrativa recebe tratamento visual menos fotográfico.
- Três SVGs oficiais, sem edição dos traços: `03 Glifos/avistar.svg`, `05 Superficies/limiar-canto.svg` e `05 Superficies/talho-fundo.svg`. O último fica disponível no acervo sem uso obrigatório nesta etapa.
- Gradiente do observatório e metadado da cor de navegador passam à paleta atual.

## Não alterado

Administração, API, autenticação, Durable Objects, estudos e dados do Studio, conteúdo de identidades de clientes, modelos de formulário e arquivos oficiais anteriores de assinatura em `public/brand/`. Não há serviço externo novo, gasto adicional ou publicação.

## Validação exigida antes da aprovação

1. Compilação de Astro e TypeScript.
2. Testes Playwright existentes, inclusive navegação, serviços, movimento reduzido e responsividade.
3. Comparação visual real da home em 390, 768 e 1440 px e inspeção de sobreposições no observatório, botões, cabeçalho e rodapé.
4. Revisão de contraste e estados `hover`, `focus-visible`, toque e teclado em superfícies tinta e lunar.
5. Conferência específica de client-project artwork, que não pode herdar filtros e cores da Glifo.
6. Verificação de ativos, dimensões, fontes e contraste em ambiente publicado somente após autorização de deploy.

## Pendências honestas

- A instalação completa do kit 2026 não foi feita. Os 194 SVGs e as assinaturas originais do ZIP não foram todos incorporados; selecionar apenas os que tiverem função real.
- As imagens históricas da vitrine ainda precisam de curadoria com materiais atuais dos projetos, antes de serem substituídas.
- A publicação Cloudflare e o commit atualmente servido no domínio não foram comprovados.
- Provas visuais e aceite autoral ainda são necessários. O código modificado não equivale a entrega publicada.
