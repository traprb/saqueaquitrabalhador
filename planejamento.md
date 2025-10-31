# Planejamento de Reestruturação do Site "Saque Aqui Trabalhador"

## 1. Estrutura de Arquivos e Pastas

A nova estrutura será organizada para facilitar a manutenção, o desenvolvimento e a hospedagem no GitHub Pages.

```
/saqueaqui_reestruturado/
├── index.html                  (Página inicial)
├── pages/
│   ├── privacidade.html        (Política de Privacidade)
│   ├── sobre.html              (Sobre Nós)
│   └── termos.html             (Termos de Uso)
├── posts/
│   ├── template.html           (Template reutilizável para novas postagens)
│   ├── post-exemplo-1.html     (Postagem convertida)
│   └── ...                     (Demais postagens convertidas)
├── css/
│   ├── style.css               (Estilos principais)
│   └── responsive.css          (Estilos para responsividade - ou integrado ao style.css com media queries)
├── js/
│   └── script.js               (Scripts JavaScript para interatividade)
├── img/
│   ├── logo.png                (Novo logo/favicon)
│   ├── hero-banner.jpg         (Imagem principal da página inicial)
│   └── ...                     (Imagens livres de direitos autorais para posts)
├── assets/
│   ├── google266297d8955fb9ce.html (Arquivo de verificação do Google)
│   ├── robots.txt
│   └── sitemap.xml
└── README.md                   (Instruções de uso e manutenção)
```

## 2. Design e Paleta de Cores

*   **Conceito:** Moderno, limpo, profissional e focado na legibilidade.
*   **Paleta de Cores (Finanças/Notícias):**
    *   **Primária (Ação/Destaque):** Azul Marinho (`#003366`) - Transmite confiança e estabilidade.
    *   **Secundária (Apoio/Sucesso):** Verde Água/Menta (`#4CAF50` ou `#00BFA5`) - Sugere crescimento e positividade.
    *   **Neutras (Fundo/Texto):** Branco (`#FFFFFF`), Cinza Claro (`#F8F9FA`), Preto Suave (`#333333`).
*   **Tipografia:** Fonte Sans-serif moderna e de fácil leitura (ex: 'Roboto', 'Open Sans' ou 'Inter' via Google Fonts).

## 3. Otimização para Google AdSense e SEO

*   **HTML Semântico:** Uso de tags como `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` para estrutura e SEO.
*   **Responsividade:** Design Mobile-First com Media Queries para garantir 100% de responsividade.
*   **Espaços para Anúncios (AdSense):**
    *   **Header:** Bloco de anúncio horizontal (728x90 ou responsivo).
    *   **Sidebar (`<aside>`):** Bloco de anúncio vertical (300x600 ou responsivo).
    *   **Dentro dos Posts:** Bloco de anúncio nativo ou display (após o primeiro parágrafo e no meio do conteúdo).
    *   **Footer:** Bloco de anúncio horizontal (responsivo).
*   **Conteúdo:** Garantir que o conteúdo seja único e de alta qualidade (o conteúdo original será revisado e mantido, mas a estrutura será limpa).
*   **Meta Tags:** Implementação de meta tags essenciais para SEO (título, descrição, Open Graph).

## 4. Funcionalidades e Conteúdo

*   **Área de Posts:** A pasta `/posts` será o local central para todas as notícias. O `template.html` terá a estrutura de postagem otimizada (título, imagem, conteúdo, bloco de anúncio, seção de posts relacionados).
*   **Link Parceiro:** Um botão de destaque na página inicial e na barra lateral (sidebar) com o texto "Saque Rápido e Seguro" ou similar, que levará para `https://saqueaqui.online/`.
*   **Correção de Erros:** Todos os links serão verificados e corrigidos para a nova estrutura. O CSS será reescrito do zero para evitar erros de carregamento e código obsoleto.
*   **JavaScript:** Uso mínimo e moderno de JS para funcionalidades como menu responsivo (hambúrguer) e talvez um *lazy loading* de imagens.

## 5. Próximos Passos

1.  Coletar imagens livres de direitos autorais (Fase 3).
2.  Desenvolver o HTML base (`index.html`, `template.html`, páginas estáticas) (Fase 4).
3.  Desenvolver o CSS (`style.css`) (Fase 4).
4.  Converter o conteúdo dos posts antigos para a nova estrutura (Fase 4).
5.  Testar e validar (Fase 5).
6.  Empacotar (Fase 6).
