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

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainNav = document.getElementById('mainNav');

    // Cria e adiciona o botão de fechar o menu lateral
    // Importante: Verifica se mainNav existe antes de tentar manipulá-lo
    if (mainNav) {
        console.log("mainNav encontrado. Criando botão de fechar.");
        const closeMenuBtn = document.createElement('button');
        closeMenuBtn.classList.add('close-btn');
        closeMenuBtn.innerHTML = '<i class="bi bi-x-lg"></i>'; 
        mainNav.prepend(closeMenuBtn); 

        // Adiciona o listener para o botão de fechar o menu lateral
        closeMenuBtn.addEventListener('click', () => {
            mainNav.classList.remove('active');
            // Ao fechar o menu lateral, o hambúrguer deve reaparecer se o cabeçalho estiver oculto
            if (window.innerWidth <= 768 && header && header.classList.contains('hidden') && hamburgerMenu) {
                hamburgerMenu.classList.add('visible');
            } else if (window.innerWidth <= 768 && hamburgerMenu) {
                hamburgerMenu.classList.remove('visible');
            }
        });
    } else {
        console.error("ERRO: Elemento com ID 'mainNav' não encontrado. O menu lateral pode não funcionar.");
    }

    // --- LISTA DE PRODUTOS ---
    let products = [
        { id: '1', name: 'KIT RADAR 5 LENTES', price: 279.90, description: 'Estilo arrojado para as ruas da cidade. Lentes polarizadas para máxima proteção UV400. Armação leve e resistente, ideal para uso diário e aventuras urbanas.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/kitradar5lentes.png?raw=true' },
        { id: '2', name: 'PLANTARIS ', price: 119.90, description: 'Um clássico repaginado com um toque moderno. Perfeito para qualquer ocasião, oferecendo visão nítida e proteção contra raios solares intensos. Acabamento premium.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/plantaris.png?raw=true' },
        { id: '3', name: 'PLATE', price: 119.90, description: 'Design único para quem não tem medo de se destacar. Armação robusta e lentes com filtro de luz azul, ideal para uso prolongado em frente a telas ou ao ar livre.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/plate.png?raw=true' },
        { id: '4', name: 'PENNY', price: 119.00, description: 'Óculos com inspiração retrô e toque contemporâneo. Ideal para quem busca um visual autêntico e cheio de personalidade.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/penny.png?raw=true' },
        { id: '5', name: 'JULIET ', price: 119.0, description: 'Linhas limpas e design discreto. Conforto e elegância para o dia a dia, com lentes que oferecem proteção total.', imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/juliet.png?raw=true' }
    ];
    console.log("Produtos carregados. Total: ", products.length);

    // --- Dados dos Donos do Site ---
    const owners = [
        { name: 'Felipe J.', role: 'Fundador', bio: '', photoUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/fotolipe.png?raw=true', socialMedia: { instagram: 'https://instagram.com/joaosilva' } },
        { name: 'Guilherme O.', role: 'Fundador', bio: '', photoUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/fotogui.png?raw=true', socialMedia: { instagram: 'https://instagram.com/mariaoliveira' } }
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
        
        // Garante que o menu lateral seja fechado ao navegar (em mobile)
        if (mainNav) { 
            mainNav.classList.remove('active');
        }

        // Em mobile, controla a visibilidade do hambúrguer após a navegação
        if (window.innerWidth <= 768 && hamburgerMenu && header) { 
            if (header.classList.contains('hidden')) {
                hamburgerMenu.classList.add('visible');
            } else {
                hamburgerMenu.classList.remove('visible');
            }
        }
    }

    // --- Event Listeners para Navegação ---
    // Verifica se os botões existem antes de adicionar event listeners
    if (navHomeBtn) {
        navHomeBtn.addEventListener('click', () => showSection('homeSection'));
    } else { console.error("ERRO: Elemento com ID 'navHome' não encontrado."); }
    
    if (navAllProductsBtn) {
        navAllProductsBtn.addEventListener('click', () => showSection('allProductsSection'));
    } else { console.error("ERRO: Elemento com ID 'navAllProducts' não encontrado."); }
    
    if (navAboutUsBtn) {
        navAboutUsBtn.addEventListener('click', () => showSection('aboutUsSection'));
    } else { console.error("ERRO: Elemento com ID 'navAboutUs' não encontrado."); }
    
    if (exploreProductsBtn) {
        exploreProductsBtn.addEventListener('click', () => {
            const productsShowcase = document.querySelector('.products-showcase');
            if (productsShowcase) {
                productsShowcase.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn("AVISO: Elemento com classe '.products-showcase' não encontrado para rolar.");
            }
        });
    } else { console.error("ERRO: Elemento com ID 'exploreProductsBtn' não encontrado."); }

    if (viewAllProductsBtn) {
        viewAllProductsBtn.addEventListener('click', () => {
            showSection('allProductsSection');
        });
    } else { console.error("ERRO: Elemento com ID 'viewAllProductsBtn' não encontrado."); }

    // Lógica para o menu hambúrguer em mobile
    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active'); 
            hamburgerMenu.classList.toggle('visible');
        });
    } else { console.error("ERRO: Elementos 'hamburgerMenu' ou 'mainNav' não encontrados. Menu hambúrguer pode não funcionar."); }

    // --- Lógica de Scroll para Esconder/Mostrar Cabeçalho e Menu Hambúrguer ---
    let lastScrollY = window.scrollY;
    // Pega a altura real do cabeçalho para saber quando ele está "fora da tela"
    const headerTriggerHeight = header ? header.offsetHeight + 10 : 0; // Verifica se 'header' existe

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            if (header && hamburgerMenu && mainNav) { 
                if (currentScrollY > lastScrollY && currentScrollY > headerTriggerHeight) {
                    header.classList.add('hidden'); 
                    hamburgerMenu.classList.add('visible'); 
                } else if (currentScrollY < lastScrollY || currentScrollY <= 0) {
                    header.classList.remove('hidden'); 
                    hamburgerMenu.classList.remove('visible'); 
                    mainNav.classList.remove('active'); 
                }
            }
        } else {
            // Em desktop, garante que o cabeçalho esteja sempre visível e o hambúrguer escondido
            if (header) { header.classList.remove('hidden'); }
            if (hamburgerMenu) { hamburgerMenu.classList.remove('visible'); }
            if (mainNav) { mainNav.classList.remove('active'); }
        }
        lastScrollY = currentScrollY; 
    });

    // Garante comportamento correto ao redimensionar a janela
    window.addEventListener('resize', () => {
        if (header && hamburgerMenu && mainNav) { 
            if (window.innerWidth > 768) {
                hamburgerMenu.classList.remove('visible'); 
                mainNav.classList.remove('active'); 
                header.classList.remove('hidden'); 
            } else {
                if (window.scrollY > header.offsetHeight && header.classList.contains('hidden')) {
                    hamburgerMenu.classList.add('visible');
                } else { 
                    hamburgerMenu.classList.remove('visible');
                }
            }
        }
    });


    // --- Lógica da Página Inicial (Produtos em Destaque) ---
    function renderFeaturedProducts() {
        console.log("Iniciando renderFeaturedProducts...");
        if (!featuredProductsGrid) {
            console.error("ERRO: Elemento com ID 'featuredProductsGrid' não encontrado no HTML para renderizar produtos em destaque.");
            return;
        }
        featuredProductsGrid.innerHTML = ''; // Limpa o grid
        
        if (loadingFeaturedMessage) {
            console.log("Escondendo loadingFeaturedMessage.");
            loadingFeaturedMessage.style.display = 'none'; // Esconde a mensagem de carregamento
        } else {
            console.warn("AVISO: Elemento 'loadingFeaturedMessage' não encontrado.");
        }

        const numberOfFeatured = 3;
        const featuredProducts = products.slice(0, numberOfFeatured);
        console.log("Produtos em destaque selecionados:", featuredProducts.length, featuredProducts);


        if (featuredProducts.length === 0) {
            featuredProductsGrid.innerHTML = '<p class="no-products-message">Nenhum óculos em destaque no momento.</p>';
            console.log("Nenhum produto em destaque para mostrar.");
            return;
        }

        featuredProducts.forEach((product, index) => {
            try {
                const productCard = createProductCard(product);
                featuredProductsGrid.appendChild(productCard);
                console.log(`Produto em destaque #${index + 1} (${product.name}) adicionado.`);
            } catch (e) {
                console.error(`ERRO ao criar ou adicionar card do produto em destaque "${product.name}" (ID: ${product.id}):`, e);
            }
        });
        console.log("Finalizado renderFeaturedProducts.");
    }

    // --- Lógica da Página de Coleção Completa ---
    function renderAllProducts() {
        console.log("Iniciando renderAllProducts...");
        if (!allProductsGrid) {
            console.error("ERRO: Elemento com ID 'allProductsGrid' não encontrado no HTML para renderizar todos os produtos.");
            return;
        }
        allProductsGrid.innerHTML = '';
        if (loadingAllProductsMessage) {
            console.log("Escondendo loadingAllProductsMessage.");
            loadingAllProductsMessage.style.display = 'none';
        } else {
            console.warn("AVISO: Elemento 'loadingAllProductsMessage' não encontrado.");
        }

        if (products.length === 0) {
            allProductsGrid.innerHTML = '<p class="no-products-message">Nenhum óculos disponível na coleção completa.</p>';
            console.log("Nenhum produto na coleção completa para mostrar.");
            return;
        }

        products.forEach((product, index) => {
            try {
                const productCard = createProductCard(product);
                allProductsGrid.appendChild(productCard);
                console.log(`Produto completo #${index + 1} (${product.name}) adicionado.`);
            } catch (e) {
                console.error(`ERRO ao criar ou adicionar card do produto completo "${product.name}" (ID: ${product.id}):`, e);
            }
        });
        console.log("Finalizado renderAllProducts.");
    }

    // --- Função Auxiliar para Criar Card de Produto (Reutilizável) ---
    function createProductCard(product) {
        console.log("Criando card para:", product.name);
        const productCard = document.createElement('a');
        productCard.href = '#';
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">R$ ${product.price.toFixed(2)}</p>
            </div>
        `;
        productCard.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('productDetailSection', product.id);
        });
        return productCard;
    }

    // --- Lógica da Página de Detalhes do Produto (Clientes) ---
    function renderProductDetails(productId) {
        console.log(`Iniciando renderProductDetails para ID: ${productId}`);
        if (!productDetailSection) {
            console.error("ERRO: Elemento com ID 'productDetailSection' não encontrado.");
            return;
        }
        productDetailSection.innerHTML = '';
        if (loadingDetailMessage) {
            loadingDetailMessage.style.display = 'none';
        } else {
            console.warn("AVISO: Elemento 'loadingDetailMessage' não encontrado.");
        }

        const product = products.find(p => p.id === productId);

        if (!product) {
            productDetailSection.innerHTML = '<div class="product-detail-container"><p class="no-products-message">Óculos não encontrado.</p></div>';
            console.warn(`AVISO: Produto com ID '${productId}' não encontrado.`);
            return;
        }

        const detailContainer = document.createElement('div');
        detailContainer.classList.add('product-detail-container');
        detailContainer.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">R$ ${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <a href="#" id="whatsappContactBtn" class="btn-whatsapp">
                <i class="bi bi-whatsapp"></i> Chamar no WhatsApp
            </a>
            <button class="btn btn-secondary" style="margin-top: 15px;" onclick="history.back()">Voltar para a Coleção</button>
        `;
        productDetailSection.appendChild(detailContainer);

        const whatsappContactBtn = document.getElementById('whatsappContactBtn');
        if (whatsappContactBtn) {
            // CORREÇÃO DO NÚMERO DO WHATSAPP AQUI!
            const whatsappNumber = '5551997343582'; 
            whatsappContactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const message = encodeURIComponent(`Olá! Tenho interesse no óculos "${product.name}" (R$ ${product.price.toFixed(2)}). Poderia me dar mais informações?`);
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            });
        } else {
            console.error("ERRO: Botão 'whatsappContactBtn' não encontrado após a renderização do detalhe do produto.");
        }
        console.log("Finalizado renderProductDetails.");
    }

    // --- Lógica da Seção "Sobre Nós" (Donos do Site) ---
    function renderAboutUsContent() {
        console.log("Iniciando renderAboutUsContent...");
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
        console.log("Finalizado renderAboutUsContent.");
    }

    // --- Inicialização: Exibe a página inicial ao carregar o site ---
    console.log("Chamando showSection('homeSection') para iniciar.");
    showSection('homeSection');
});