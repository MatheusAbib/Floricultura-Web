export const products = [
    {
        id: 1,
        name: "Lírio da Paz",
        price: 25.00,
        oldPrice: 35.00,
        image: "/src/assets/images/Plantas/Lirio.jpg",
        images: [
            "/src/assets/images/Plantas/Lirio.jpg",
            "/src/assets/images/Plantas/Lirio.jpg",
            "/src/assets/images/Plantas/Lirio.jpg"
        ],
        description: "O Lírio da Paz é uma planta elegante e resistente, perfeita para ambientes internos. Suas folhas verdes escuras e flores brancas trazem um toque de sofisticação.",
        rating: 4.5,
        badge: "new",
        category: "plantas",
        stock: 15,
        details: {
            light: "Luz indireta ou meia-sombra",
            water: "Regar 2x por semana, mantendo o solo úmido sem encharcar",
            humidity: "Alta umidade - borrifar água nas folhas",
            temperature: "18°C a 25°C",
            care: "Limpar as folhas com pano úmido semanalmente",
            toxicity: "Tóxica para animais de estimação"
        }
    },
    {
        id: 2,
        name: "Asplenio",
        price: 45.00,
        image: "/src/assets/images/Plantas/asplenio.jpg",
        images: [
            "/src/assets/images/Plantas/asplenio.jpg",
            "/src/assets/images/Plantas/asplenio.jpg"
        ],
        description: "O Asplênio é uma samambaia elegante com folhas delicadas e textura única. Perfeita para decorar interiores com um toque de natureza.",
        rating: 4,
        badge: "bestseller",
        category: "plantas",
        stock: 8,
        details: {
            light: "Luz indireta média a baixa",
            water: "Regar 1x por semana, solo levemente úmido",
            humidity: "Alta umidade",
            temperature: "16°C a 24°C",
            care: "Evitar luz solar direta que queima as folhas",
            toxicity: "Não tóxica para animais"
        }
    },
    {
        id: 3,
        name: "Cactos",
        price: 40.00,
        oldPrice: 50.00,
        image: "/src/assets/images/Plantas/Cactus.jpg",
        images: [
            "/src/assets/images/Plantas/Cactus.jpg",
            "/src/assets/images/Plantas/Cactus.jpg"
        ],
        description: "Os cactos são plantas resistentes que exigem pouca manutenção. Perfeitos para quem tem pouco tempo ou está começando no mundo da jardinagem.",
        rating: 5,
        badge: "sale",
        category: "plantas",
        stock: 20,
        details: {
            light: "Sol pleno ou luz intensa",
            water: "Regar a cada 15 dias no verão e 1x por mês no inverno",
            humidity: "Baixa umidade",
            temperature: "15°C a 35°C",
            care: "Usar solo arenoso bem drenado",
            toxicity: "Espinhos podem causar ferimentos"
        }
    },
    {
        id: 4,
        name: "Bonsai",
        price: 50.00,
        image: "/src/assets/images/Plantas/Bonsai.png",
        images: [
            "/src/assets/images/Plantas/Bonsai.png",
            "/src/assets/images/Plantas/Bonsai.png"
        ],
        description: "O Bonsai é uma árvore em miniatura que simboliza harmonia e equilíbrio. Uma obra de arte viva que requer paciência e dedicação.",
        rating: 3.5,
        category: "plantas",
        stock: 5,
        details: {
            light: "Luz indireta ou sol da manhã",
            water: "Regar quando o solo estiver seco na superfície",
            humidity: "Média umidade",
            temperature: "15°C a 28°C",
            care: "Poda regular para manter o formato, adubar a cada 3 meses",
            toxicity: "Não tóxico, mas pode ser sensível a produtos químicos"
        }
    },
    {
        id: 5,
        name: "Girassol",
        price: 74.99,
        image: "/src/assets/images/Plantas/Girassol.jpg",
        images: [
            "/src/assets/images/Plantas/Girassol.jpg",
            "/src/assets/images/Plantas/Girassol.jpg"
        ],
        description: "Buquê de girassóis vibrantes que trazem alegria e energia positiva para qualquer ambiente. Perfeito para presentear.",
        rating: 4.5,
        outOfStock: true,
        category: "flores",
        stock: 0,
        details: {
            light: "Sol pleno",
            water: "Manter a água do vaso sempre limpa e fresca",
            humidity: "Média umidade",
            temperature: "20°C a 28°C",
            care: "Cortar os caules na diagonal a cada 2 dias",
            toxicity: "Não tóxico"
        }
    },
    {
        id: 6,
        name: "Bromélia",
        price: 89.50,
        image: "/src/assets/images/Plantas/Bromelia.jpeg",
        images: [
            "/src/assets/images/Plantas/Bromelia.jpeg",
            "/src/assets/images/Plantas/Bromelia.jpeg"
        ],
        description: "A Bromélia é uma planta tropical exuberante com folhas longas e coloridas. Perfeita para dar vida e cor a qualquer espaço.",
        rating: 4,
        category: "plantas",
        stock: 7,
        details: {
            light: "Luz indireta",
            water: "Regar no centro da roseta, mantendo água sempre fresca",
            humidity: "Alta umidade",
            temperature: "18°C a 28°C",
            care: "Adubar com fertilizante líquido a cada 15 dias",
            toxicity: "Não tóxico para animais"
        }
    },
    {
        id: 7,
        name: "Peperomia",
        price: 35.99,
        image: "/src/assets/images/Plantas/Peperomia.jpg",
        images: [
            "/src/assets/images/Plantas/Peperomia.jpg",
            "/src/assets/images/Plantas/Peperomia.jpg"
        ],
        description: "A Peperomia é uma planta compacta de fácil cultivo, com folhas carnosas e variadas cores. Ideal para prateleiras e espaços pequenos.",
        rating: 3.5,
        category: "plantas",
        stock: 12,
        details: {
            light: "Luz indireta ou meia-sombra",
            water: "Regar quando o solo estiver seco",
            humidity: "Média a alta umidade",
            temperature: "18°C a 26°C",
            care: "Evitar regar em excesso, pois apodrece as raízes",
            toxicity: "Não tóxico para animais"
        }
    },
    {
        id: 8,
        name: "Orquídea",
        price: 105.00,
        oldPrice: 130.00,
        image: "/src/assets/images/Plantas/Conjunto-Orquideas.jpg",
        images: [
            "/src/assets/images/Plantas/Conjunto-Orquideas.jpg",
            "/src/assets/images/Plantas/Conjunto-Orquideas.jpg",
            "/src/assets/images/Plantas/Conjunto-Orquideas.jpg"
        ],
        description: "Orquídeas são flores sofisticadas e elegantes que encantam pela beleza e durabilidade. O presente perfeito para ocasiões especiais.",
        rating: 5,
        badge: "bestseller",
        category: "flores",
        stock: 6,
        details: {
            light: "Luz indireta, sem sol direto",
            water: "Regar 1x por semana, mergulhando as raízes",
            humidity: "Alta umidade",
            temperature: "18°C a 28°C",
            care: "Adubar com fertilizante específico para orquídeas",
            toxicity: "Não tóxico para animais"
        }
    },
    {
        id: 9,
        name: "Antúrio",
        price: 65.00,
        image: "/src/assets/images/Plantas/Anturio.jpg",
        images: [
            "/src/assets/images/Plantas/Anturio.jpg",
            "/src/assets/images/Plantas/Anturio.jpg"
        ],
        description: "O Antúrio é uma planta tropical com flores em formato de coração e folhas brilhantes. Traz paixão e elegância para decoração.",
        rating: 4,
        category: "flores",
        stock: 9,
        details: {
            light: "Luz indireta",
            water: "Regar 2x por semana",
            humidity: "Alta umidade",
            temperature: "20°C a 27°C",
            care: "Limpar as folhas frequentemente para manter o brilho",
            toxicity: "Tóxico para animais de estimação"
        }
    },
    {
        id: 10,
        name: "Espada de São Jorge",
        price: 38.50,
        image: "/src/assets/images/Plantas/Espada-Sao-Jorge.jpg",
        images: [
            "/src/assets/images/Plantas/Espada-Sao-Jorge.jpg",
            "/src/assets/images/Plantas/Espada-Sao-Jorge.jpg"
        ],
        description: "Planta resistente e de fácil manutenção. A Espada de São Jorge é famosa por sua durabilidade e capacidade de purificar o ar.",
        rating: 4.5,
        category: "plantas",
        stock: 25,
        details: {
            light: "Sol pleno ou meia-sombra",
            water: "Regar a cada 10-15 dias",
            humidity: "Baixa a média umidade",
            temperature: "15°C a 30°C",
            care: "Muito resistente, quase não precisa de cuidados",
            toxicity: "Tóxico para animais"
        }
    },
    {
        id: 11,
        name: "Begônia",
        price: 42.00,
        image: "/src/assets/images/Plantas/Begomia.jpg",
        images: [
            "/src/assets/images/Plantas/Begomia.jpg",
            "/src/assets/images/Plantas/Begomia.jpg"
        ],
        description: "As Begônias são plantas encantadoras com flores coloridas e folhagem ornamental. Perfeitas para alegrar ambientes internos.",
        rating: 4,
        category: "flores",
        stock: 10,
        details: {
            light: "Luz indireta",
            water: "Regar quando o solo estiver seco",
            humidity: "Alta umidade",
            temperature: "18°C a 24°C",
            care: "Não molhar as flores durante a rega",
            toxicity: "Tóxico para animais"
        }
    },
    {
        id: 12,
        name: "Bamboo",
        price: 70.00,
        oldPrice: 90.00,
        image: "/src/assets/images/Plantas/bamboo.webp",
        images: [
            "/src/assets/images/Plantas/bamboo.webp",
            "/src/assets/images/Plantas/bamboo.webp"
        ],
        description: "O Bambu é símbolo de sorte e prosperidade. Uma planta elegante e versátil que traz equilíbrio e boa energia.",
        rating: 5,
        badge: "sale",
        category: "plantas",
        stock: 18,
        details: {
            light: "Luz indireta",
            water: "Manter água sempre fresca, trocar a cada semana",
            humidity: "Média umidade",
            temperature: "18°C a 28°C",
            care: "Adicionar fertilizante líquido a cada 15 dias",
            toxicity: "Não tóxico"
        }
    },
    {
        id: 13,
        name: "Jiboia",
        price: 42.00,
        image: "/src/assets/images/Plantas/Jiboia.jpeg",
        images: [
            "/src/assets/images/Plantas/Jiboia.jpeg",
            "/src/assets/images/Plantas/Jiboia.jpeg"
        ],
        description: "A Jiboia é uma planta trepadeira de folhagem exuberante. Perfeita para decorar paredes e prateleiras com um toque verde.",
        rating: 3.5,
        category: "plantas",
        stock: 8,
        details: {
            light: "Luz indireta ou meia-sombra",
            water: "Regar quando o solo estiver seco",
            humidity: "Média a alta umidade",
            temperature: "18°C a 26°C",
            care: "Pode ser cultivada na água ou no solo",
            toxicity: "Tóxico para animais"
        }
    },
    {
        id: 14,
        name: "Lavanda",
        price: 92.00,
        image: "/src/assets/images/Plantas/Lavanda.jpg",
        images: [
            "/src/assets/images/Plantas/Lavanda.jpg",
            "/src/assets/images/Plantas/Lavanda.jpg"
        ],
        description: "A Lavanda é uma planta aromática que proporciona calma e bem-estar. Perfeita para perfumar ambientes e relaxar.",
        rating: 4,
        badge: "bestseller",
        category: "plantas",
        stock: 14,
        details: {
            light: "Sol pleno",
            water: "Regar 1x por semana, solo seco entre regas",
            humidity: "Baixa umidade",
            temperature: "15°C a 30°C",
            care: "Podar após a floração para estimular novos brotos",
            toxicity: "Não tóxico"
        }
    },
    {
        id: 15,
        name: "Zamioculca",
        price: 162.00,
        image: "/src/assets/images/Plantas/Zamioculca.jpg",
        images: [
            "/src/assets/images/Plantas/Zamioculca.jpg",
            "/src/assets/images/Plantas/Zamioculca.jpg"
        ],
        description: "A Zamioculca é uma planta moderna e elegante, famosa por sua resistência e beleza. Perfeita para ambientes com pouca luz.",
        rating: 5,
        category: "plantas",
        stock: 5,
        details: {
            light: "Baixa a média iluminação",
            water: "Regar a cada 15 dias no verão e 1x por mês no inverno",
            humidity: "Média umidade",
            temperature: "18°C a 26°C",
            care: "Limpar as folhas com pano úmido",
            toxicity: "Tóxico para animais"
        }
    },
    {
        id: 16,
        name: "Costela de Adão",
        price: 190.00,
        image: "/src/assets/images/Plantas/Costela-Adao.jpg",
        images: [
            "/src/assets/images/Plantas/Costela-Adao.jpg",
            "/src/assets/images/Plantas/Costela-Adao.jpg"
        ],
        description: "A Costela de Adão é uma planta tropical imponente com folhas grandes e recortadas. Traz um toque sofisticado e exuberante.",
        rating: 4,
        category: "plantas",
        stock: 3,
        details: {
            light: "Luz indireta",
            water: "Regar 1x por semana",
            humidity: "Alta umidade",
            temperature: "20°C a 30°C",
            care: "Adubar a cada 3 meses",
            toxicity: "Tóxico para animais"
        }
    }
];

export const invernoProducts = [
    {
        id: 'i01',
        name: 'Azaleia',
        description: 'Flores vibrantes que iluminam seu jardim mesmo nos dias mais frios. Perfeita para trazer cor durante o inverno.',
        price: 129.90,
        oldPrice: 169.90,
        image: '/src/assets/images/Plantas/Azaleia.jpg',
        images: [
            '/src/assets/images/Plantas/Azaleia.jpg',
            '/src/assets/images/Plantas/Azaleia.jpg'
        ],
        rating: 4,
        category: 'inverno',
        badge: 'sale',
        outOfStock: false,
        stock: 4,
        details: {
            light: "Sol pleno",
            water: "Regar 2x por semana",
            humidity: "Alta umidade",
            temperature: "10°C a 22°C",
            care: "Solo ácido, adubar a cada 15 dias",
            toxicity: "Tóxico para animais"
        }
    },
    {
        id: 'i02',
        name: 'Buxinho',
        description: 'Folhagem densa e elegante que mantém seu espaço verde no inverno. Ideal para formar cercas vivas ou decorar vasos.',
        price: 29.90,
        image: '/src/assets/images/Plantas/Buxinho.jpg',
        images: [
            '/src/assets/images/Plantas/Buxinho.jpg'
        ],
        rating: 5,
        category: 'inverno',
        badge: 'new',
        outOfStock: false,
        stock: 12,
        details: {
            light: "Sol pleno ou meia-sombra",
            water: "Regar 2x por semana",
            humidity: "Média umidade",
            temperature: "5°C a 25°C",
            care: "Podar regularmente para manter a forma",
            toxicity: "Tóxico para animais"
        }
    },
    {
        id: 'i03',
        name: 'Violeta',
        description: 'Pequenas flores delicadas que trazem cor e charme aos dias frios. Perfeita para decorar janelas e espaços internos.',
        price: 15.90,
        oldPrice: 29.90,
        image: '/src/assets/images/Plantas/Violeta.jpg',
        images: [
            '/src/assets/images/Plantas/Violeta.jpg',
            '/src/assets/images/Plantas/Violeta.jpg'
        ],
        rating: 4,
        category: 'inverno',
        badge: 'bestseller',
        outOfStock: true,
        stock: 0,
        details: {
            light: "Luz indireta",
            water: "Regar por baixo, sem molhar as folhas",
            humidity: "Média a alta umidade",
            temperature: "15°C a 22°C",
            care: "Adubar a cada 15 dias",
            toxicity: "Não tóxico"
        }
    },
    {
        id: 'i04',
        name: 'Babosa',
        description: 'Folha suculenta e resistente que traz frescor e cuidados naturais para o inverno. Propriedades medicinais e decorativas.',
        price: 13.50,
        oldPrice: 39.50,
        image: '/src/assets/images/Plantas/Babosa.jpg',
        images: [
            '/src/assets/images/Plantas/Babosa.jpg',
            '/src/assets/images/Plantas/Babosa.jpg'
        ],
        rating: 3.5,
        category: 'inverno',
        badge: 'new',
        outOfStock: false,
        stock: 20,
        details: {
            light: "Sol pleno ou meia-sombra",
            water: "Regar a cada 10-15 dias",
            humidity: "Baixa umidade",
            temperature: "10°C a 30°C",
            care: "Replantar a cada 2 anos",
            toxicity: "Não tóxico"
        }
    }
];


export const testimonials = [
    {
        id: 1,
        text: "Comprei um lindo arranjo de rosas para minha mãe e ela adorou! A entrega foi super rápida e as flores estavam frescas e lindas.",
        author: "Ana Carolina",
        location: "São Paulo",
        image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
        id: 2,
        text: "Adorei a planta que comprei para meu escritório. Veio bem embalada e com instruções de cuidados. Já estou pensando na próxima compra!",
        author: "Ricardo Almeida",
        location: "Rio de Janeiro",
        image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
        id: 3,
        text: "Presenteei minha noiva com um buquê maravilhoso. O atendimento foi excelente e ajudaram a escolher o arranjo perfeito. Recomendo!",
        author: "Marcos Silva",
        location: "Belo Horizonte",
        image: "https://randomuser.me/api/portraits/men/68.jpg"
    }
];

export const coupons = [
    {
        id: 1,
        code: 'PRIMAVERA20',
        discount: '20%',
        title: 'Desconto de Primavera',
        description: '20% de desconto em toda a loja. Válido até 30/09.',
        used: false
    },
    {
        id: 2,
        code: 'FLOR15',
        discount: '15%',
        title: 'Presente Especial',
        description: '15% de desconto em buquês e arranjos florais no dia 14/02/2026.',
        used: true
    },
    {
        id: 3,
        code: 'PLANTA30',
        discount: '30%',
        title: 'Plantas em Oferta',
        description: '30% de desconto em plantas selecionadas da loja.',
        used: false
    }
];

export const features = [
    {
        id: 1,
        icon: 'bi-truck',
        title: 'Entrega Rápida',
        description: 'Entregamos em até 24h na região metropolitana, com todo o cuidado que suas plantas merecem.'
    },
    {
        id: 2,
        icon: 'bi-credit-card',
        title: 'Pagamento Seguro',
        description: 'Diversas opções de pagamento com processamento seguro para sua tranquilidade.'
    },
    {
        id: 3,
        icon: 'bi-shield-check',
        title: 'Garantia de Qualidade',
        description: 'Todos os nossos produtos possuem garantia de satisfação. Se não gostar, devolvemos seu dinheiro.'
    }
];