export interface Dictionary {
  hero: {
    title: string
    subtitle: string // This will be empty or a placeholder if not used
    shopNow: string
    readyForAnything: string
    readyForAnythingSubtitle: string // New field for the animated text
    comfortAdapted: string
    engineeredText: string
  }
  nav: {
    home: string
    products: string
    about: string
    contact: string
  }
  product: {
    addToCart: string
    selectSize: string
    selectColor: string
    price: string
    description: string
    features: string
    materials: string
    care: string
    shipping: string
    returns: string
    outOfStock: string
    inStock: string
    quantity: string
    total: string
  }
  cart: {
    title: string
    empty: string
    checkout: string
    remove: string
    subtotal: string
    shipping: string
    total: string
    continueShopping: string
  }
  footer: {
    about: string
    aboutText: string
    quickLinks: string
    support: string
    sizeGuide: string
    shippingInfo: string
    returnsExchanges: string
    contactUs: string
    followUs: string
    newsletter: string
    newsletterText: string
    subscribe: string
    emailPlaceholder: string
    privacy: string
    terms: string
    sustainability: string
    allRightsReserved: string
  }
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    confirm: string
    save: string
    edit: string
    delete: string
    search: string
    filter: string
    sort: string
    next: string
    previous: string
  }
  sections: {
    exploreLatest: string
    nextEssential: string
    featuredProducts: string
    discoverCollection: string
  }
}

export const dictionaries = {
  en: {
    hero: {
      title: "ARTIE",
      subtitle: "", // Removed static subtitle
      shopNow: "SHOP NOW",
      readyForAnything: "READY FOR ANYTHING",
      readyForAnythingSubtitle: "ARTIE: Premium unisex apparel. Designed to perform, styled to live.",
      comfortAdapted: "COMFORT. ADAPTED.",
      engineeredText:
        "ARTIE: Engineered for every journey, styled for every moment. Premium apparel, limitless possibility.",
    },
    nav: {
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
    },
    product: {
      addToCart: "Add to Cart",
      selectSize: "Select Size",
      selectColor: "Select Color",
      price: "Price",
      description: "Description",
      features: "Features",
      materials: "Materials",
      care: "Care Instructions",
      shipping: "Shipping",
      returns: "Returns",
      outOfStock: "Out of Stock",
      inStock: "In Stock",
      quantity: "Quantity",
      total: "Total",
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      checkout: "Checkout",
      remove: "Remove",
      subtotal: "Subtotal",
      shipping: "Shipping",
      total: "Total",
      continueShopping: "Continue Shopping",
    },
    footer: {
      about: "About ARTIE",
      aboutText:
        "ARTIE is a premium streetwear brand that combines contemporary design with exceptional quality. We create clothing that speaks to the modern urban lifestyle.",
      quickLinks: "Quick Links",
      support: "SUPPORT",
      sizeGuide: "Size Guide",
      shippingInfo: "Shipping Info",
      returnsExchanges: "Returns & Exchanges",
      contactUs: "Contact Us",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      newsletterText: "Subscribe to get updates on new releases and exclusive offers",
      subscribe: "Subscribe",
      emailPlaceholder: "Enter your email",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      sustainability: "Sustainability",
      allRightsReserved: "All rights reserved.",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      next: "Next",
      previous: "Previous",
    },
    sections: {
      exploreLatest: "EXPLORE THE LATEST",
      nextEssential: "Your next essential piece starts here",
      featuredProducts: "Featured Products",
      discoverCollection: "Discover our latest streetwear collection",
    },
  },
  "zh-cn": {
    hero: {
      title: "ARTIE",
      subtitle: "", // Removed static subtitle
      shopNow: "立即购买",
      readyForAnything: "随时准备",
      readyForAnythingSubtitle: "ARTIE：高端中性服装。为表现而设计，为生活而造型。",
      comfortAdapted: "舒适。适应。",
      engineeredText: "ARTIE：为每一次旅程而设计，为每一个时刻而造型。高端服装，无限可能。",
    },
    nav: {
      home: "首页",
      products: "产品",
      about: "关于",
      contact: "联系",
    },
    product: {
      addToCart: "加入购物车",
      selectSize: "选择尺码",
      selectColor: "选择颜色",
      price: "价格",
      description: "描述",
      features: "特点",
      materials: "材料",
      care: "护理说明",
      shipping: "配送",
      returns: "退货",
      outOfStock: "缺货",
      inStock: "有库存",
      quantity: "数量",
      total: "总计",
    },
    cart: {
      title: "购物车",
      empty: "您的购物车是空的",
      checkout: "结账",
      remove: "移除",
      subtotal: "小计",
      shipping: "运费",
      total: "总计",
      continueShopping: "继续购物",
    },
    footer: {
      about: "关于 ARTIE",
      aboutText: "ARTIE 是一个高端街头服饰品牌，将现代设计与卓越品质相结合。我们创造符合现代都市生活方式的服装。",
      quickLinks: "快速链接",
      support: "支持",
      sizeGuide: "尺码指南",
      shippingInfo: "配送信息",
      returnsExchanges: "退换货",
      contactUs: "联系我们",
      followUs: "关注我们",
      newsletter: "订阅通讯",
      newsletterText: "订阅以获取新品发布和独家优惠的更新",
      subscribe: "订阅",
      emailPlaceholder: "输入您的邮箱",
      privacy: "隐私政策",
      terms: "服务条款",
      sustainability: "可持续发展",
      allRightsReserved: "版权所有。",
    },
    common: {
      loading: "加载中...",
      error: "错误",
      success: "成功",
      cancel: "取消",
      confirm: "确认",
      save: "保存",
      edit: "编辑",
      delete: "删除",
      search: "搜索",
      filter: "筛选",
      sort: "排序",
      next: "下一页",
      previous: "上一页",
    },
    sections: {
      exploreLatest: "探索最新",
      nextEssential: "您的下一件必备单品从这里开始",
      featuredProducts: "精选产品",
      discoverCollection: "发现我们最新的街头服饰系列",
    },
  },
  ja: {
    hero: {
      title: "ARTIE",
      subtitle: "", // Removed static subtitle
      shopNow: "今すぐ購入",
      readyForAnything: "何でも準備万端",
      readyForAnythingSubtitle:
        "ARTIE：プレミアムユニセックスアパレル。パフォーマンスのためにデザインされ、生活のためにスタイリング。",
      comfortAdapted: "快適。適応。",
      engineeredText:
        "ARTIE：すべての旅のために設計され、すべての瞬間のためにスタイリング。プレミアムアパレル、無限の可能性。",
    },
    nav: {
      home: "ホーム",
      products: "商品",
      about: "概要",
      contact: "お問い合わせ",
    },
    product: {
      addToCart: "カートに追加",
      selectSize: "サイズを選択",
      selectColor: "色を選択",
      price: "価格",
      description: "説明",
      features: "特徴",
      materials: "素材",
      care: "お手入れ方法",
      shipping: "配送",
      returns: "返品",
      outOfStock: "在庫切れ",
      inStock: "在庫あり",
      quantity: "数量",
      total: "合計",
    },
    cart: {
      title: "ショッピングカート",
      empty: "カートは空です",
      checkout: "チェックアウト",
      remove: "削除",
      subtotal: "小計",
      shipping: "送料",
      total: "合計",
      continueShopping: "買い物を続ける",
    },
    footer: {
      about: "ARTIEについて",
      aboutText:
        "ARTIEは現代的なデザインと卓越した品質を組み合わせたプレミアムストリートウェアブランドです。現代の都市ライフスタイルに響く服を作っています。",
      quickLinks: "クイックリンク",
      support: "サポート",
      sizeGuide: "サイズガイド",
      shippingInfo: "配送情報",
      returnsExchanges: "返品・交換",
      contactUs: "お問い合わせ",
      followUs: "フォローする",
      newsletter: "ニュースレター",
      newsletterText: "新商品リリースや限定オファーの更新を受け取るために購読してください",
      subscribe: "購読",
      emailPlaceholder: "メールアドレスを入力",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      sustainability: "持続可能性",
      allRightsReserved: "全著作権所有。",
    },
    common: {
      loading: "読み込み中...",
      error: "エラー",
      success: "成功",
      cancel: "キャンセル",
      confirm: "確認",
      save: "保存",
      edit: "編集",
      delete: "削除",
      search: "検索",
      filter: "フィルター",
      sort: "並び替え",
      next: "次へ",
      previous: "前へ",
    },
    sections: {
      exploreLatest: "最新を探索",
      nextEssential: "あなたの次の必須アイテムはここから始まります",
      featuredProducts: "注目商品",
      discoverCollection: "最新のストリートウェアコレクションを発見",
    },
  },
  de: {
    hero: {
      title: "ARTIE",
      subtitle: "", // Removed static subtitle
      shopNow: "JETZT KAUFEN",
      readyForAnything: "BEREIT FÜR ALLES",
      readyForAnythingSubtitle: "ARTIE: Premium Unisex-Bekleidung. Für Leistung entworfen, für das Leben gestylt.",
      comfortAdapted: "KOMFORT. ANGEPASST.",
      engineeredText:
        "ARTIE: Für jede Reise entwickelt, für jeden Moment gestylt. Premium-Bekleidung, grenzenlose Möglichkeiten.",
    },
    nav: {
      home: "Startseite",
      products: "Produkte",
      about: "Über uns",
      contact: "Kontakt",
    },
    product: {
      addToCart: "In den Warenkorb",
      selectSize: "Größe wählen",
      selectColor: "Farbe wählen",
      price: "Preis",
      description: "Beschreibung",
      features: "Eigenschaften",
      materials: "Materialien",
      care: "Pflegehinweise",
      shipping: "Versand",
      returns: "Rückgabe",
      outOfStock: "Ausverkauft",
      inStock: "Auf Lager",
      quantity: "Menge",
      total: "Gesamt",
    },
    cart: {
      title: "Warenkorb",
      empty: "Ihr Warenkorb ist leer",
      checkout: "Zur Kasse",
      remove: "Entfernen",
      subtotal: "Zwischensumme",
      shipping: "Versand",
      total: "Gesamt",
      continueShopping: "Weiter einkaufen",
    },
    footer: {
      about: "Über ARTIE",
      aboutText:
        "ARTIE ist eine Premium-Streetwear-Marke, die zeitgenössisches Design mit außergewöhnlicher Qualität verbindet. Wir kreieren Kleidung, die den modernen urbanen Lebensstil anspricht.",
      quickLinks: "Schnelllinks",
      support: "SUPPORT",
      sizeGuide: "Größentabelle",
      shippingInfo: "Versandinfo",
      returnsExchanges: "Rückgabe & Umtausch",
      contactUs: "Kontakt",
      followUs: "Folgen Sie uns",
      newsletter: "Newsletter",
      newsletterText: "Abonnieren Sie Updates zu neuen Veröffentlichungen und exklusiven Angeboten",
      subscribe: "Abonnieren",
      emailPlaceholder: "E-Mail eingeben",
      privacy: "Datenschutz",
      terms: "AGB",
      sustainability: "Nachhaltigkeit",
      allRightsReserved: "Alle Rechte vorbehalten.",
    },
    common: {
      loading: "Laden...",
      error: "Fehler",
      success: "Erfolg",
      cancel: "Abbrechen",
      confirm: "Bestätigen",
      save: "Speichern",
      edit: "Bearbeiten",
      delete: "Löschen",
      search: "Suchen",
      filter: "Filter",
      sort: "Sortieren",
      next: "Weiter",
      previous: "Zurück",
    },
    sections: {
      exploreLatest: "ENTDECKE DAS NEUESTE",
      nextEssential: "Dein nächstes essentielles Stück beginnt hier",
      featuredProducts: "Ausgewählte Produkte",
      discoverCollection: "Entdecke unsere neueste Streetwear-Kollektion",
    },
  },
  fr: {
    hero: {
      title: "ARTIE",
      subtitle: "", // Removed static subtitle
      shopNow: "ACHETER MAINTENANT",
      readyForAnything: "PRÊT À TOUT",
      readyForAnythingSubtitle: "ARTIE : Vêtements unisexes premium. Conçus pour performer, stylés pour vivre.",
      comfortAdapted: "CONFORT. ADAPTÉ.",
      engineeredText:
        "ARTIE : Conçu pour chaque voyage, stylé pour chaque moment. Vêtements premium, possibilités illimitées.",
    },
    nav: {
      home: "Accueil",
      products: "Produits",
      about: "À propos",
      contact: "Contact",
    },
    product: {
      addToCart: "Ajouter au panier",
      selectSize: "Choisir la taille",
      selectColor: "Choisir la couleur",
      price: "Prix",
      description: "Description",
      features: "Caractéristiques",
      materials: "Matériaux",
      care: "Instructions d'entretien",
      shipping: "Livraison",
      returns: "Retours",
      outOfStock: "Rupture de stock",
      inStock: "En stock",
      quantity: "Quantité",
      total: "Total",
    },
    cart: {
      title: "Panier",
      empty: "Votre panier est vide",
      checkout: "Commander",
      remove: "Supprimer",
      subtotal: "Sous-total",
      shipping: "Livraison",
      total: "Total",
      continueShopping: "Continuer les achats",
    },
    footer: {
      about: "À propos d'ARTIE",
      aboutText:
        "ARTIE est une marque de streetwear premium qui combine design contemporain et qualité exceptionnelle. Nous créons des vêtements qui parlent au mode de vie urbain moderne.",
      quickLinks: "Liens rapides",
      support: "SUPPORT",
      sizeGuide: "Guide des tailles",
      shippingInfo: "Info livraison",
      returnsExchanges: "Retours & échanges",
      contactUs: "Nous contacter",
      followUs: "Suivez-nous",
      newsletter: "Newsletter",
      newsletterText: "Abonnez-vous pour recevoir les mises à jour sur les nouvelles sorties et les offres exclusives",
      subscribe: "S'abonner",
      emailPlaceholder: "Entrez votre email",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      sustainability: "Durabilité",
      allRightsReserved: "Tous droits réservés.",
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      cancel: "Annuler",
      confirm: "Confirmer",
      save: "Sauvegarder",
      edit: "Modifier",
      delete: "Supprimer",
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      next: "Suivant",
      previous: "Précédent",
    },
    sections: {
      exploreLatest: "EXPLOREZ LES DERNIÈRES",
      nextEssential: "Votre prochaine pièce essentielle commence ici",
      featuredProducts: "Produits en vedette",
      discoverCollection: "Découvrez notre dernière collection streetwear",
    },
  },
  es: {
    hero: {
      title: "ARTIE",
      subtitle: "", // Removed static subtitle
      shopNow: "COMPRAR AHORA",
      readyForAnything: "LISTO PARA TODO",
      readyForAnythingSubtitle: "ARTIE: Ropa unisex premium. Diseñada para rendir, estilizada para vivir.",
      comfortAdapted: "COMODIDAD. ADAPTADA.",
      engineeredText:
        "ARTIE: Diseñada para cada viaje, estilizada para cada momento. Ropa premium, posibilidades ilimitadas.",
    },
    nav: {
      home: "Inicio",
      products: "Productos",
      about: "Acerca de",
      contact: "Contacto",
    },
    product: {
      addToCart: "Añadir al carrito",
      selectSize: "Seleccionar talla",
      selectColor: "Seleccionar color",
      price: "Precio",
      description: "Descripción",
      features: "Características",
      materials: "Materiales",
      care: "Instrucciones de cuidado",
      shipping: "Envío",
      returns: "Devoluciones",
      outOfStock: "Agotado",
      inStock: "En stock",
      quantity: "Cantidad",
      total: "Total",
    },
    cart: {
      title: "Carrito de compras",
      empty: "Tu carrito está vacío",
      checkout: "Finalizar compra",
      remove: "Eliminar",
      subtotal: "Subtotal",
      shipping: "Envío",
      total: "Total",
      continueShopping: "Seguir comprando",
    },
    footer: {
      about: "Acerca de ARTIE",
      aboutText:
        "ARTIE es una marca de streetwear premium que combina diseño contemporáneo con calidad excepcional. Creamos ropa que habla al estilo de vida urbano moderno.",
      quickLinks: "Enlaces rápidos",
      support: "SOPORTE",
      sizeGuide: "Guía de tallas",
      shippingInfo: "Info de envío",
      returnsExchanges: "Devoluciones e intercambios",
      contactUs: "Contáctanos",
      followUs: "Síguenos",
      newsletter: "Boletín",
      newsletterText: "Suscríbete para recibir actualizaciones sobre nuevos lanzamientos y ofertas exclusivas",
      subscribe: "Suscribirse",
      emailPlaceholder: "Ingresa tu email",
      privacy: "Política de privacidad",
      terms: "Términos de servicio",
      sustainability: "Sostenibilidad",
      allRightsReserved: "Todos los derechos reservados.",
    },
    common: {
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      cancel: "Cancelar",
      confirm: "Confirmar",
      save: "Guardar",
      edit: "Editar",
      delete: "Eliminar",
      search: "Buscar",
      filter: "Filtrar",
      sort: "Ordenar",
      next: "Siguiente",
      previous: "Anterior",
    },
    sections: {
      exploreLatest: "EXPLORA LO ÚLTIMO",
      nextEssential: "Tu próxima pieza esencial comienza aquí",
      featuredProducts: "Productos destacados",
      discoverCollection: "Descubre nuestra última colección streetwear",
    },
  },
  it: {
    hero: {
      title: "ARTIE",
      subtitle: "", // Removed static subtitle
      shopNow: "ACQUISTA ORA",
      readyForAnything: "PRONTO A TUTTO",
      readyForAnythingSubtitle:
        "ARTIE: Abbigliamento unisex premium. Progettato per performare, stilizzato per vivere.",
      comfortAdapted: "COMFORT. ADATTATO.",
      engineeredText:
        "ARTIE: Progettato per ogni viaggio, stilizzato per ogni momento. Abbigliamento premium, possibilità illimitate.",
    },
    nav: {
      home: "Home",
      products: "Prodotti",
      about: "Chi siamo",
      contact: "Contatti",
    },
    product: {
      addToCart: "Aggiungi al carrello",
      selectSize: "Seleziona taglia",
      selectColor: "Seleziona colore",
      price: "Prezzo",
      description: "Descrizione",
      features: "Caratteristiche",
      materials: "Materiali",
      care: "Istruzioni per la cura",
      shipping: "Spedizione",
      returns: "Resi",
      outOfStock: "Esaurito",
      inStock: "Disponibile",
      quantity: "Quantità",
      total: "Totale",
    },
    cart: {
      title: "Carrello",
      empty: "Il tuo carrello è vuoto",
      checkout: "Checkout",
      remove: "Rimuovi",
      subtotal: "Subtotale",
      shipping: "Spedizione",
      total: "Totale",
      continueShopping: "Continua lo shopping",
    },
    footer: {
      about: "Chi è ARTIE",
      aboutText:
        "ARTIE è un marchio di streetwear premium che combina design contemporaneo con qualità eccezionale. Creiamo abbigliamento che parla allo stile di vita urbano moderno.",
      quickLinks: "Link rapidi",
      support: "SUPPORTO",
      sizeGuide: "Guida alle taglie",
      shippingInfo: "Info spedizione",
      returnsExchanges: "Resi e cambi",
      contactUs: "Contattaci",
      followUs: "Seguici",
      newsletter: "Newsletter",
      newsletterText: "Iscriviti per ricevere aggiornamenti su nuovi rilasci e offerte esclusive",
      subscribe: "Iscriviti",
      emailPlaceholder: "Inserisci la tua email",
      privacy: "Privacy Policy",
      terms: "Termini di servizio",
      sustainability: "Sostenibilità",
      allRightsReserved: "Tutti i diritti riservati.",
    },
    common: {
      loading: "Caricamento...",
      error: "Errore",
      success: "Successo",
      cancel: "Annulla",
      confirm: "Conferma",
      save: "Salva",
      edit: "Modifica",
      delete: "Elimina",
      search: "Cerca",
      filter: "Filtra",
      sort: "Ordina",
      next: "Avanti",
      previous: "Indietro",
    },
    sections: {
      exploreLatest: "ESPLORA GLI ULTIMI",
      nextEssential: "Il tuo prossimo pezzo essenziale inizia qui",
      featuredProducts: "Prodotti in evidenza",
      discoverCollection: "Scopri la nostra ultima collezione streetwear",
    },
  },
} as const

export type Locale = keyof typeof dictionaries

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en
}
