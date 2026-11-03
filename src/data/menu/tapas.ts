import type { LocaleCode, TapasContent, TapasImageAsset } from './types'

const tacoLuxuryImage: TapasImageAsset = {
  alt: 'El Taco Luxury',
  sources: [
    '/products/tapas/taco-luxury.webp',
    '/products/tapas/taco-luxury.png',
    '/products/tapas/taco-luxury.jpg',
    '/products/tapas/taco-luxury.jpeg',
  ],
}

const croquetasImage: TapasImageAsset = {
  alt: 'Croquetas Tentación',
  sources: [
    '/products/tapas/croquetas-tentacion.webp',
    '/products/tapas/croquetas-tentacion.png',
    '/products/tapas/croquetas-tentacion.jpg',
    '/products/tapas/croquetas-tentacion.jpeg',
  ],
}

const bravasImage: TapasImageAsset = {
  alt: 'Bravas Lounge',
  sources: [
    '/products/tapas/bravas-lounge.webp',
    '/products/tapas/bravas-lounge.png',
    '/products/tapas/bravas-lounge.jpg',
    '/products/tapas/bravas-lounge.jpeg',
  ],
}

const crujientesImage: TapasImageAsset = {
  alt: 'Fingers de pollo',
  sources: [
    '/products/tapas/crujientes-premium.webp',
    '/products/tapas/crujientes-premium.png',
    '/products/tapas/crujientes-premium.jpg',
    '/products/tapas/crujientes-premium.jpeg',
  ],
}

const tapasContentEs: TapasContent = {
  anchor: 'tapas',
  kicker: 'Street Food Lounge',
  title: 'Tapas',
  subtitle: 'Una nueva familia pensada para acompañar la experiencia lounge con más carácter y más hambre real.',
  hero: {
    kicker: 'Protagonista',
    title: 'El Taco Luxury',
    price: '9€',
    description:
      'Nuestro taco más brutal y exclusivo. Preparado con carne halal a elegir: ternera, pollo o mixto, cocinada al momento y acompañada de nuestra salsa especial casera, mezcla de queso cheddar y edam fundidos, crujientes patatas fritas y una deliciosa salsa blanca que le da el toque final perfecto. Un taco cargado de sabor, cremosidad y personalidad, hecho para los verdaderos amantes del buen street food.',
    meatOptions: ['Ternera halal', 'Pollo halal', 'Mixto halal'],
    saucesTitle: 'Añade tu salsa favorita',
    sauces: ['Salsa andaluza', 'Salsa argelina', 'Salsa samurai', 'Salsa especial de la casa'],
    image: tacoLuxuryImage,
  },
  classics: {
    anchor: 'tapas-classics',
    kicker: 'Selección Lounge',
    title: 'Tapas Signature',
    description: 'Una selección corta, potente y bien construida para compartir o pedir junto a tu shisha.',
    items: [
      {
        name: 'Bravas Lounge',
        price: '5,50€',
        description: 'Patatas crujientes con salsa brava casera y un toque ahumado especial de la casa.',
        image: bravasImage,
      },
      {
        name: 'Fingers de pollo',
        price: '7€',
        description: 'Tiras de pollo extra crujientes acompañadas de nuestra salsa barbacoa.',
        image: crujientesImage,
      },
    ],
  },
  croquetas: {
    anchor: 'croquetas',
    kicker: 'Cabecero Propio',
    title: 'Croquetas',
    description: 'Una subsección dedicada a las croquetas, con un solo lenguaje visual y tres perfiles de sabor bien diferenciados.',
    image: croquetasImage,
    items: [
      {
        name: 'Croquetas de pollo',
        price: '5,50€',
        description: 'Croquetas de pollo, cremosas por dentro y crujientes por fuera.',
      },
      {
        name: 'Croquetas de bacalao',
        price: '6€',
        description: 'Croquetas suaves y cremosas de bacalao con sabor auténtico.',
      },
      {
        name: 'Croquetas queso de cabra',
        price: '5,50€',
        description: 'Queso de cabra fundente con cebolla caramelizada en una combinación brutal.',
      },
    ],
  },
}

const tapasContentEn: TapasContent = {
  anchor: 'tapas',
  kicker: 'Street Food Lounge',
  title: 'Tapas',
  subtitle: 'A new product family built to deepen the lounge experience with more flavor and a stronger food identity.',
  hero: {
    kicker: 'Signature Hero',
    title: 'The Luxury Taco',
    price: '9€',
    description:
      'Our most brutal and exclusive taco. Prepared with halal meat of your choice: beef, chicken or mixed, cooked to order and finished with our house special sauce, a melted cheddar and edam cheese blend, crispy fries and a delicious white sauce that seals the final touch. A taco loaded with flavor, creaminess and personality for real street food lovers.',
    meatOptions: ['Halal beef', 'Halal chicken', 'Mixed halal'],
    saucesTitle: 'Add your favorite sauce',
    sauces: ['Andalouse sauce', 'Algerian sauce', 'Samurai sauce', 'House special sauce'],
    image: tacoLuxuryImage,
  },
  classics: {
    anchor: 'tapas-classics',
    kicker: 'Lounge Selection',
    title: 'Tapas Signature',
    description: 'A short and premium selection designed to share or pair with your shisha moment.',
    items: [
      {
        name: 'Bravas Lounge',
        price: '5,50€',
        description: 'Crispy potatoes with homemade brava sauce and a signature smoky house touch.',
        image: bravasImage,
      },
      {
        name: 'Chicken fingers',
        price: '7€',
        description: 'Extra crispy chicken strips served with our barbecue sauce.',
        image: crujientesImage,
      },
    ],
  },
  croquetas: {
    anchor: 'croquetas',
    kicker: 'Dedicated Block',
    title: 'Croquettes',
    description: 'A dedicated croquettes block with one shared visual and three very distinct flavor profiles.',
    image: croquetasImage,
    items: [
      {
        name: 'Cod croquettes',
        price: '6€',
        description: 'Smooth and creamy cod croquettes with authentic flavor.',
      },
      {
        name: 'Chicken croquettes',
        price: '5,50€',
        description: 'Chicken croquettes, creamy inside and crispy outside.',
      },
      {
        name: 'Goat cheese croquettes',
        price: '5,50€',
        description: 'Melted goat cheese with caramelized onion in a bold and indulgent combination.',
      },
    ],
  },
}

const tapasContentFr: TapasContent = {
  anchor: 'tapas',
  kicker: 'Street Food Lounge',
  title: 'Tapas',
  subtitle: 'Une nouvelle famille de produits pensée pour enrichir l’expérience lounge avec plus de saveur et plus de personnalité.',
  hero: {
    kicker: 'Signature',
    title: 'Le Taco Luxury',
    price: '9€',
    description:
      'Notre taco le plus brutal et exclusif. Préparé avec une viande halal au choix : bœuf, poulet ou mixte, cuisinée à la minute et accompagnée de notre sauce spéciale maison, d’un mélange fondant de cheddar et d’edam, de frites croustillantes et d’une délicieuse sauce blanche qui apporte la touche finale parfaite. Un taco chargé de goût, de crémeux et de personnalité.',
    meatOptions: ['Bœuf halal', 'Poulet halal', 'Mixte halal'],
    saucesTitle: 'Ajoutez votre sauce préférée',
    sauces: ['Sauce andalouse', 'Sauce algérienne', 'Sauce samouraï', 'Sauce spéciale maison'],
    image: tacoLuxuryImage,
  },
  classics: {
    anchor: 'tapas-classics',
    kicker: 'Sélection Lounge',
    title: 'Tapas Signature',
    description: 'Une sélection courte, premium et bien construite à partager ou à accompagner avec votre shisha.',
    items: [
      {
        name: 'Bravas Lounge',
        price: '5,50€',
        description: 'Pommes croustillantes avec sauce brava maison et une touche fumée signature.',
        image: bravasImage,
      },
      {
        name: 'Fingers de poulet',
        price: '7€',
        description: 'Tendres morceaux de poulet extra croustillants accompagnés de notre sauce barbecue.',
        image: crujientesImage,
      },
    ],
  },
  croquetas: {
    anchor: 'croquetas',
    kicker: 'Bloc Dédié',
    title: 'Croquettes',
    description: 'Une sous-section dédiée aux croquettes avec un visuel commun et trois profils de goût distincts.',
    image: croquetasImage,
    items: [
      {
        name: 'Croquettes de morue',
        price: '6€',
        description: 'Croquettes de morue douces et crémeuses au goût authentique.',
      },
      {
        name: 'Croquettes de poulet',
        price: '5,50€',
        description: 'Croquettes de poulet, crémeuses à l’intérieur et croustillantes à l’extérieur.',
      },
      {
        name: 'Croquettes au fromage de chèvre',
        price: '5,50€',
        description: 'Fromage de chèvre fondant et oignon caramélisé dans une combinaison intense.',
      },
    ],
  },
}

const tapasByLocale: Record<LocaleCode, TapasContent> = {
  es: tapasContentEs,
  en: tapasContentEn,
  fr: tapasContentFr,
}

export function getTapasContent(locale: LocaleCode): TapasContent {
  return tapasByLocale[locale]
}
