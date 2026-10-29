import { IMAGE_PATH } from '../config';

export const products = [
    {
        id: 1,
        name: "Lírio da Paz",
        price: 25.00,
        oldPrice: 35.00,
        image: `${IMAGE_PATH}Plantas/Lirio.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Lirio.jpg`,
            `${IMAGE_PATH}Plantas/Lirio.jpg`,
            `${IMAGE_PATH}Plantas/Lirio.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/asplenio.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/asplenio.jpg`,
            `${IMAGE_PATH}Plantas/asplenio.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Cactus.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Cactus.jpg`,
            `${IMAGE_PATH}Plantas/Cactus.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Bonsai.png`,
        images: [
            `${IMAGE_PATH}Plantas/Bonsai.png`,
            `${IMAGE_PATH}Plantas/Bonsai.png`
        ],
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
        image: `${IMAGE_PATH}Plantas/Girassol.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Girassol.jpg`,
            `${IMAGE_PATH}Plantas/Girassol.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Bromelia.jpeg`,
        images: [
            `${IMAGE_PATH}Plantas/Bromelia.jpeg`,
            `${IMAGE_PATH}Plantas/Bromelia.jpeg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Peperomia.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Peperomia.jpg`,
            `${IMAGE_PATH}Plantas/Peperomia.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Conjunto-Orquideas.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Conjunto-Orquideas.jpg`,
            `${IMAGE_PATH}Plantas/Conjunto-Orquideas.jpg`,
            `${IMAGE_PATH}Plantas/Conjunto-Orquideas.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Anturio.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Anturio.jpg`,
            `${IMAGE_PATH}Plantas/Anturio.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Espada-Sao-Jorge.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Espada-Sao-Jorge.jpg`,
            `${IMAGE_PATH}Plantas/Espada-Sao-Jorge.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Begomia.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Begomia.jpg`,
            `${IMAGE_PATH}Plantas/Begomia.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/bamboo.webp`,
        images: [
            `${IMAGE_PATH}Plantas/bamboo.webp`,
            `${IMAGE_PATH}Plantas/bamboo.webp`
        ],
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
        image: `${IMAGE_PATH}Plantas/Jiboia.jpeg`,
        images: [
            `${IMAGE_PATH}Plantas/Jiboia.jpeg`,
            `${IMAGE_PATH}Plantas/Jiboia.jpeg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Lavanda.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Lavanda.jpg`,
            `${IMAGE_PATH}Plantas/Lavanda.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Zamioculca.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Zamioculca.jpg`,
            `${IMAGE_PATH}Plantas/Zamioculca.jpg`
        ],
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
        image: `${IMAGE_PATH}Plantas/Costela-Adao.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Costela-Adao.jpg`,
            `${IMAGE_PATH}Plantas/Costela-Adao.jpg`
        ],
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
        price: 129.90,
        oldPrice: 169.90,
        image: `${IMAGE_PATH}Plantas/Azaleia.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Azaleia.jpg`,
            `${IMAGE_PATH}Plantas/Azaleia.jpg`
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
        price: 29.90,
        image: `${IMAGE_PATH}Plantas/Buxinho.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Buxinho.jpg`
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
        price: 15.90,
        oldPrice: 29.90,
        image: `${IMAGE_PATH}Plantas/Violeta.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Violeta.jpg`,
            `${IMAGE_PATH}Plantas/Violeta.jpg`
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
        price: 13.50,
        oldPrice: 39.50,
        image: `${IMAGE_PATH}Plantas/Babosa.jpg`,
        images: [
            `${IMAGE_PATH}Plantas/Babosa.jpg`,
            `${IMAGE_PATH}Plantas/Babosa.jpg`
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

