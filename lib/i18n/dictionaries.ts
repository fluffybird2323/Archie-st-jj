export type Locale = "en" | "zh-CN" | "fr" | "de" | "it" | "ja" | "zh" | "ko" | "es"

export interface Dictionary {
  nav: {
    home: string
    about: string
    contact: string
    sustainability: string
    sizeGuide: string
    shipping: string
    returns: string
    privacy: string
    terms: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  product: {
    size: string
    color: string
    addToCart: string
    outOfStock: string
    selectSize: string
    selectColor: string
    description: string
    features: string
    shipping: string
    returns: string
  }
  cart: {
    title: string
    empty: string
    emptyDescription: string
    total: string
    checkout: string
    processing: string
    quantity: string
    remove: string
    clear: string
  }
  success: {
    title: string
    message: string
    orderNumber: string
    estimatedDelivery: string
    businessDays: string
    trackingInfo: string
    continueShopping: string
  }
  trackOrder: {
    title: string
    subtitle: string
    enterOrderId: string
    orderIdPlaceholder: string
    orderIdHelp: string
    trackOrder: string
    searching: string
    orderNotFound: string
    orderDetails: string
    orderId: string
    orderDate: string
    email: string
    items: string
    fulfillment: string
    status: string
    trackingNumber: string
    help: string
  }
  footer: {
    company: string
    support: string
    legal: string
    social: string
    newsletter: string
    newsletterPlaceholder: string
    subscribe: string
    copyright: string
  }
}

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    contact: "Contact",
    sustainability: "Sustainability",
    sizeGuide: "Size Guide",
    shipping: "Shipping",
    returns: "Returns",
    privacy: "Privacy",
    terms: "Terms",
  },
  hero: {
    title: "Premium Hoodies",
    subtitle: "Comfort meets style in our premium collection",
    cta: "Shop Now",
  },
  product: {
    size: "Size",
    color: "Color",
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
    selectSize: "Select a size",
    selectColor: "Select a color",
    description: "Description",
    features: "Features",
    shipping: "Shipping",
    returns: "Returns",
  },
  cart: {
    title: "Shopping Cart",
    empty: "Your cart is empty",
    emptyDescription: "Add some products to get started",
    total: "Total",
    checkout: "Checkout",
    processing: "Processing...",
    quantity: "Quantity",
    remove: "Remove",
    clear: "Clear Cart",
  },
  success: {
    title: "Order Confirmed!",
    message: "Thank you for your purchase. Your order has been confirmed and will be shipped soon.",
    orderNumber: "Order Number",
    estimatedDelivery: "Estimated Delivery",
    businessDays: "5-7 business days",
    trackingInfo: "You will receive tracking information via email once your order ships.",
    continueShopping: "Continue Shopping",
  },
  trackOrder: {
    title: "Track Your Order",
    subtitle: "Enter your order ID to track your order status",
    enterOrderId: "Enter Order ID",
    orderIdPlaceholder: "Order ID (e.g., ARTIE-123456)",
    orderIdHelp: "You can find your order ID in your confirmation email",
    trackOrder: "Track Order",
    searching: "Searching...",
    orderNotFound: "Order Not Found",
    orderDetails: "Order Details",
    orderId: "Order ID",
    orderDate: "Order Date",
    email: "Email",
    items: "Items",
    fulfillment: "Fulfillment",
    status: "Status",
    trackingNumber: "Tracking Number",
    help: "Need help? Contact our support team for assistance.",
  },
  footer: {
    company: "Company",
    support: "Support",
    legal: "Legal",
    social: "Social",
    newsletter: "Newsletter",
    newsletterPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    copyright: "© 2024 Hoodie Store. All rights reserved.",
  },
}

const ja: Dictionary = {
  nav: {
    home: "ホーム",
    about: "会社概要",
    contact: "お問い合わせ",
    sustainability: "持続可能性",
    sizeGuide: "サイズガイド",
    shipping: "配送",
    returns: "返品",
    privacy: "プライバシー",
    terms: "利用規約",
  },
  hero: {
    title: "プレミアムフーディー",
    subtitle: "快適さとスタイルが融合したプレミアムコレクション",
    cta: "今すぐ購入",
  },
  product: {
    size: "サイズ",
    color: "カラー",
    addToCart: "カートに追加",
    outOfStock: "在庫切れ",
    selectSize: "サイズを選択",
    selectColor: "カラーを選択",
    description: "商品説明",
    features: "特徴",
    shipping: "配送",
    returns: "返品",
  },
  cart: {
    title: "ショッピングカート",
    empty: "カートは空です",
    emptyDescription: "商品を追加してください",
    total: "合計",
    checkout: "チェックアウト",
    processing: "処理中...",
    quantity: "数量",
    remove: "削除",
    clear: "カートをクリア",
  },
  success: {
    title: "ご注文確認！",
    message: "ご購入ありがとうございます。ご注文が確認され、まもなく発送されます。",
    orderNumber: "注文番号",
    estimatedDelivery: "配送予定日",
    businessDays: "5-7営業日",
    trackingInfo: "商品が発送されましたら、追跡情報をメールでお送りします。",
    continueShopping: "ショッピングを続ける",
  },
  trackOrder: {
    title: "注文追跡",
    subtitle: "注文IDを入力して注文状況を確認",
    enterOrderId: "注文IDを入力",
    orderIdPlaceholder: "注文ID（例：ARTIE-123456）",
    orderIdHelp: "注文IDは確認メールに記載されています",
    trackOrder: "注文を追跡",
    searching: "検索中...",
    orderNotFound: "注文が見つかりません",
    orderDetails: "注文詳細",
    orderId: "注文ID",
    orderDate: "注文日",
    email: "メール",
    items: "商品",
    fulfillment: "配送",
    status: "ステータス",
    trackingNumber: "追跡番号",
    help: "サポートが必要ですか？サポートチームにお問い合わせください。",
  },
  footer: {
    company: "会社",
    support: "サポート",
    legal: "法的事項",
    social: "ソーシャル",
    newsletter: "ニュースレター",
    newsletterPlaceholder: "メールアドレスを入力",
    subscribe: "購読",
    copyright: "© 2024 フーディーストア. 全著作権所有.",
  },
}

const zh: Dictionary = {
  nav: {
    home: "首页",
    about: "关于我们",
    contact: "联系我们",
    sustainability: "可持续发展",
    sizeGuide: "尺码指南",
    shipping: "配送",
    returns: "退货",
    privacy: "隐私政策",
    terms: "服务条款",
  },
  hero: {
    title: "优质连帽衫",
    subtitle: "舒适与时尚完美融合的优质系列",
    cta: "立即购买",
  },
  product: {
    size: "尺码",
    color: "颜色",
    addToCart: "加入购物车",
    outOfStock: "缺货",
    selectSize: "选择尺码",
    selectColor: "选择颜色",
    description: "商品描述",
    features: "特点",
    shipping: "配送",
    returns: "退货",
  },
  cart: {
    title: "购物车",
    empty: "购物车为空",
    emptyDescription: "添加一些商品开始购物",
    total: "总计",
    checkout: "结账",
    processing: "处理中...",
    quantity: "数量",
    remove: "移除",
    clear: "清空购物车",
  },
  success: {
    title: "订单确认！",
    message: "感谢您的购买。您的订单已确认，将很快发货。",
    orderNumber: "订单号",
    estimatedDelivery: "预计送达",
    businessDays: "5-7个工作日",
    trackingInfo: "订单发货后，您将通过邮件收到跟踪信息。",
    continueShopping: "继续购物",
  },
  trackOrder: {
    title: "订单跟踪",
    subtitle: "输入订单ID查看订单状态",
    enterOrderId: "输入订单ID",
    orderIdPlaceholder: "订单ID（例：ARTIE-123456）",
    orderIdHelp: "您可以在确认邮件中找到订单ID",
    trackOrder: "跟踪订单",
    searching: "搜索中...",
    orderNotFound: "未找到订单",
    orderDetails: "订单详情",
    orderId: "订单ID",
    orderDate: "订单日期",
    email: "邮箱",
    items: "商品",
    fulfillment: "配送",
    status: "状态",
    trackingNumber: "跟踪号",
    help: "需要帮助？请联系我们的支持团队。",
  },
  footer: {
    company: "公司",
    support: "支持",
    legal: "法律",
    social: "社交",
    newsletter: "通讯",
    newsletterPlaceholder: "输入您的邮箱",
    subscribe: "订阅",
    copyright: "© 2024 连帽衫商店. 保留所有权利.",
  },
}

const ko: Dictionary = { ...en } // Korean translations would go here
const es: Dictionary = { ...en } // Spanish translations would go here
const fr: Dictionary = { ...en } // French translations would go here

const dictionaries = {
  en,
  ja,
  zh,
  ko,
  es,
  fr,
  "zh-CN": {
    nav: {
      home: "首页",
      about: "关于",
      contact: "联系",
      sustainability: "可持续发展",
      sizeGuide: "尺寸指南",
      shipping: "配送",
      returns: "退货",
      privacy: "隐私政策",
      terms: "服务条款",
    },
    hero: {
      title: "优质连帽衫",
      subtitle: "舒适与时尚完美融合的优质系列",
      cta: "立即购买",
    },
    product: {
      size: "尺码",
      color: "颜色",
      addToCart: "加入购物车",
      outOfStock: "缺货",
      selectSize: "选择尺码",
      selectColor: "选择颜色",
      description: "商品描述",
      features: "特点",
      shipping: "配送",
      returns: "退货",
    },
    cart: {
      title: "购物车",
      empty: "您的购物车是空的",
      emptyDescription: "添加一些商品开始购物",
      total: "总计",
      checkout: "结账",
      processing: "处理中...",
      quantity: "数量",
      remove: "移除",
      clear: "清空购物车",
    },
    success: {
      title: "订单确认！",
      message: "感谢您的购买。您的订单已确认，将很快发货。",
      orderNumber: "订单号",
      estimatedDelivery: "预计送达",
      businessDays: "5-7个工作日",
      trackingInfo: "订单发货后，您将通过邮件收到跟踪信息。",
      continueShopping: "继续购物",
    },
    trackOrder: {
      title: "跟踪您的订单",
      subtitle: "输入您的订单号以查看购买状态",
      enterOrderId: "输入订单号",
      orderIdPlaceholder: "例如：ORD-123456789",
      orderIdHelp: "您可以在确认邮件中找到订单号",
      trackOrder: "跟踪订单",
      searching: "搜索中...",
      orderNotFound: "未找到订单",
      orderDetails: "订单详情",
      orderId: "订单号",
      orderDate: "订单日期",
      email: "邮箱",
      items: "商品",
      fulfillment: "配送信息",
      status: "状态",
      trackingNumber: "跟踪号",
      help: "需要帮助？联系我们的支持团队获取协助。",
    },
    footer: {
      company: "公司",
      support: "支持",
      legal: "法律",
      social: "社交",
      newsletter: "通讯",
      newsletterPlaceholder: "输入您的邮箱",
      subscribe: "订阅",
      copyright: "© 2024 连帽衫商店. 保留所有权利.",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      about: "Über uns",
      contact: "Kontakt",
      sustainability: "Nachhaltigkeit",
      sizeGuide: "Größentabelle",
      shipping: "Versand",
      returns: "Rücksendungen",
      privacy: "Datenschutz",
      terms: "Bedingungen",
    },
    hero: {
      title: "Premium Hoodies",
      subtitle: "Komfort und Stil in unserer Premium-Sammlung",
      cta: "Jetzt Kaufen",
    },
    product: {
      size: "Größe",
      color: "Farbe",
      addToCart: "In den Warenkorb",
      outOfStock: "Ausverkauft",
      selectSize: "Bitte wählen Sie eine Größe",
      selectColor: "Bitte wählen Sie eine Farbe",
      description: "Beschreibung",
      features: "Merkmale",
      shipping: "Versand",
      returns: "Rücksendungen",
    },
    cart: {
      title: "Warenkorb",
      empty: "Ihr Warenkorb ist leer",
      emptyDescription: "Fügen Sie einige Produkte hinzu, um zu beginnen",
      total: "Gesamt",
      checkout: "Zur Kasse",
      processing: "Wird verarbeitet...",
      quantity: "Menge",
      remove: "Entfernen",
      clear: "Warenkorb leeren",
    },
    success: {
      title: "Bestellung bestätigt!",
      message: "Vielen Dank für Ihren Kauf! Ihre Bestellung wurde bestätigt und wird in Kürze versendet.",
      orderNumber: "Bestellnummer",
      estimatedDelivery: "Voraussichtliche Lieferung",
      businessDays: "5-7 Werktage",
      trackingInfo: "Sie erhalten Tracking-Informationen per E-Mail, sobald Ihre Bestellung versendet wird.",
      continueShopping: "Weiter einkaufen",
    },
    trackOrder: {
      title: "Bestellung verfolgen",
      subtitle: "Geben Sie Ihre Bestellnummer ein, um den Status Ihrer Bestellung zu überprüfen",
      enterOrderId: "Bestellnummer eingeben",
      orderIdPlaceholder: "Bestellnummer (z.B. ARTIE-123456)",
      orderIdHelp: "Sie finden Ihre Bestellnummer in Ihrer Bestätigungs-E-Mail",
      trackOrder: "Bestellung verfolgen",
      searching: "Suche...",
      orderNotFound: "Bestellung nicht gefunden",
      orderDetails: "Bestelldetails",
      orderId: "Bestellnummer",
      orderDate: "Bestelldatum",
      email: "E-Mail",
      items: "Artikel",
      fulfillment: "Versandinformationen",
      status: "Status",
      trackingNumber: "Sendungsnummer",
      help: "Brauchen Sie Hilfe? Kontaktieren Sie unser Support-Team für Unterstützung.",
    },
    footer: {
      company: "Firma",
      support: "Support",
      legal: "Rechtliche Angelegenheiten",
      social: "Sozial",
      newsletter: "Newsletter",
      newsletterPlaceholder: "E-Mail eingeben",
      subscribe: "Abonnieren",
      copyright: "© 2024 Hoodie Store. Alle Rechte vorbehalten.",
    },
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi Siamo",
      contact: "Contatto",
      sustainability: "Sostenibilità",
      sizeGuide: "Guida alle Taglie",
      shipping: "Spedizione",
      returns: "Resi",
      privacy: "Privacy",
      terms: "Termini",
    },
    hero: {
      title: "Premium Hoodies",
      subtitle: "Comfort e stile nella nostra collezione premium",
      cta: "Acquista Ora",
    },
    product: {
      size: "Taglia",
      color: "Colore",
      addToCart: "Aggiungi al Carrello",
      outOfStock: "Esaurito",
      selectSize: "Seleziona una taglia",
      selectColor: "Seleziona un colore",
      description: "Descrizione",
      features: "Caratteristiche",
      shipping: "Spedizione",
      returns: "Resi",
    },
    cart: {
      title: "Carrello",
      empty: "Il tuo carrello è vuoto",
      emptyDescription: "Aggiungi alcuni prodotti per iniziare",
      total: "Totale",
      checkout: "Checkout",
      processing: "In elaborazione...",
      quantity: "Quantità",
      remove: "Rimuovi",
      clear: "Svuota Carrello",
    },
    success: {
      title: "Ordine confermato!",
      message: "Grazie per il tuo acquisto. Il tuo ordine è stato confermato e sarà spedito presto.",
      orderNumber: "Numero Ordine",
      estimatedDelivery: "Consegna Stimata",
      businessDays: "5-7 giorni lavorativi",
      trackingInfo: "Riceverai le informazioni di tracciamento via email una volta che il tuo ordine sarà spedito.",
      continueShopping: "Continua a Shopping",
    },
    trackOrder: {
      title: "Traccia il tuo ordine",
      subtitle: "Inserisci il tuo numero di ordine per controllare lo stato del tuo ordine",
      enterOrderId: "Inserisci Numero Ordine",
      orderIdPlaceholder: "Numero Ordine (es. ARTIE-123456)",
      orderIdHelp: "Puoi trovare il tuo numero di ordine nella tua email di conferma",
      trackOrder: "Traccia Ordine",
      searching: "Ricerca...",
      orderNotFound: "Ordine Non Trovato",
      orderDetails: "Dettagli Ordine",
      orderId: "Numero Ordine",
      orderDate: "Data Ordine",
      email: "Email",
      items: "Articoli",
      fulfillment: "Informazioni di Spedizione",
      status: "Stato",
      trackingNumber: "Numero di Tracciamento",
      help: "Hai bisogno di aiuto? Contatta il nostro team di supporto per assistenza.",
    },
    footer: {
      company: "Compagnia",
      support: "Supporto",
      legal: "Legale",
      social: "Sociale",
      newsletter: "Newsletter",
      newsletterPlaceholder: "Inserisci la tua email",
      subscribe: "Iscriviti",
      copyright: "© 2024 Hoodie Store. Tutti i diritti riservati.",
    },
  },
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en
}

export default dictionaries
