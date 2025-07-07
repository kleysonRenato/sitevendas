// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos Elementos HTML ---
    const homeSection = document.getElementById('homeSection');
    const allProductsSection = document.getElementById('allProductsSection');
    const productDetailSection = document.getElementById('productDetailSection');
    const aboutUsSection = document.getElementById('aboutUsSection');

    const header = document.querySelector('header'); // Referência ao cabeçalho
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
    const closeMenuBtn = document.createElement('button');
    closeMenuBtn.classList.add('close-btn');
    closeMenuBtn.innerHTML = '<i class="bi bi-x-lg"></i>'; // Ícone de 'x' para fechar
    mainNav.prepend(closeMenuBtn); // Adiciona o botão de fechar ao início do menu

    // --- LISTA DE PRODUTOS (EDIÇÃO MANUAL) ---
    // ##################################################################################
    // ############################# EDITE AQUI OS PRODUTOS ###########################
    // ##################################################################################
    let products = [
        {
            id: '1', // ID único para o produto (pode ser qualquer string)
            name: 'Óculos Urban Cool', // NOME DO PRODUTO
            price: 129.90, // PREÇO DO PRODUTO (use ponto para decimais)
            description: 'Estilo arrojado para as ruas da cidade. Lentes polarizadas para máxima proteção UV400. Armação leve e resistente, ideal para uso diário e aventuras urbanas.', // DESCRIÇÃO COMPLETA
            imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/ss.png?raw=true' // URL DA IMAGEM
        },
        {
            id: '2',
            name: 'juju',
            price: 159.90,
            description: 'Um clássico repaginado com um toque moderno. Perfeito para qualquer ocasião, oferecendo visão nítida e proteção contra raios solares intensos. Acabamento premium.',
            imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/fotojuju.png?raw=true'
        },
        {
            id: '3',
            name: 'Bold Hipster',
            price: 99.90,
            description: 'Design único para quem não tem medo de se destacar. Armação robusta e lentes com filtro de luz azul, ideal para uso prolongado em frente a telas ou ao ar livre.',
            imageUrl: 'https://github.com/kleysonRenato/sitevendas/blob/main/Imagenssite/juju.png?raw=true'
        },
        {
            id: '4',
            name: 'Vintage Edge',
            price: 110.00,
            description: 'Óculos com inspiração retrô e toque contemporâneo. Ideal para quem busca um visual autêntico e cheio de personalidade.',
            imageUrl: 'https://images.unsplash.com/photo-1626871146602-df982a2254aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: '5',
            name: 'Modern Minimalist',
            price: 85.50,
            description: 'Linhas limpas e design discreto. Conforto e elegância para o dia a dia, com lentes que oferecem proteção total.',
            imageUrl: 'https://images.unsplash.com/photo-1579549320698-c64a51e626e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        // Para ADICIONAR UM NOVO ÓCULOS, COLOQUE UMA VÍRGULA NO FINAL DO ÚLTIMO ITEM ACIMA
        // E ADICIONE UM NOVO OBJETO COMO ESTE:
        /*
        ,
        {
            id: '6', // Altere para um ID único, ex: '6', 'novo-modelo'
            name: 'Nome do Seu Novo Óculos', // O nome que aparecerá
            price: 200.00, // O preço
            description: 'Uma descrição incrível sobre seu novo óculos com detalhes e benefícios.', // A descrição
            imageUrl: 'https://url-da-sua-nova-imagem-aqui.jpg' // A URL da imagem
        }
        */
    ];
    // ##################################################################################
    // ################################# FIM DA EDIÇÃO ################################
    // ##################################################################################

    // --- Dados dos Donos do Site (EDITAR AQUI) ---
    // ##################################################################################
    // ########################## EDITE AQUI AS INFORMAÇÕES DOS DONOS #################
    // ##################################################################################
    const owners = [
        {
            name: 'João Silva',
            role: 'Fundador & Designer Chefe',
            bio: 'Com mais de 10 anos de experiência em design de moda e paixão por óculos, João lidera a criação de nossos modelos exclusivos, unindo estética e funcionalidade.',
            photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            socialMedia: {
                instagram: 'https://instagram.com/joaosilva',
                linkedin: 'https://linkedin.com/in/joaosilva'
            }
        },
        {
            name: 'Maria Oliveira',
            role: 'Diretora de Marketing',
            bio: 'Especialista em branding e comunicação digital, Maria é a mente por trás da nossa presença online, garantindo que a Osiris Apparel chegue a quem busca estilo e qualidade.',
            photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            socialMedia: {
                instagram: 'https://instagram.com/mariaoliveira',
                twitter: 'https://twitter.com/maria'
            }
        }
        // Para ADICIONAR MAIS DONOS, COLOQUE UMA VÍRGULA NO FINAL DO ÚLTIMO ITEM ACIMA
        // E ADICIONE UM NOVO OBJETO COMO ESTE:
        /*
        ,
        {
            name: 'Nome do Novo Dono',
            role: 'Cargo do Novo Dono',
            bio: 'Uma breve biografia sobre a pessoa e sua contribuição para a empresa.',
            photoUrl: 'https://url-da-foto-do-novo-dono.jpg',
            socialMedia: {
                instagram: 'https://instagram.com/novodono'
            }
        }
        */
    ];
    // ##################################################################################
    // ############################ FIM DA EDIÇÃO DOS DONOS ###########################
    // ##################################################################################


    // --- Funções de Navegação de Páginas ---
    function showSection(sectionId, productId = null) {
        // Esconde todas as seções (main > section)
        document.querySelectorAll('main .page-section').forEach(section => {
            section.classList.remove('active');
        });

        // Mostra a seção desejada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');

            // Lógicas específicas ao exibir cada seção
            if (sectionId === 'homeSection') {
                renderFeaturedProducts(); // Renderiza APENAS os destaques
            } else if (sectionId === 'allProductsSection') {
                renderAllProducts(); // Renderiza TODOS os produtos
            } else if (sectionId === 'productDetailSection' && productId) {
                renderProductDetails(productId);
            } else if (sectionId === 'aboutUsSection') {
                renderAboutUsContent(); // Renderiza o conteúdo da seção "Sobre Nós"
            }
            // Rola para o topo da página após a navegação
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Garante que o menu lateral seja fechado ao navegar
        mainNav.classList.remove('active');
        // Em mobile, quando uma seção é mostrada, o menu hambúrguer deve estar visível se o cabeçalho estiver escondido
        // ou o cabeçalho deve estar visível.
        if (window.innerWidth <= 768) {
            // Se o menu lateral foi fechado, e estamos em mobile, o hambúrguer deve sumir se o cabeçalho voltar,
            // ou aparecer se o cabeçalho sumir.
            if (header.classList.contains('hidden')) {
                 hamburgerMenu.classList.add('visible');
            } else {
                 hamburgerMenu.classList.remove('visible');
            }
        }
    }

    // --- Event Listeners para Navegação ---
    // O botão Home e o logo sempre voltam para a página inicial
    navHomeBtn.addEventListener('click', () => showSection('homeSection'));

    navAllProductsBtn.addEventListener('click', () => showSection('allProductsSection'));
    navAboutUsBtn.addEventListener('click', () => showSection('aboutUsSection'));

    // Botões de exploração e visualização na Home Section
    exploreProductsBtn.addEventListener('click', () => {
        // Rola suavemente para a seção de produtos em destaque na home
        document.querySelector('.products-showcase').scrollIntoView({ behavior: 'smooth' });
    });
    viewAllProductsBtn.addEventListener('click', () => {
        showSection('allProductsSection');
    });

    // LÓGICA PARA O MENU HAMBÚRGUER (em mobile)
    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Abre/fecha o menu lateral
        // O hambúrguer deve ficar escondido quando o menu lateral está aberto
        hamburgerMenu.classList.toggle('visible');
    });

    // Botão para fechar o menu lateral (o "X")
    closeMenuBtn.addEventListener('click', () => {
        mainNav.classList.remove('active');
        // Ao fechar o menu lateral, o hambúrguer deve reaparecer se o cabeçalho estiver oculto
        if (window.innerWidth <= 768 && header.classList.contains('hidden')) {
             hamburgerMenu.classList.add('visible');
        } else if (window.innerWidth <= 768) { // Se não estiver oculto, mas estamos em mobile, garante que ele não esteja visível
            hamburgerMenu.classList.remove('visible');
        }
    });

    // --- Lógica de Scroll para Esconder/Mostrar Cabeçalho e Menu Hambúrguer ---
    let lastScrollY = window.scrollY;
    // Pega a altura real do cabeçalho para saber quando ele está "fora da tela"
    // Adiciona um pequeno buffer (10px) para que o cabeçalho desapareça completamente antes do hambúrguer aparecer
    const headerTriggerHeight = header.offsetHeight + 10;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Rolando para baixo E passou da altura do cabeçalho
            if (currentScrollY > lastScrollY && currentScrollY > headerTriggerHeight) {
                header.classList.add('hidden'); // Esconde o cabeçalho
                hamburgerMenu.classList.add('visible'); // Mostra o hambúrguer
            }
            // Rolando para cima OU no topo da página
            else if (currentScrollY < lastScrollY || currentScrollY <= 0) {
                header.classList.remove('hidden'); // Mostra o cabeçalho
                hamburgerMenu.classList.remove('visible'); // Esconde o hambúrguer (quando o cabeçalho está visível)
                mainNav.classList.remove('active'); // Garante que o menu lateral feche
            }
        } else {
            // Em desktop, garante que o cabeçalho esteja sempre visível e o hambúrguer escondido
            header.classList.remove('hidden');
            hamburgerMenu.classList.remove('visible');
            mainNav.classList.remove('active'); // Sempre fechado em desktop, pois a navegação é diferente
        }

        lastScrollY = currentScrollY; // Atualiza a última posição de rolagem
    });

    // Garante que o ícone do hambúrguer se comporte corretamente ao redimensionar a janela
    window.addEventListener('resize', () => {
        // Se a tela se torna desktop
        if (window.innerWidth > 768) {
            hamburgerMenu.classList.remove('visible'); // Esconde o hambúrguer
            mainNav.classList.remove('active'); // Fecha o menu lateral
            header.classList.remove('hidden'); // Garante que o cabeçalho esteja visível
        } else {
            // Se a tela se torna mobile
            // Verifica se o cabeçalho deveria estar escondido para exibir o hambúrguer
            if (window.scrollY > header.offsetHeight && header.classList.contains('hidden')) {
                hamburgerMenu.classList.add('visible');
            } else { // Se o cabeçalho está visível no topo, esconde o hambúrguer
                hamburgerMenu.classList.remove('visible');
            }
        }
    });


    // --- Lógica da Página Inicial (Produtos em Destaque) ---
    function renderFeaturedProducts() {
        featuredProductsGrid.innerHTML = '';
        loadingFeaturedMessage.style.display = 'none';

        // Pega os 3 primeiros produtos do array 'products' para destaque
        const numberOfFeatured = 3;
        const featuredProducts = products.slice(0, numberOfFeatured);

        if (featuredProducts.length === 0) {
            featuredProductsGrid.innerHTML = '<p class="no-products-message">Nenhum óculos em destaque no momento.</p>';
            return;
        }

        featuredProducts.forEach(product => {
            const productCard = createProductCard(product);
            featuredProductsGrid.appendChild(productCard);
        });
    }

    // --- Lógica da Página de Coleção Completa ---
    function renderAllProducts() {
        allProductsGrid.innerHTML = '';
        loadingAllProductsMessage.style.display = 'none';

        if (products.length === 0) {
            allProductsGrid.innerHTML = '<p class="no-products-message">Nenhum óculos disponível na coleção completa.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = createProductCard(product);
            allProductsGrid.appendChild(productCard);
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
        productDetailSection.innerHTML = '';
        loadingDetailMessage.style.display = 'block';

        const product = products.find(p => p.id === productId);

        if (!product) {
            productDetailSection.innerHTML = '<div class="product-detail-container"><p class="no-products-message">Óculos não encontrado.</p></div>';
            loadingDetailMessage.style.display = 'none';
            return;
        }

        loadingDetailMessage.style.display = 'none';
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

        // Adicionar funcionalidade do botão WhatsApp
        document.getElementById('whatsappContactBtn').addEventListener('click', (e) => {
            e.preventDefault();
            const whatsappNumber = '55SEU_NUMERO_WHATSAPP'; // <<<<<<< ATUALIZE SEU NÚMERO AQUI COM O NÚMERO DO CLIENTE
            const message = encodeURIComponent(`Olá! Tenho interesse no óculos "${product.name}" (R$ ${product.price.toFixed(2)}). Poderia me dar mais informações?`);
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    }

    // --- Lógica da Seção "Sobre Nós" (Donos do Site) ---
    function renderAboutUsContent() {
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
    showSection('homeSection');
});