// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos Elementos HTML ---
    const homeSection = document.getElementById('homeSection');
    const allProductsSection = document.getElementById('allProductsSection'); // NOVA SEÇÃO
    const adminLoginSection = document.getElementById('adminLoginSection');
    const adminDashboardSection = document.getElementById('adminDashboardSection');
    const productDetailSection = document.getElementById('productDetailSection');

    const navHomeBtn = document.getElementById('navHome');
    const navAllProductsBtn = document.getElementById('navAllProducts'); // NOVO BOTÃO
    const navAdminBtn = document.getElementById('navAdmin');
    const exploreProductsBtn = document.getElementById('exploreProductsBtn');
    const viewAllProductsBtn = document.getElementById('viewAllProductsBtn'); // NOVO BOTÃO NA HOME

    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminEmailInput = document.getElementById('adminEmail');
    const adminPasswordInput = document.getElementById('adminPassword');
    const loginMessage = document.getElementById('loginMessage');

    const productForm = document.getElementById('productForm');
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productDescriptionInput = document.getElementById('productDescription');
    const productImageURLInput = document.getElementById('productImageURL');
    const saveProductBtn = document.getElementById('saveProductBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const productMessage = document.getElementById('productMessage');
    const adminProductsList = document.getElementById('adminProductsList');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn'); // NOVO BOTÃO LOGOUT

    const featuredProductsGrid = document.getElementById('featuredProductsGrid'); // Grade da home
    const loadingFeaturedMessage = document.getElementById('loadingFeaturedMessage');
    const allProductsGrid = document.getElementById('allProductsGrid'); // Grade da nova seção
    const loadingAllProductsMessage = document.getElementById('loadingAllProductsMessage');

    const loadingDetailMessage = document.getElementById('loadingDetailMessage');

    // --- Simulação de Banco de Dados (Dados Temporários em Memória) ---
    let products = [
        { id: '1', name: 'Óculos Urban Cool', price: 129.90, description: 'Estilo arrojado para as ruas da cidade. Lentes polarizadas para máxima proteção UV400. Armação leve e resistente, ideal para uso diário e aventuras urbanas.', imageUrl: 'https://images.unsplash.com/photo-1574621147055-661f22144365?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '2', name: 'Street Vibe Aviator', price: 159.90, description: 'Um clássico repaginado com um toque moderno. Perfeito para qualquer ocasião, oferecendo visão nítida e proteção contra raios solares intensos. Acabamento premium.', imageUrl: 'https://images.unsplash.com/photo-1502110595393-2cecb014d5ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '3', name: 'Bold Hipster', price: 99.90, description: 'Design único para quem não tem medo de se destacar. Armação robusta e lentes com filtro de luz azul, ideal para uso prolongado em frente a telas ou ao ar livre.', imageUrl: 'https://images.unsplash.com/photo-1620247657929-236b2f703567?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '4', name: 'Vintage Edge', price: 110.00, description: 'Óculos com inspiração retrô e toque contemporâneo. Ideal para quem busca um visual autêntico e cheio de personalidade.', imageUrl: 'https://images.unsplash.com/photo-1626871146602-df982a2254aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '5', name: 'Modern Minimalist', price: 85.50, description: 'Linhas limpas e design discreto. Conforto e elegância para o dia a dia, com lentes que oferecem proteção total.', imageUrl: 'https://images.unsplash.com/photo-1579549320698-c64a51e626e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ];
    let nextProductId = products.length > 0 ? Math.max(...products.map(p => parseInt(p.id))) + 1 : 1;

    // --- Credenciais do Administrador ---
    const ADMIN_EMAIL = 'admin@osiris.com'; // ALTERE AQUI
    const ADMIN_PASSWORD = 'supersecretpassword'; // ALTERE AQUI

    // --- Variáveis de Estado ---
    let currentProductDetailId = null; // Para controlar qual produto está sendo visualizado nos detalhes

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
            } else if (sectionId === 'allProductsSection') { // Nova seção
                renderAllProducts(); // Renderiza TODOS os produtos
            } else if (sectionId === 'adminLoginSection') {
                loginMessage.textContent = ''; // Limpa mensagens de login
                adminLoginForm.reset();
            } else if (sectionId === 'adminDashboardSection') {
                renderProductsForAdmin();
                productForm.reset(); // Limpa o formulário de produto
                saveProductBtn.textContent = 'Adicionar Óculos';
                cancelEditBtn.style.display = 'none';
                productIdInput.value = '';
                productMessage.textContent = '';
            } else if (sectionId === 'productDetailSection' && productId) {
                renderProductDetails(productId);
            }
            // Rola para o topo da página após a navegação
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // --- Event Listeners para Navegação ---
    navHomeBtn.addEventListener('click', () => showSection('homeSection'));
    navAllProductsBtn.addEventListener('click', () => showSection('allProductsSection')); // Novo
    navAdminBtn.addEventListener('click', () => {
        const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
        if (isAdminLoggedIn) {
            showSection('adminDashboardSection');
        } else {
            showSection('adminLoginSection');
        }
    });

    // Botões de exploração e visualização na Home Section
    exploreProductsBtn.addEventListener('click', () => {
        // Rola suavemente para a seção de produtos em destaque na home
        document.querySelector('.products-showcase').scrollIntoView({ behavior: 'smooth' });
    });
    viewAllProductsBtn.addEventListener('click', () => { // Botão "Ver Coleção Completa"
        showSection('allProductsSection');
    });

    // --- Lógica de Login do Administrador ---
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = adminEmailInput.value;
        const password = adminPasswordInput.value;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            sessionStorage.setItem('isAdminLoggedIn', 'true'); // Marca como logado
            showSection('adminDashboardSection');
        } else {
            loginMessage.textContent = 'Email ou senha incorretos.';
            loginMessage.classList.add('error');
            setTimeout(() => {
                loginMessage.textContent = '';
                loginMessage.classList.remove('error');
            }, 3000);
        }
    });

    // --- Lógica de Logout do Administrador ---
    adminLogoutBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja sair do painel administrativo?')) {
            sessionStorage.removeItem('isAdminLoggedIn'); // Remove o status de logado
            showSection('homeSection'); // Redireciona para a página inicial
        }
    });

    // --- Lógica do Dashboard do Administrador ---
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = productIdInput.value;
        const name = productNameInput.value.trim();
        const price = parseFloat(productPriceInput.value);
        const description = productDescriptionInput.value.trim();
        const imageUrl = productImageURLInput.value.trim();

        if (!name || isNaN(price) || price <= 0 || !description || !imageUrl) {
            productMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
            productMessage.classList.add('error');
            setTimeout(() => {
                productMessage.textContent = '';
                productMessage.classList.remove('error');
            }, 3000);
            return;
        }


        if (id) {
            // Editar produto existente
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                products[productIndex] = { id, name, price, description, imageUrl };
                productMessage.textContent = 'Óculos atualizado com sucesso!';
                productMessage.classList.remove('error');
                productMessage.classList.add('success');
            }
        } else {
            // Adicionar novo produto
            const newProduct = {
                id: (nextProductId++).toString(),
                name,
                price,
                description,
                imageUrl
            };
            products.push(newProduct);
            productMessage.textContent = 'Óculos adicionado com sucesso!';
            productMessage.classList.remove('error');
            productMessage.classList.add('success');
        }

        productForm.reset();
        productIdInput.value = '';
        saveProductBtn.textContent = 'Adicionar Óculos';
        cancelEditBtn.style.display = 'none';
        renderProductsForAdmin(); // Atualiza a lista no admin
        renderFeaturedProducts(); // Atualiza destaques
        renderAllProducts(); // Atualiza todos os produtos
        setTimeout(() => {
            productMessage.textContent = '';
            productMessage.classList.remove('success', 'error'); // Limpa ambas as classes
        }, 3000);
    });

    cancelEditBtn.addEventListener('click', () => {
        productForm.reset();
        productIdInput.value = '';
        saveProductBtn.textContent = 'Adicionar Óculos';
        cancelEditBtn.style.display = 'none';
        productMessage.textContent = '';
        productMessage.classList.remove('success', 'error');
    });

    function renderProductsForAdmin() {
        adminProductsList.innerHTML = '';
        if (products.length === 0) {
            adminProductsList.innerHTML = '<p class="no-products-message">Nenhum óculos cadastrado ainda.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">R$ ${product.price.toFixed(2)}</p>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-edit" data-id="${product.id}">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-secondary btn-delete" data-id="${product.id}">
                        <i class="bi bi-trash"></i> Excluir
                    </button>
                </div>
            `;
            adminProductsList.appendChild(productCard);
        });

        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const productToEdit = products.find(p => p.id === id);
                if (productToEdit) {
                    productIdInput.value = productToEdit.id;
                    productNameInput.value = productToEdit.name;
                    productPriceInput.value = productToEdit.price;
                    productDescriptionInput.value = productToEdit.description;
                    productImageURLInput.value = productToEdit.imageUrl;
                    saveProductBtn.textContent = 'Salvar Edição';
                    cancelEditBtn.style.display = 'inline-block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                if (confirm('Tem certeza que deseja excluir este óculos?')) {
                    products = products.filter(p => p.id !== id);
                    renderProductsForAdmin();
                    renderFeaturedProducts(); // Atualiza a lista de destaques
                    renderAllProducts(); // Atualiza a lista de todos os produtos
                }
            });
        });
    }

    // --- Lógica da Página Inicial (Produtos em Destaque) ---
    function renderFeaturedProducts() {
        featuredProductsGrid.innerHTML = ''; // Limpa a grade
        loadingFeaturedMessage.style.display = 'none';

        // Define quantos produtos em destaque você quer exibir (ex: 3)
        const numberOfFeatured = 3;
        const featuredProducts = products.slice(0, numberOfFeatured); // Pega os primeiros X produtos

        if (featuredProducts.length === 0) {
            featuredProductsGrid.innerHTML = '<p class="no-products-message">Nenhum óculos em destaque no momento.</p>';
            return;
        }

        featuredProducts.forEach(product => {
            const productCard = createProductCard(product); // Usa a função auxiliar
            featuredProductsGrid.appendChild(productCard);
        });
    }

    // --- Lógica da Página de Coleção Completa ---
    function renderAllProducts() {
        allProductsGrid.innerHTML = ''; // Limpa a grade
        loadingAllProductsMessage.style.display = 'none';

        if (products.length === 0) {
            allProductsGrid.innerHTML = '<p class="no-products-message">Nenhum óculos disponível na coleção completa.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = createProductCard(product); // Usa a função auxiliar
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
            // Substitua 'SEU_NUMERO_WHATSAPP' pelo seu número com código do país (ex: 5521999998888)
            const whatsappNumber = '55SEU_NUMERO_WHATSAPP'; // <<<<<<< ATUALIZE SEU NÚMERO AQUI
            const message = encodeURIComponent(`Olá! Tenho interesse no óculos "${product.name}" (R$ ${product.price.toFixed(2)}). Poderia me dar mais informações?`);
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    }

    // --- Inicialização: Exibe a página inicial ao carregar o site ---
    showSection('homeSection');
});