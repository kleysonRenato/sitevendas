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
    const closeMenuBtn = document.createElement('button'); // Novo botão para fechar o menu
    closeMenuBtn.classList.add('close-btn');
    closeMenuBtn.innerHTML = '<i class="bi bi-x-lg"></i>'; // Ícone de 'x' para fechar
    mainNav.prepend(closeMenuBtn); // Adiciona o botão de fechar ao início do menu


    // --- LISTA DE PRODUTOS (EDIÇÃO MANUAL) ---
    // ##################################################################################
    // ############################# EDITE AQUI OS PRODUTOS ###########################
    // ##################################################################################
    let products = [
        {
            id: '1',
            name: 'Óculos Urban Cool',
            price: 129.90,
            description: 'Estilo arrojado para as ruas da cidade. Lentes polarizadas para máxima proteção UV400. Armação leve e resistente, ideal para uso diário e aventuras urbanas.',
            imageUrl: 'https://images.unsplash.com/photo-1574621147055-661f22144365?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: '2',
            name: 'Street Vibe Aviator',
            price: 159.90,
            description: 'Um clássico repaginado com um toque moderno. Perfeito para qualquer ocasião, oferecendo visão nítida e proteção contra raios solares intensos. Acabamento premium.',
            imageUrl: 'https://images.unsplash.com/photo-1502110595393-2cecb014d5ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: '3',
            name: 'Bold Hipster',
            price: 99.90,
            description: 'Design único para quem não tem medo de se destacar. Armação robusta e lentes com filtro de luz azul, ideal para uso prolongado em frente a telas ou ao ar livre.',
            imageUrl: 'https://images.unsplash.com/photo-1620247657929-236b2f703567?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

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
        }
        // Garante que o menu lateral seja fechado ao navegar
        mainNav.classList.remove('active');
        // Se a tela for desktop, garante que o menu hambúrguer esteja oculto
        if (window.innerWidth > 768) {
            hamburgerMenu.classList.remove('visible');
        }
    }

    // --- Event Listeners para Navegação ---
    navHomeBtn.addEventListener('click', () => showSection('homeSection'));
    navAllProductsBtn.addEventListener('click', () => showSection('allProductsSection'));
    navAboutUsBtn.addEventListener('click', () => showSection('aboutUsSection'));

    exploreProductsBtn.addEventListener('click', () => {
        document.querySelector('.products-showcase').scrollIntoView({ behavior: 'smooth' });
    });
    viewAllProductsBtn.addEventListener('click', () => {
        showSection('allProductsSection');
    });

    // LÓGICA PARA O MENU HAMBÚRGUER
    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Abre/fecha o menu lateral
    });

    // Botão para fechar o menu lateral
    closeMenuBtn.addEventListener('click', () => {
        mainNav.classList.remove('active');
    });

    // --- Lógica de Scroll para Esconder/Mostrar Cabeçalho e Menu Hambúrguer ---
    let lastScrollY = window.scrollY;
    const headerHeight = header.offsetHeight; // Altura do cabeçalho

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Se estiver rolando para baixo
        if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
            header.classList.add('hidden'); // Esconde o cabeçalho
            if (window.innerWidth <= 768) { // Apenas em telas menores, mostra o hambúrguer
                hamburgerMenu.classList.add('visible');
            }
        }
        // Se estiver rolando para cima ou no topo da página
        else if (currentScrollY < lastScrollY || currentScrollY <= headerHeight) {
            header.classList.remove('hidden'); // Mostra o cabeçalho
            if (window.innerWidth <= 768) { // Apenas em telas menores, esconde o hambúrguer
                hamburgerMenu.classList.remove('visible');
                mainNav.classList.remove('active'); // Garante que o menu lateral feche
            }
        }

        lastScrollY = currentScrollY; // Atualiza a última posição de rolagem
    });

    // Garante que o ícone do hambúrguer se comporte corretamente ao redimensionar
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburgerMenu.classList.remove('visible');
            mainNav.classList.remove('active');
        } else {
            // Se estiver em mobile e rolar para baixo, o hambúrguer já estará visível
            if (window.scrollY > header.offsetHeight && !header.classList.contains('hidden')) {
                hamburgerMenu.classList.add('visible');
            }
        }
    });


    // --- Lógica da Página Inicial (Produtos em Destaque) ---
    function renderFeaturedProducts() {
        featuredProductsGrid.innerHTML = '';
        loadingFeaturedMessage.style.display = 'none';

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