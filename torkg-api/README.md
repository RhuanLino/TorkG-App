# TorkG API

API Spring Boot do TorkG. O Supabase e responsavel por criar sessoes e emitir os JWTs; esta API recebe o access token no cabecalho `Authorization: Bearer <token>` e valida sua assinatura antes de atender rotas privadas.

## Rotas iniciais

| Rota | Acesso | Uso |
| --- | --- | --- |
| `GET /actuator/health` | Publico | Verificacao de disponibilidade |
| `GET /api/v1/public/status` | Publico | Status simples da API |
| `GET /api/v1/me` | Autenticado | Usuario extraido do JWT do Supabase |
| `GET /api/v1/vehicles/primary` | Autenticado | Veiculo principal do usuario autenticado |
| `/api/**` | Autenticado | Padrao para todas as proximas rotas da API |

As origens locais do Expo estao liberadas por CORS. Para producao, configure somente os dominios reais em `CORS_ALLOWED_ORIGINS`; nao use `*`.

## Configuracao com Supabase

1. Copie `.env.example` para `.env` e preencha `SUPABASE_URL` com a Project URL, por exemplo `https://abcxyz.supabase.co`.
2. Em **Authentication > JWT Signing Keys**, utilize uma chave assimetrica (RSA/ECC). A API descobre a chave publica em `auth/v1/.well-known/jwks.json`, portanto nenhum segredo de JWT fica no codigo ou no app.
3. No app mobile, use o cliente Supabase para login/cadastro e envie `session.access_token` em cada chamada privada para a API.

Exemplo de chamada:

```http
GET /api/v1/me
Authorization: Bearer <session.access_token>
```

### Banco de dados

A API le o arquivo `.env` local automaticamente. Para uma aplicacao Spring que permanece ligada, copie a URL do **Session pooler** em **Supabase > Connect** e preencha `SUPABASE_DB_URL`, `SUPABASE_DB_USERNAME` e `SUPABASE_DB_PASSWORD`. O pool de conexoes fica limitado a cinco conexoes locais.

O endpoint `GET /actuator/health` tambem verifica a conectividade com o PostgreSQL, sem revelar detalhes do banco na resposta.

### Dados necessarios para concluir a integracao

- A **Project URL** do Supabase (seguro compartilhar);
- Confirmacao de que as **JWT Signing Keys** sao assimetricas e ja estao ativas. Se nao forem, faca a migracao pelo painel; com chave simetrica a validacao precisa consultar o Supabase a cada requisicao;
- A chave **publishable/anon** sera necessaria no Expo, mas nao na API. Ela pode ficar no app por ser publica;
- Para a proxima etapa de persistencia: o desenho das tabelas/regras do produto ou o acesso ao banco via variaveis de ambiente (`host`, `porta`, `banco`, `usuario`, `senha` do pooler e SSL). Nao envie senha, `service_role` ou JWT secret pelo chat e nunca os versione.

O `service_role` so sera necessario se a API precisar executar acoes administrativas que ignorem RLS. Para operacoes normais de usuario, prefira RLS e o JWT recebido do aplicativo.

## Execucao

O projeto inclui o Maven Wrapper, portanto basta ter o Java 21 e, dentro desta pasta, execute:

```powershell
.\mvnw.cmd spring-boot:run
```

Com `SUPABASE_URL` configurada, teste `http://localhost:8080/api/v1/public/status`. A rota `/api/v1/me` deve retornar 401 sem token e os dados do usuario com um access token valido.
