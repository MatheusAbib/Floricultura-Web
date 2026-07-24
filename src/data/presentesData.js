import { IMAGE_PATH } from '../config';

export const presentesProducts = [
    {
        id: 101,
        name: "Vinho",
        price: 80.00,
        oldPrice: 65.00,
        image: `${IMAGE_PATH}Presentes/Vinho.webp`,
        images: [
            `${IMAGE_PATH}Presentes/Vinho.webp`,
            `${IMAGE_PATH}Presentes/Vinho.webp`
        ],
        description: "Vinho Mariana, presente sofisticado para momentos especiais, perfeito para celebrações ou jantares românticos.",
        rating: 4.5,
        badge: "new",
        category: "presentes",
        stock: 10,
        details: {
            tipo: "Vinho Tinto Seco",
            uva: "Cabernet Sauvignon",
            safra: "2020",
            teorAlcoolico: "13,5%",
            volume: "750ml",
            harmonizacao: "Carnes vermelhas, queijos e massas"
        }
    },
    {
        id: 102,
        name: "Ursinho de pelúcia",
        price: 30.00,
        image: `${IMAGE_PATH}Presentes/Ursinho.webp`,
        images: [
            `${IMAGE_PATH}Presentes/Ursinho.webp`,
            `${IMAGE_PATH}Presentes/Ursinho-2.webp`
        ],
        description: "Fofo e aconchegante, este ursinho é a escolha ideal para demonstrar carinho e afeto.",
        rating: 4,
        badge: "bestseller",
        outOfStock: true,
        category: "presentes",
        stock: 0,
        details: {
            tamanho: "30 cm",
            material: "Pelúcia macia",
            cores: "Marrom claro",
            inclui: "Laço vermelho no pescoço",
            recomendacao: "Lavar a seco"
        }
    },
    {
        id: 103,
        name: "Chandon",
        price: 93.99,
        oldPrice: 110.00,
        image: `${IMAGE_PATH}Presentes/chandon.webp`,
        images: [
            `${IMAGE_PATH}Presentes/chandon.webp`,
            `${IMAGE_PATH}Presentes/chandon-2.webp`
        ],
        description: "Refinado e elegante, perfeito para brindar conquistas, aniversários e ocasiões inesquecíveis.",
        rating: 4,
        badge: "sale",
        category: "presentes",
        stock: 8,
        details: {
            tipo: "Espumante Brut",
            uva: "Chardonnay e Pinot Noir",
            safra: "2021",
            teorAlcoolico: "12%",
            volume: "750ml",
            harmonizacao: "Frutos do mar, saladas e sobremesas"
        }
    },
    {
        id: 104,
        name: "Caixa de doces",
        price: 130.00,
        image: `${IMAGE_PATH}Presentes/Caixa-de-Presentes.webp`,
        images: [
            `${IMAGE_PATH}Presentes/Caixa-de-Presentes.webp`,
            `${IMAGE_PATH}Presentes/Caixa-de-Presentes-2.webp`
        ],
        description: "Uma seleção deliciosa de doces finos, ideal para surpreender alguém com um toque de sabor e carinho.",
        rating: 3.5,
        category: "presentes",
        stock: 15,
        details: {
            variedades: "12 unidades sortidas",
            tipos: "Trufas, bombons e balas",
            peso: "250g",
            embalagem: "Caixa decorativa",
            validade: "30 dias"
        }
    },
    {
        id: 105,
        name: "Aperitivos",
        price: 49.99,
        image: `${IMAGE_PATH}Presentes/Aperitivos.webp`,
        images: [
            `${IMAGE_PATH}Presentes/Aperitivos.webp`,
            `${IMAGE_PATH}Presentes/Aperitivos-2.webp`
        ],
        description: "Combinação irresistível de petiscos variados e cervejas para acompanhar bons momentos com amigos ou família.",
        rating: 4.5,
        outOfStock: false,
        category: "presentes",
        stock: 12,
        details: {
            itens: "Petiscos variados + 2 cervejas artesanais",
            petiscos: "Amendoim, castanhas e batata frita",
            cervejas: "IPA e Pilsen (330ml)",
            peso: "500g",
            validade: "30 dias"
        }
    },
    {
        id: 106,
        name: "Chocolates",
        price: 35.50,
        image: `${IMAGE_PATH}Presentes/chocolate.webp`,
        images: [
            `${IMAGE_PATH}Presentes/chocolate.webp`,
            `${IMAGE_PATH}Presentes/chocolate-2.webp`
        ],
        description: "Clássico presente que agrada a todos, ideal para expressar afeto em qualquer ocasião.",
        rating: 4,
        category: "presentes",
        stock: 25,
        details: {
            tipo: "Chocolate ao leite",
            peso: "200g",
            formato: "Barras e bombons",
            origem: "Cacau brasileiro",
            validade: "60 dias"
        }
    },
    {
        id: 107,
        name: "Caixa de Nutella",
        price: 105.00,
        image: `${IMAGE_PATH}Presentes/nutella.webp`,
        images: [
            `${IMAGE_PATH}Presentes/nutella.webp`,
            `${IMAGE_PATH}Presentes/nutella-2.webp`
        ],
        description: "Kit especial para os amantes de Nutella — cremoso, saboroso e perfeito para surpreender com doçura.",
        rating: 3.5,
        category: "presentes",
        stock: 10,
        details: {
            itens: "Pote de Nutella 350g + 3 potes de 50g",
            peso: "500g",
            embalagem: "Caixa personalizada",
            validade: "180 dias",
            inclui: "Colher especial"
        }
    },
    {
        id: 108,
        name: "Girassois",
        price: 155.00,
        oldPrice: 170.00,
        image: `${IMAGE_PATH}Presentes/Buque-Girassol.jpg`,
        images: [
            `${IMAGE_PATH}Presentes/Buque-Girassol.jpg`,
            `${IMAGE_PATH}Presentes/Buque-Girassol-2.jpg`
        ],
        description: "Um buquê radiante de girassóis para transmitir alegria, positividade e boas energias.",
        rating: 5,
        badge: "bestseller",
        category: "presentes",
        stock: 5,
        details: {
            flores: "12 girassóis",
            altura: "60 cm",
            embrulho: "Papel craft e fita de juta",
            acompanha: "Cartão personalizado",
            durabilidade: "Até 7 dias"
        }
    },
    {
        id: 109,
        name: "Rosas",
        price: 175.00,
        image: `${IMAGE_PATH}Presentes/Buque-rosas.jpg`,
        images: [
            `${IMAGE_PATH}Presentes/Buque-rosas.jpg`,
            `${IMAGE_PATH}Presentes/Buque-rosas-2.jpg`
        ],
        description: "Clássicas e atemporais, buquê de rosas são a expressão perfeita do amor e da elegância.",
        rating: 4,
        category: "presentes",
        stock: 4,
        details: {
            flores: "24 rosas vermelhas",
            altura: "50 cm",
            embrulho: "Papel seda e fita",
            acompanha: "Cartão com mensagem",
            durabilidade: "Até 5 dias"
        }
    },
    {
        id: 110,
        name: "Ferrero Rocher",
        price: 48.50,
        image: `${IMAGE_PATH}Presentes/Ferrero.jpg`,
        images: [
            `${IMAGE_PATH}Presentes/Ferrero.jpg`,
            `${IMAGE_PATH}Presentes/Ferrero-2.jpg`
        ],
        description: "Bombons finos com sabor inconfundível, perfeitos para presentear com classe e doçura.",
        rating: 4.5,
        category: "presentes",
        stock: 20,
        details: {
            quantidade: "16 unidades",
            peso: "200g",
            embalagem: "Caixa dourada",
            validade: "90 dias",
            acompanha: "Fita de cetim"
        }
    },
    {
        id: 111,
        name: "Placas decorativas",
        price: 40.00,
        image: `${IMAGE_PATH}Presentes/Placa-decorativa.webp`,
        images: [
            `${IMAGE_PATH}Presentes/Placa-decorativa.webp`,
            `${IMAGE_PATH}Presentes/Placa-decorativa-2.webp`
        ],
        description: "Adicione charme ao ambiente com placas decorativas criativas, ideais para presente criativo e moderno.",
        rating: 4,
        outOfStock: true,
        category: "presentes",
        stock: 0,
        details: {
            material: "Madeira MDF",
            tamanho: "20x30 cm",
            cores: "Branco e dourado",
            frase: "Frases motivacionais",
            inclui: "Suporte para parede"
        }
    },
    {
        id: 112,
        name: "Ursinho duplo",
        price: 70.00,
        oldPrice: 85.00,
        image: `${IMAGE_PATH}Presentes/Ursinhos.jpg`,
        images: [
            `${IMAGE_PATH}Presentes/Ursinhos.jpg`,
            `${IMAGE_PATH}Presentes/Ursinhos-2.jpg`
        ],
        description: "Dois adoráveis ursinhos de pelúcia para dobrar o carinho em momentos especiais.",
        rating: 5,
        badge: "sale",
        category: "presentes",
        stock: 6,
        details: {
            tamanho: "25 cm cada",
            material: "Pelúcia macia",
            cores: "Preto e marrom",
            inclui: "Laços no pescoço",
            recomendacao: "Lavar a seco"
        }
    }
];