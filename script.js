// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos Elementos HTML ---
    const homeSection = document.getElementById('homeSection');
    const allProductsSection = document.getElementById('allProductsSection');
    const productDetailSection = document.getElementById('productDetailSection');

    const navHomeBtn = document.getElementById('navHome');
    const navAllProductsBtn = document.getElementById('navAllProducts');
    // const navAdminBtn = document.getElementById('navAdmin'); // Este botão será removido ou não terá funcionalidade
    const exploreProductsBtn = document.getElementById('exploreProductsBtn');
    const viewAllProductsBtn = document.getElementById('viewAllProductsBtn');

    // Elementos do painel administrativo não são mais necessários
    // const adminLoginForm = document.getElementById('adminLoginForm');
    // const adminEmailInput = document.getElementById('adminEmail');
    // const adminPasswordInput = document.getElementById('adminPassword');
    // const loginMessage = document.getElementById('loginMessage');
    // const productForm = document.getElementById('productForm');
    // const productIdInput = document.getElementById('productId');
    // const productNameInput = document.getElementById('productName');
    // const productPriceInput = document.getElementById('productPrice');
    // const productDescriptionInput = document.getElementById('productDescription');
    // const productImageURLInput = document.getElementById('productImageURL');
    // const saveProductBtn = document.getElementById('saveProductBtn');
    // const cancelEditBtn = document.getElementById('cancelEditBtn');
    // const productMessage = document.getElementById('productMessage');
    // const adminProductsList = document.getElementById('adminProductsList');
    // const adminLogoutBtn = document.getElementById('adminLogoutBtn');


    const featuredProductsGrid = document.getElementById('featuredProductsGrid');
    const loadingFeaturedMessage = document.getElementById('loadingFeaturedMessage');
    const allProductsGrid = document.getElementById('allProductsGrid');
    const loadingAllProductsMessage = document.getElementById('loadingAllProductsMessage');

    const loadingDetailMessage = document.getElementById('loadingDetailMessage');

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainNav = document.getElementById('mainNav');

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
            imageUrl: 'https://images.unsplash.com/photo-1574621147055-661f22144365?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // URL DA IMAGEM
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
            imageUrl: 'https://images.unsplash.com/photo-1579549320698-c64a51e626e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // A URL da imagem
        }
        */
        // Para EDITAR um óculos existente, encontre-o na lista acima e altere os valores.
        // Para REMOVER um óculos, exclua o objeto completo dele na lista.
    ];
    // ##################################################################################
    // ################################# FIM DA EDIÇÃO ################################
    // ##################################################################################


    // --- Funções de Navegação de Páginas ---
    function showSection(sectionId, productId = null) {
        // Esconde todas as seções
        document.querySelectorAll('.page-section').forEach(section => {
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
            }
            // Rola para o topo da página após a navegação
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // FECHA O MENU HAMBÚRGUER AO NAVEGAR
        mainNav.classList.remove('active');
    }

    // --- Event Listeners para Navegação ---
    navHomeBtn.addEventListener('click', () => showSection('homeSection'));
    navAllProductsBtn.addEventListener('click', () => showSection('allProductsSection'));

    // O botão "Admin" não tem mais funcionalidade ou deve ser removido do HTML
    // if (navAdminBtn) {
    //     navAdminBtn.addEventListener('click', () => alert('A área administrativa foi desativada. As alterações de produtos são feitas diretamente no código.'));
    // }

    // Botões de exploração e visualização na Home Section
    exploreProductsBtn.addEventListener('click', () => {
        // Rola suavemente para a seção de produtos em destaque na home
        document.querySelector('.products-showcase').scrollIntoView({ behavior: 'smooth' });
    });
    viewAllProductsBtn.addEventListener('click', () => {
        showSection('allProductsSection');
    });

    // LÓGICA PARA O MENU HAMBÚRGUER
    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Adiciona/remove a classe 'active'
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

    // --- Inicialização: Exibe a página inicial ao carregar o site ---
    showSection('homeSection');
});