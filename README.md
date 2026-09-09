<div align="center">
  <img src="torkg-app/assets/logos/logo.png" alt="TorkG" width="600">

  Aplicação mobile em React Native para o universo automotivo. O **TorkG** parte de um catálogo demonstrativo de autopeças e evolui para a visão de um hub que aproxima pessoas de seus veículos, produtos, manutenção e conteúdo especializado.

  ![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)
  ![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Expo Router](https://img.shields.io/badge/Expo_Router-6-000020?style=for-the-badge&logo=expo&logoColor=white)
</div>

---

## 🚗 Sobre o projeto

Encontrar produtos relevantes, acompanhar a manutenção e concentrar informações sobre um veículo normalmente exige o uso de várias ferramentas. O TorkG nasce para reunir essas necessidades em uma única experiência, contextualizada pelo carro de cada pessoa.

O projeto começou como uma proposta de catálogo/marketplace de autopeças. A visão atual amplia esse ponto de partida para um ecossistema automotivo que poderá conectar produtos, dados do veículo, histórico de cuidados, custos e conteúdo.

## ✨ Funcionalidades atuais

As funcionalidades abaixo correspondem à implementação atual do aplicativo:

- Navegação por abas entre **Home**, **Produtos** e **Configurações**;
- Home com banners promocionais e uma seleção de produtos em destaque;
- Catálogo demonstrativo de autopeças, com dados e imagens locais;
- Campo de busca e indicador de filtros na tela de produtos — a filtragem ainda não está conectada aos dados;
- Links externos para site e contato via WhatsApp na tela de configurações;
- Suporte a tema claro e escuro conforme a configuração do dispositivo.

## 🔭 Visão do produto

O objetivo de longo prazo é tornar o TorkG um hub automotivo personalizado. A experiência poderá usar o veículo selecionado pelo usuário como contexto para apresentar itens compatíveis, conteúdos relevantes, lembretes e informações de uso.

Por exemplo, ao cadastrar um veículo, a pessoa poderá descobrir peças adequadas ao modelo, acompanhar revisões, registrar despesas e receber recomendações relacionadas ao seu carro.

## 🧭 Principais funcionalidades planejadas

### 🛒 Marketplace automotivo

Evolução do catálogo para descoberta e futura compra de autopeças, acessórios, rodas, pneus, componentes de motor, suspensão, freios, iluminação, som e itens de estética e personalização — com compatibilidade orientada pelo veículo cadastrado.

### 🅿️ Minha Garagem

Garagem virtual para cadastrar um ou mais veículos com fabricante, modelo, ano, versão e motorização. O veículo ativo servirá de contexto para as demais áreas do aplicativo.

### 🔧 Manutenção, custos e consumo

Registro de serviços, revisões e trocas de itens; lembretes por data ou quilometragem; acompanhamento de abastecimentos, consumo médio, custo por quilômetro e despesas por período.

### 👥 Conteúdo e comunidade

Conteúdos como guias, comparativos, informações técnicas, dicas e notícias, além de recursos futuros para compartilhar veículos, projetos, modificações e experiências com outros entusiastas.

## 🧰 Tecnologias

Tecnologias e bibliotecas identificadas no repositório:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- React e TypeScript
- React Navigation (navegação por abas)
- Expo Image, Expo Linking e Expo WebBrowser
- React Native Reanimated e Gesture Handler
- ESLint com configuração do Expo
- Spring Boot 3.5 (API REST em `torkg-api/`)
- Spring Security Resource Server para validação de JWT do Supabase

## 🗂️ Estrutura do projeto

O código da aplicação está no diretório `torkg-app/`:

```text
torkg-app/
├── app/              # Rotas e telas gerenciadas pelo Expo Router
│   └── (tabs)/        # Telas e configuração da navegação por abas
├── components/       # Componentes reutilizáveis e elementos de interface
├── assets/           # Imagens, logos e recursos estáticos
├── constants/        # Constantes de tema
├── hooks/            # Hooks de tema e esquema de cores
└── scripts/          # Scripts auxiliares do projeto
```

A API está no diretório `torkg-api/`. Ela mantém as rotas de negócio protegidas por padrão e valida os access tokens emitidos pelo Supabase. Consulte [torkg-api/README.md](torkg-api/README.md) para a configuração e as variáveis necessárias.

## ▶️ Como executar

### 📋 Pré-requisitos

- Node.js (versão LTS recomendada);
- npm, incluído com o Node.js;
- Expo Go no dispositivo físico ou um emulador Android/iOS configurado.

### 📦 Instalação

```bash
git clone <URL_DO_REPOSITORIO>
cd torkg-app
npm install
```

### 📱 Executando o aplicativo

```bash
npm start
```

No terminal do Expo, escolha a plataforma desejada ou leia o QR Code com o Expo Go. Também estão disponíveis os comandos abaixo:

```bash
npm run android  # Executa no Android
npm run ios      # Executa no iOS (requer macOS)
npm run web      # Executa no navegador
npm run lint     # Verifica o código com ESLint
```

## 🗺️ Roadmap

- [x] Navegação por abas (Home, Produtos e Configurações)
- [x] Catálogo demonstrativo de produtos
- [x] Banners e produtos em destaque na Home
- [x] Integração de links externos para site e WhatsApp
- [ ] Busca funcional de produtos
- [ ] Filtros funcionais de produtos
- [ ] Minha Garagem e cadastro de veículos
- [ ] Compatibilidade entre peças e veículos
- [ ] Favoritos e carrinho
- [ ] Histórico e lembretes de manutenção
- [ ] Acompanhamento de consumo e despesas
- [ ] Autenticação e persistência de dados
- [ ] Notificações
- [ ] Conteúdo automotivo personalizado
- [ ] Comunidade automotiva

## 🎯 Objetivo profissional

Além de produto, o TorkG é um projeto de estudo voltado ao aprofundamento em React Native e boas práticas de desenvolvimento mobile. A evolução planejada permitirá exercitar componentização, hooks, gerenciamento de estado, navegação, consumo de APIs, persistência local, integração com recursos nativos e desempenho de interfaces.
