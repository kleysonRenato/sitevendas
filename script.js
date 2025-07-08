// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM totalmente carregado. Iniciando script.js...");

    // --- Referências aos Elementos HTML ---
    const homeSection = document.getElementById('homeSection');
    const allProductsSection = document.getElementById('allProductsSection');
    const productDetailSection = document.getElementById('productDetailSection');
    const aboutUsSection = document.getElementById('aboutUsSection');

    const header = document.querySelector('header'); 
    const navHomeBtn = document.getElementById('navHome');
    const navAllProductsBtn = document.getElementById('navAllProducts');
    const navAboutUsBtn = document.getElementById('navAboutUs');
    const exploreProductsBtn = document.getElementById('exploreProductsBtn');
    const viewAllProductsBtn = document.getElementById('viewAllProductsBtn');

    const featuredProductsGrid = document.getElementById('featuredProductsGrid');
    const loadingFeaturedMessage = document.getElementById('loadingFeaturedMessage');
    const allProductsGrid = document.getElementById('allProductsGrid');
    const loadingAllProductsMessage = document.getElementById('loadingAllProductsMessage');

    const loadingDetailMessage = document.getElementById('loadingDetailMessage');

    // As referências a 'hamburgerMenu' e 'mainNav' (para o menu mobile) foram removidas
    // pois o header agora é fixo e o menu não tem mais hambúrguer/lateral.

    // --- LISTA DE PRODUTOS ---
    // Em um cenário real, você buscaria isso de uma API
    let products = [
        { id: '1', name: 'KIT RADAR 5 LENTES', price: 279.90, description: 'Todas as nossas lentes oferecem proteção total do sol e bloqueiam 100% dos raios uva, uvb e uvc. Vamos crescer com você, sua satisfação é nossa primeira prioridade e nossa equipe está sempre pronta para ajudá-lo com qualquer uma de suas perguntas antes e depois de sua compra. Acreditamos que um bom produto é o primeiro passo para o sucesso, também oferecemos aos clientes a melhor experiência do usuário e serviço pós-venda.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/kitradar5lentes.png?raw=true' },
        { id: '2', name: 'PLANTARIS ', price: 119.90, description: 'Todas as nossas lentes oferecem proteção total do sol e bloqueiam 100% dos raios uva, uvb e uvc. Vamos crescer com você, sua satisfação é nossa primeira prioridade e nossa equipe está sempre pronta para ajudá-lo com qualquer uma de suas perguntas antes e depois de sua compra. Acreditamos que um bom produto é o primeiro passo para o sucesso, também oferecemos aos clientes a melhor experiência do usuário e serviço pós-venda.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/plantaris.png?raw=true' },
        { id: '3', name: 'PLATE', price: 159.90, description: 'Todas as nossas lentes oferecem proteção total do sol e bloqueiam 100% dos raios uva, uvb e uvc. Vamos crescer com você, sua satisfação é nossa primeira prioridade e nossa equipe está sempre pronta para ajudá-lo com qualquer uma de suas perguntas antes e depois de sua compra. Acreditamos que um bom produto é o primeiro passo para o sucesso, também oferecemos aos clientes a melhor experiência do usuário e serviço pós-venda.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/plate.png?raw=true' },
        { id: '4', name: 'PENNY', price: 119.00, description: 'Todas as nossas lentes oferecem proteção total do sol e bloqueiam 100% dos raios uva, uvb e uvc. Vamos crescer com você, sua satisfação é nossa primeira prioridade e nossa equipe está sempre pronta para ajudá-lo com qualquer uma de suas perguntas antes e depois de sua compra. Acreditamos que um bom produto é o primeiro passo para o sucesso, também oferecemos aos clientes a melhor experiência do usuário e serviço pós-venda.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/penny.png?raw=true' },
        { id: '5', name: 'JULIET ', price: 119.0, description: 'Todas as nossas lentes oferecem proteção total do sol e bloqueiam 100% dos raios uva, uvb e uvc. Vamos crescer com você, sua satisfação é nossa primeira prioridade e nossa equipe está sempre pronta para ajudá-lo com qualquer uma de suas perguntas antes e depois de sua compra. Acreditamos que um bom produto é o primeiro passo para o sucesso, também oferecemos aos clientes a melhor experiência do usuário e serviço pós-venda.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/juliet.png?raw=true' }
    ];  
    console.log("Produtos carregados. Total: ", products.length);

    // --- Dados dos Donos do Site ---
    const owners = [
        { name: 'Felipe J.', role: 'Fundador', bio: '', photoUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/fotolipe.png?raw=true', socialMedia: { instagram: 'https://www.instagram.com/felipe_junges/' } },
        { name: 'Guilherme O.', role: 'Fundador', bio: '', photoUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/fotogui.png?raw=true', socialMedia: { instagram: 'https://www.instagram.com/oliveira19p/' } }
    ];
    console.log("Donos carregados.");


    // --- Funções de Navegação de Páginas ---
    function showSection(sectionId, productId = null) {
        console.log(`Tentando mostrar a seção: ${sectionId}`);
        // Esconde todas as seções
        document.querySelectorAll('main .page-section').forEach(section => {
            section.classList.remove('active');
        });

        // Mostra a seção desejada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            if (sectionId === 'homeSection') {
                renderFeaturedProducts();
            } else if (sectionId === 'allProductsSection') {
                renderAllProducts();
            } else if (sectionId === 'productDetailSection' && productId) {
                renderProductDetails(productId);
            } else if (sectionId === 'aboutUsSection') {
                renderAboutUsContent();
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.error(`ERRO: Seção com ID '${sectionId}' não encontrada no HTML.`);
        }
        
        // Em desktop e mobile, o menu lateral não existe mais, então não há o que fechar.
        // O header também é sempre visível, sem lógica de hidden/visible ou hambúrguer.
    }

    // --- Event Listeners para Navegação ---
    // Verifica se os botões existem antes de adicionar event listeners
    if (navHomeBtn) {
        navHomeBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            showSection('homeSection');
        });
    } else { console.error("ERRO: Elemento com ID 'navHome' não encontrado."); }
    
    if (navAllProductsBtn) {
        navAllProductsBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            showSection('allProductsSection');
        });
    } else { console.error("ERRO: Elemento com ID 'navAllProducts' não encontrado."); }
    
    if (navAboutUsBtn) {
        navAboutUsBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            showSection('aboutUsSection');
        });
    } else { console.error("ERRO: Elemento com ID 'navAboutUs' não encontrado."); }
    
    if (exploreProductsBtn) {
        exploreProductsBtn.addEventListener('click', () => {
            // Agora o botão "Explorar Produtos" leva diretamente para a seção de todos os produtos
            showSection('allProductsSection'); 
        });
    } else { console.error("ERRO: Elemento com ID 'exploreProductsBtn' não encontrado."); }

    if (viewAllProductsBtn) {
        viewAllProductsBtn.addEventListener('click', () => {
            showSection('allProductsSection');
        });
    } else { console.error("ERRO: Elemento com ID 'viewAllProductsBtn' não encontrado."); }

    // A lógica para o menu hambúrguer em mobile e o scroll para esconder/mostrar o cabeçalho foi removida.
    // O header agora é sempre visível e o menu é fixo no desktop/mobile.

    // --- Lógica da Página Inicial (Produtos em Destaque) ---
    function renderFeaturedProducts() {
        if (!featuredProductsGrid) {
            console.error("ERRO: Elemento com ID 'featuredProductsGrid' não encontrado no HTML para renderizar produtos em destaque.");
            return;
        }
        featuredProductsGrid.innerHTML = ''; // Limpa o grid
        
        if (loadingFeaturedMessage) {
            loadingFeaturedMessage.style.display = 'none'; // Esconde a mensagem de carregamento
        }

        const numberOfFeatured = 3;
        const featuredProducts = products.slice(0, numberOfFeatured);

        if (featuredProducts.length === 0) {
            featuredProductsGrid.innerHTML = '<p class="no-products-message">Nenhum óculos em destaque no momento.</p>';
            return;
        }

        featuredProducts.forEach((product) => {
            try {
                const productCard = createProductCard(product);
                featuredProductsGrid.appendChild(productCard);
            } catch (e) {
                console.error(`ERRO ao criar ou adicionar card do produto em destaque "${product.name}" (ID: ${product.id}):`, e);
            }
        });
    }

    // --- Lógica da Página de Coleção Completa ---
    function renderAllProducts() {
        if (!allProductsGrid) {
            console.error("ERRO: Elemento com ID 'allProductsGrid' não encontrado no HTML para renderizar todos os produtos.");
            return;
        }
        allProductsGrid.innerHTML = '';
        if (loadingAllProductsMessage) {
            loadingAllProductsMessage.style.display = 'none';
        }

        if (products.length === 0) {
            allProductsGrid.innerHTML = '<p class="no-products-message">Nenhum óculos disponível na coleção completa.</p>';
            return;
        }

        products.forEach((product) => {
            try {
                const productCard = createProductCard(product);
                allProductsGrid.appendChild(productCard);
            } catch (e) {
                console.error(`ERRO ao criar ou adicionar card do produto completo "${product.name}" (ID: ${product.id}):`, e);
            }
        });
    }

    // --- Função Auxiliar para Criar Card de Produto (Reutilizável) ---
    function createProductCard(product) {
        const productCard = document.createElement('a');
        productCard.href = '#';
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            </div>
        `;
        productCard.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('productDetailSection', product.id);
        });
        return productCard;
    }

    // --- Lógica da Página de Detalhes do Produto ---
    function renderProductDetails(productId) {
        if (!productDetailSection) {
            console.error("ERRO: Elemento com ID 'productDetailSection' não encontrado.");
            return;
        }
        // Limpa o conteúdo da seção de detalhes antes de renderizar um novo produto
        productDetailSection.innerHTML = ''; 

        if (loadingDetailMessage) {
            loadingDetailMessage.style.display = 'none';
        }

        const product = products.find(p => p.id === productId);

        if (!product) {
            productDetailSection.innerHTML = '<div class="product-detail-container"><p class="no-products-message">Óculos não encontrado.</p></div>';
            return;
        }

        const detailContainer = document.createElement('div');
        detailContainer.classList.add('product-detail-container');
        detailContainer.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            <p class="description">${product.description}</p>
            <a href="#" id="whatsappContactBtn" class="btn-whatsapp">
                <i class="bi bi-whatsapp"></i> Chamar no WhatsApp
            </a>
            `;
        productDetailSection.appendChild(detailContainer);

        const whatsappContactBtn = document.getElementById('whatsappContactBtn');
        if (whatsappContactBtn) {
            // CORREÇÃO DO NÚMERO DO WHATSAPP AQUI!
            const whatsappNumber = '5551996237370'; 
            whatsappContactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const message = encodeURIComponent(`Olá! Tenho interesse no óculos "${product.name}" (R$ ${product.price.toFixed(2).replace('.', ',')}). Poderia me dar mais informações?`);
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            });
        } else {
            console.error("ERRO: Botão 'whatsappContactBtn' não encontrado após a renderização do detalhe do produto.");
        }
    }

    // --- Lógica da Seção "Sobre Nós" ---
    function renderAboutUsContent() {
        if (!aboutUsSection) {
            console.error("ERRO: Elemento com ID 'aboutUsSection' não encontrado.");
            return;
        }
        aboutUsSection.innerHTML = `
            <div class="about-us-container">
                <h2>Sobre Nós - A Equipe por Trás da Osiris Apparel</h2>
                <p class="intro-text">Somos apaixonados por design, inovação e, acima de tudo, por oferecer óculos de sol que não apenas protegem seus olhos, mas também elevam seu estilo. Conheça as mentes por trás da Osiris Apparel:</p>
                <div class="owners-grid">
                    ${owners.map(owner => `
                        <div class="owner-card">
                            <img src="${owner.photoUrl}" alt="${owner.name}" class="owner-photo">
                            <h3>${owner.name}</h3>
                            <p class="owner-role">${owner.role}</p>
                            <p class="owner-bio">${owner.bio}</p>
                            <div class="owner-social-media">
                                ${owner.socialMedia.instagram ? `<a href="${owner.socialMedia.instagram}" target="_blank" title="Instagram"><i class="bi bi-instagram"></i></a>` : ''}
                                ${owner.socialMedia.linkedin ? `<a href="${owner.socialMedia.linkedin}" target="_blank" title="LinkedIn"><i class="bi bi-linkedin"></i></a>` : ''}
                                ${owner.socialMedia.twitter ? `<a href="${owner.socialMedia.twitter}" target="_blank" title="Twitter/X"><i class="bi bi-twitter-x"></i></a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // --- Inicialização: Exibe a página inicial ao carregar o site ---
    console.log("Chamando showSection('homeSection') para iniciar.");
    showSection('homeSection');
});