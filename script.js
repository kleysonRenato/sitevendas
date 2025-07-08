// Função principal para exibir seções da página
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0); // Volta para o topo da página ao mudar de seção
}

// URLs da API (Mantenha as URLs reais da sua API)
const API_URL_PRODUCTS = 'http://localhost:3000/products';
const API_URL_ABOUT = 'http://localhost:3000/about'; // Se você tiver uma API para o "Sobre Nós"

// Referências aos elementos HTML onde os conteúdos serão exibidos
const featuredProductsGrid = document.getElementById('featuredProductsGrid');
const allProductsGrid = document.getElementById('allProductsGrid');
const productDetailContainer = document.querySelector('#productDetailSection .container');
const aboutUsContainer = document.getElementById('aboutUsSection').querySelector('.container');

// Mensagens de carregamento
const loadingFeaturedMessage = document.getElementById('loadingFeaturedMessage');
const loadingAllProductsMessage = document.getElementById('loadingAllProductsMessage');
const loadingDetailMessage = document.getElementById('loadingDetailMessage');

// --- Funções de Carregamento e Exibição de Conteúdo ---

// Função para renderizar um card de produto
function renderProductCard(product) {
    const productCard = document.createElement('a');
    productCard.href = `#product-${product.id}`; // Link para a página de detalhes do produto
    productCard.className = 'product-card';
    productCard.dataset.productId = product.id; // Armazena o ID do produto para uso futuro

    productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
        </div>
    `;

    // Adiciona o event listener para exibir os detalhes do produto ao clicar no card
    productCard.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o comportamento padrão do link
        fetchAndDisplayProductDetails(product.id);
    });

    return productCard;
}

// Função para buscar e exibir produtos em destaque (primeiros 3)
async function fetchAndDisplayFeaturedProducts() {
    featuredProductsGrid.innerHTML = ''; // Limpa o grid
    loadingFeaturedMessage.style.display = 'flex'; // Mostra mensagem de carregamento

    try {
        const response = await fetch(API_URL_PRODUCTS);
        if (!response.ok) {
            throw new Error('Erro ao carregar produtos em destaque.');
        }
        const products = await response.json();

        loadingFeaturedMessage.style.display = 'none'; // Esconde mensagem de carregamento

        if (products.length > 0) {
            products.slice(0, 3).forEach(product => { // Pega apenas os 3 primeiros para destaque
                featuredProductsGrid.appendChild(renderProductCard(product));
            });
        } else {
            featuredProductsGrid.innerHTML = '<p class="no-products-message">Nenhum produto em destaque para mostrar.</p>';
        }
    } catch (error) {
        console.error("Erro ao buscar produtos em destaque:", error);
        loadingFeaturedMessage.innerHTML = '<p class="no-products-message">Erro ao carregar produtos em destaque. Tente novamente.</p>';
    }
}

// Função para buscar e exibir todos os produtos
async function fetchAndDisplayAllProducts() {
    allProductsGrid.innerHTML = ''; // Limpa o grid
    loadingAllProductsMessage.style.display = 'flex'; // Mostra mensagem de carregamento

    try {
        const response = await fetch(API_URL_PRODUCTS);
        if (!response.ok) {
            throw new Error('Erro ao carregar todos os produtos.');
        }
        const products = await response.json();

        loadingAllProductsMessage.style.display = 'none'; // Esconde mensagem de carregamento

        if (products.length > 0) {
            products.forEach(product => {
                allProductsGrid.appendChild(renderProductCard(product));
            });
        } else {
            allProductsGrid.innerHTML = '<p class="no-products-message">Nenhum produto para mostrar na coleção completa.</p>';
        }
    } catch (error) {
        console.error("Erro ao buscar todos os produtos:", error);
        loadingAllProductsMessage.innerHTML = '<p class="no-products-message">Erro ao carregar todos os produtos. Tente novamente.</p>';
    }
}

// Função para buscar e exibir detalhes de um produto específico
async function fetchAndDisplayProductDetails(productId) {
    productDetailContainer.innerHTML = ''; // Limpa o conteúdo anterior
    loadingDetailMessage.style.display = 'flex'; // Mostra mensagem de carregamento
    showSection('productDetailSection'); // Garante que a seção de detalhes está visível

    try {
        const response = await fetch(API_URL_PRODUCTS); // Ou uma rota específica para um único produto se sua API tiver
        if (!response.ok) {
            throw new Error('Erro ao carregar os produtos.');
        }
        const products = await response.json();
        const product = products.find(p => p.id === productId); // Encontra o produto pelo ID

        if (product) {
            loadingDetailMessage.style.display = 'none'; // Esconde mensagem de carregamento

            // Conteúdo HTML dos detalhes do produto (SEM o botão "Voltar para a Coleção")
            productDetailContainer.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <p class="description">${product.description}</p>
                <a href="https://wa.me/SEU_NUMERO_WHATSAPP?text=Olá! Tenho interesse no óculos ${product.name} (ID: ${product.id})." target="_blank" class="btn btn-whatsapp">
                    <i class="bi bi-whatsapp"></i> Comprar via WhatsApp
                </a>
            `;

        } else {
            loadingDetailMessage.innerHTML = '<p>Produto não encontrado.</p>';
        }

    } catch (error) {
        console.error("Erro ao carregar detalhes do produto:", error);
        loadingDetailMessage.innerHTML = '<p>Erro ao carregar detalhes do produto. Tente novamente mais tarde.</p>';
    }
}

// Função para renderizar o conteúdo da seção "Sobre Nós"
async function renderAboutUsContent() {
    aboutUsContainer.innerHTML = ''; // Limpa o conteúdo anterior
    // Para este exemplo, vamos injetar um conteúdo fixo se não tiver API_URL_ABOUT
    // Se você tiver uma API para 'about', substitua por uma chamada fetch

    // Conteúdo fixo para "Sobre Nós"
    const aboutContent = `
        <h2>Sobre Nós</h2>
        <p class="intro-text">
            Na Osiris Apparel, acreditamos que óculos de sol são mais do que apenas proteção para os olhos – são uma declaração de estilo e personalidade. Fundada em 2025, nossa missão é oferecer óculos de alta qualidade que combinem design moderno, conforto e a proteção UV essencial.
        </p>

        <h3>Nossa Equipe</h3>
        <div class="owners-grid">
            <div class="owner-card">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nome do Fundador 1" class="owner-photo">
                <h3>Isabela Costa</h3>
                <p class="owner-role">Fundadora & CEO</p>
                <p class="owner-bio">
                    Com paixão por moda e inovação, Isabela lidera a Osiris Apparel com uma visão de criar tendências e garantir a satisfação dos clientes.
                </p>
                <div class="owner-social-media">
                    <a href="#" target="_blank"><i class="bi bi-linkedin"></i></a>
                    <a href="#" target="_blank"><i class="bi bi-instagram"></i></a>
                </div>
            </div>

            <div class="owner-card">
                <img src="https://images.unsplash.com/photo-1564564321837-a12b07a51c4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nome do Fundador 2" class="owner-photo">
                <h3>Ricardo Almeida</h3>
                <p class="owner-role">Diretor de Design</p>
                <p class="owner-bio">
                    Responsável por cada detalhe estético, Ricardo traz expertise e criatividade para o desenvolvimento de cada nova coleção.
                </p>
                <div class="owner-social-media">
                    <a href="#" target="_blank"><i class="bi bi-linkedin"></i></a>
                    <a href="#" target="_blank"><i class="bi bi-twitter"></i></a>
                </div>
            </div>
        </div>
    `;
    aboutUsContainer.innerHTML = aboutContent;
}

// --- Listeners de Eventos ---

// Listener para o link "Home" no logo
document.getElementById('navHome').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('homeSection');
    fetchAndDisplayFeaturedProducts(); // Recarrega os produtos em destaque na home
});

// Listener para o link "Coleção"
document.getElementById('navAllProducts').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('allProductsSection');
    fetchAndDisplayAllProducts(); // Carrega e exibe todos os produtos
});

// Listener para o link "Sobre Nós"
document.getElementById('navAboutUs').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('aboutUsSection');
    renderAboutUsContent(); // Carrega e exibe o conteúdo "Sobre Nós"
});

// Listener para o botão "Explorar Produtos" na Hero Section
document.getElementById('exploreProductsBtn').addEventListener('click', () => {
    showSection('allProductsSection');
    fetchAndDisplayAllProducts(); // Carrega e exibe todos os produtos
});

// Listener para o botão "Ver Coleção Completa" na Home Section
document.getElementById('viewAllProductsBtn').addEventListener('click', () => {
    showSection('allProductsSection');
    fetchAndDisplayAllProducts(); // Carrega e exibe todos os produtos
});

// --- Inicialização da Página ---
document.addEventListener('DOMContentLoaded', () => {
    showSection('homeSection'); // Garante que a seção Home é a primeira a ser mostrada
    fetchAndDisplayFeaturedProducts(); // Carrega os produtos em destaque ao carregar a página
});