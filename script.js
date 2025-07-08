// Assumindo que você tem uma função para mostrar as seções
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0); // Volta para o topo da página ao mudar de seção
}

// ... (outras variáveis e funções do seu script.js) ...

// Função para exibir os detalhes de um produto específico
// (Ajuste o nome desta função se for diferente no seu código, ex: renderProductDetails)
async function fetchAndDisplayProductDetails(productId) {
    const productDetailContainer = document.querySelector('#productDetailSection .container');
    const loadingMessage = document.getElementById('loadingDetailMessage');

    // Limpa o conteúdo anterior e mostra a mensagem de carregamento
    productDetailContainer.innerHTML = '';
    loadingMessage.style.display = 'flex';
    showSection('productDetailSection'); // Garante que a seção de detalhes está visível

    try {
        const response = await fetch('http://localhost:3000/products'); // Ou sua API de produtos
        if (!response.ok) {
            throw new Error('Erro ao carregar os produtos.');
        }
        const products = await response.json();
        const product = products.find(p => p.id === productId);

        if (product) {
            // Esconde a mensagem de carregamento
            loadingMessage.style.display = 'none';

            // Conteúdo HTML dos detalhes do produto
            productDetailContainer.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <p class="description">${product.description}</p>
                <a href="https://wa.me/SEU_NUMERO_WHATSAPP?text=Olá! Tenho interesse no óculos ${product.name} (ID: ${product.id})." target="_blank" class="btn btn-whatsapp">
                    <i class="bi bi-whatsapp"></i> Comprar via WhatsApp
                </a>
                <div id="backButtonContainer" style="margin-top: 30px;"></div>
            `;

            // --- CÓDIGO PARA CRIAR E ADICIONAR O BOTÃO "VOLTAR PARA A COLEÇÃO" ---
            const backButtonContainer = document.getElementById('backButtonContainer');
            const backToCollectionBtn = document.createElement('button');
            backToCollectionBtn.textContent = 'Voltar para a Coleção';
            backToCollectionBtn.className = 'btn btn-secondary'; // Usa a classe de botão secundário
            backToCollectionBtn.style.marginTop = '20px'; // Adiciona um espaço acima do botão

            backToCollectionBtn.addEventListener('click', () => {
                showSection('allProductsSection'); // Volta para a seção de todos os produtos
            });

            backButtonContainer.appendChild(backToCollectionBtn);
            // --- FIM DO CÓDIGO DO BOTÃO ---

        } else {
            loadingMessage.innerHTML = '<p>Produto não encontrado.</p>';
        }

    } catch (error) {
        console.error("Erro ao carregar detalhes do produto:", error);
        loadingMessage.innerHTML = '<p>Erro ao carregar detalhes do produto. Tente novamente mais tarde.</p>';
    }
}


// ... (certifique-se de que seus listeners para os links de navegação e botões estão corretos) ...

// Exemplo de como você chamaria fetchAndDisplayProductDetails (apenas para referência)
// document.querySelectorAll('.product-card').forEach(card => {
//     card.addEventListener('click', (event) => {
//         event.preventDefault();
//         const productId = card.dataset.productId; // Certifique-se de que o card tem data-product-id
//         fetchAndDisplayProductDetails(productId);
//     });
// });

// E os listeners para os links do cabeçalho
document.getElementById('navHome').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('homeSection');
});

document.getElementById('navAllProducts').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('allProductsSection');
    // Se a coleção completa não estiver carregada, chame a função para carregar
    // Ex: fetchAndDisplayAllProducts();
});

document.getElementById('navAboutUs').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('aboutUsSection');
    // Se a seção Sobre Nós precisa de conteúdo dinâmico, chame a função
    // Ex: renderAboutUsContent();
});

// Listener para o botão "Explorar Produtos" na Hero Section
document.getElementById('exploreProductsBtn').addEventListener('click', () => {
    showSection('allProductsSection');
    // Pode chamar a função para carregar todos os produtos aqui, se necessário
    // fetchAndDisplayAllProducts();
});

// Listener para o botão "Ver Coleção Completa" na Home Section
document.getElementById('viewAllProductsBtn').addEventListener('click', () => {
    showSection('allProductsSection');
    // Pode chamar a função para carregar todos os produtos aqui, se necessário
    // fetchAndDisplayAllProducts();
});