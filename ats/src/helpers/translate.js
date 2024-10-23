import home from '../assets/img/icon/home.svg'
import service from '../assets/img/icon/settings.svg'
import developer from '../assets/img/icon/developer.svg'
import partner from '../assets/img/icon/partner.svg'
import about from '../assets/img/icon/AboutUsIcon.svg'
import integration from '../assets/img/icon/integration.svg'
import logo1 from '../assets/img/block/LogoHosted.svg'
import logo2 from '../assets/img/block/LogoLightCloud.svg'
import logo3 from '../assets/img/block/CallCenterLogo.svg'

export const menu = [
    {id: 1, icon: home, link: '/', trans: ['', 'Home', '', '', ''], isParent: 0},
    {
        id: 2,
        icon: service,
        link: '/single_service/self_hosted',
        trans: ['', 'Service', '', '', 'Service'],
        isParent: 1,
        child:
            [
                {
                    id: 1,
                    icon: logo1,
                    link: '/single_service/virtual',
                    trans: ['', 'Self-Hosted PBX', '', '', 'PBX auto-hébergé'],
                    isParent: 0
                },
                {
                    id: 2,
                    icon: logo2,
                    link: '/single_service/local',
                    trans: ['', 'Cloud-based PBX', '', '', 'PBX basé sur le cloud'],
                    isParent: 0
                },
                {
                    id: 3,
                    icon: logo3,
                    link: '/single_service/call-center',
                    trans: ['', 'Call-center build', '', '', 'Création d\'un centre d\'appels'],
                    isParent: 0
                },
            ]
    },
    {id: 4, icon: integration, link: '/crm', trans: ['', 'Integrations', '', '', 'Intégrations'], isParent: 0},
    {id: 3, icon: about, link: '/about', trans: ['', 'About us', '', '', 'À propos de nous'], isParent: 0},
    {id: 5, icon: developer, link: '/api_document', trans: ['', 'Developers kit', '', '', 'API'], isParent: 0},
    {
        id: 7,
        icon: partner,
        link: window.innerWidth > 786 ? '#register' : '/register',
        trans: ['', 'Sign in', '', '', 'Se connecter'],
        isParent: 0
    },

]
export const menuPrice = {
    team: ['', 'Our members', 'Наша команда', 'Մեր թիմը'],
    offer: ['', 'Offer', 'Оферта', 'Առաջարկ'],
    money: ['', '֏', '֏', '֏'],
    title: ['', 'Calculate your contribution/month', 'Рассчитайте свой вклад/месяц', 'Հաշվարկել Ձեր ներդրումը/ամսական'],
    all: ['', '15000', '15000', '15000'],
    service: ['', 'Service name', 'Имя услуги', 'Ծառայության անվանումը'],
    sprice: ['', 'Service price (days)', 'Стоимость услуги (день)', 'Ծառայության արժեքը (օր)'],
    count: ['', 'Count', 'Подсчет', 'Քանակ'],
    sum: ['', 'Amount', 'Сумма', 'Գումար'],
    allSum: ['', 'Your monthly contribution will be', 'Ваш ежемесячный взнос составит', 'Ձեր ամսական ներդրումը կկազմի'],
    calc: ['', 'Calculator', 'Калькулятор', 'Հաշվիչ'],
    test: ['', 'Try free', 'Попробовать бесплатно', 'Փորձեք անվճար'],
    sell: ['', 'Order service', 'Заказать услугу', 'Պատվիրեք ծառայություն'],
}
export const homeD = {
    solution: ['', 'Use the features of the system for free 15 days, |check it out', '', '', 'Utilisez les fonctionnalités du système gratuitement pendant 15 jours, |découvrez-le'],
    operator: {
        title: ['', 'Install your own self-hosted PBX', '', '', 'Installez votre propre PBX auto-hébergé'],
        desc: ['',
            ' A local PBX (Private Branch Exchange) is a private telephone network used within an organization. It allows internal communication and external communication through different communication channels, such as traditional phone lines, VoIP, or other methods.',
            '', '',
            "Un PBX local (Private Branch Exchange) est un réseau téléphonique privé utilisé au sein d'une organisation. Il permet la communication interne et externe via différents canaux de communication, tels que les lignes téléphoniques traditionnelles, la VoIP ou d'autres méthodes."
        ]
    },
    login: ['', 'Visit you personal area', '', '', 'Visitez votre espace personnel'],
    register: ['', 'Create your own Virtual PBX', '', '', 'Créez votre propre PBX virtuel'],
    download: ['', 'See more', '', '', 'Voir plus'],
    download_wrapper: ['', 'Download mobile applications', '', '', 'Télécharger des applications mobiles'],
    download_desc: ['', 'For more convenience and control, download client applications for your mobile device', '', '', 'Pour plus de commodité et de contrôle, téléchargez des applications clientes pour votre appareil mobile'],
    api_desc: ['', 'A simple description of the methods for integrating our system into your CRM', '', '', 'Une description simple des méthodes d\'intégration de notre système dans votre CRM'],
    api_title: ['', 'API for developers', '', '', 'API pour les développeurs'],
    example: ['', 'For example', '', '', 'Par exemple'],
    crm: ['', 'Customer relationship management', '', '', 'Gestion de la relation client'],
    api_item: ['', 'You can get the key through Your personal page personal page. Available only to ATS partner and users.',
        '',
        '',
        'Vous pouvez obtenir la clé via votre page personnelle. Disponible uniquement pour les partenaires et utilisateurs ATS.'],
    activeCall: ['', 'You can get the key through Your personal page personal page. Available only to ATS partner and users.',
        '',
        '',
        'Vous pouvez obtenir la clé via votre page personnelle. Disponible uniquement pour les partenaires et utilisateurs ATS.'
    ],

}

export const buttons = {
    top: ['', 'Get free access', '', '', 'Obtenez un accès gratuit'],
    sign: ['', 'Sign in', '', '', 'Se connecter'],
    reg: ['', 'Submit an application', '', '', 'Soumettre une candidature'],
    request: ['', 'Request integration', '', '', 'Demande d\'intégration'],
    forget: ['', 'Forget password?', '', '', 'Mot de passe oublié?'],
    email: ['', 'Your phone number', '', '', 'Votre numéro de téléphone'],
    pass: ['', 'Enter your password', '', '', 'Entrez votre mot de passe'],
    desc: ['', "You don't have a personal account yet.", '', '', 'Vous n\'avez pas encore de compte personnel'],
    res: ['', "Reset password", '', '', 'Réinitialiser le mot de passe'],

}

export const contactUs = {
    title: ['', 'Contact us', '', '', 'Contactez-nous'],
    desc: ['', 'We’re here to help and answer any questions you might have. We look forward to hearing from you!',
        '',
        '',
        'Nous sommes là pour vous aider et répondre à toutes vos questions. Nous avons hâte de vous entendre !'
    ],
    btn: ['', 'Submit', '', '', 'Soumettre'],
}

export const log_reg = {
    login: ['', 'Sign in to your personal area', '', '', 'Se connecter'],
    reset: ['', 'Reset your password', '', '', 'Réinitialiser votre mot de passe'],
    sign: ['', 'Use the 15-day free version', '', '', 'Utilisez la version gratuite de 15 jours'],
    request: ['', 'If you already created a personal account?', '', '', 'Si vous avez déjà créé un compte personnel ?'],
    desc: ['', 'We will use your phone number and mail only for contact purposes',
        '',
        '',
        'Nous utiliserons votre numéro de téléphone et votre courrier uniquement à des fins de contact'
    ],
    descRes: ['', 'We will use your phone number only for contact purposes',
        'Мы будем использовать ваш номер телефона только для связи',
        'Ձեր հեռախոսահամարը կօգտագործվի բացառապես կոնտակտային նպատակներով:'],
    logRet: ['', 'Return to sign in page?', 'Вернуться на страницу входа?', 'Դեպի Մուտքի էջ'],
    regT: ['', 'Confirmation of registration',
        'Подтверждение регистрации',
        'Գրանցման հաստատում'],
    check: ['', 'Enter password', 'Введите пароль', 'Մուտքագրեք գաղտնաբառը'],
    regD: ['', 'Please wait, you will receive a code via SMS.',
        'Пожалуйста, подождите, вы получите код по SMS',
        'Խնդրում ենք սպասել, դուք կստանաք կոդ SMS հաղորդագրության միջոցով:'],

}

export const input = {
    telegram: ['', 'If you have telegram you will receive code for confirmation.If not, wait for SMS',
        '',
        '',
        'Si vous avez un télégramme, vous recevrez un code de confirmation. Sinon, attendez le SMS'],
    name: ['', 'Your full name', 'Имя фамилия', 'Անուն Ազգանուն','Votre nom complet'],
    position: ['', 'Your position', 'Ваша позиция', 'Անուն Ազգանուն','Votre position'],
    company: ['', 'Your company name', 'Имя компании', 'Կազմակերպության անվանում','Le nom de votre entreprise'],
    email: ['', 'Your email', 'Электронная почта', 'էլ.փոստ','Votre email'],
    phone: ['', 'Your contact phone', 'Номер телефона', 'Կոնտակտային հեռախոսահամար','Votre téléphone de contact'],
    message: ['', 'Write a message to clarify your integration details', '','','Écrivez un message pour clarifier les détails de votre intégration'],
}

export const footer = {
    copyright: ['',
        'The company "IT-SPARK" was founded in 2010 in Yerevan.Our first project was the development of Call Center software.',
        'Компания «ИТ-СПАРК» была основана в 2010 году в Ереване.Нашим первым проектом была разработка программного обеспечения для колл-центра. ',
        '«IT-SPARK» ընկերությունը հիմնադրվել է 2010 թվականին Երևանում: Մեր առաջին նախագիծը Call Center ծրագրային ապահովման մշակումն էր:'],
    learn: ['', 'Learn More', 'Узнать больше', 'Իմացեք ավելին','Apprendre encore plus'],
    check: ['', 'About us', 'О нас', 'Մեր մասին','À propos de nous'],
    partner: ['', 'Become a partner, send email to connect', '','','Devenez partenaire, envoyez un email pour vous connecter'],
    crm: ['', 'Integrate you CRM system to collect information', '','','Intégrez votre système CRM pour collecter des informations'],
    reg: ['', 'Register', 'Зарегистрироваться', 'Գրանցվեք համակարգում','Registre'],
    install: ['', 'Install Local PBX version', '','','Inscrivez-vous'],
    api: ['', 'Use API to integrate our system', '','','Installez la version PBX locale'],

}

export const install = {
    postmanL: ['', 'Download postman collection', '','','Téléchargez la collection Postman'],
    swaggerL: ['', 'View our swagger collection', '','','Découvrez notre collection Swagger'],
    title: ['', 'Refer to documentation', '','','Se référer à la documentation'],
    desc: ['', 'Check out documentation to install and use self-hosted version of PBX software',
        'Ознакомьтесь с документацией по установке и использованию локальной версии программного обеспечения АТС.',
        'Ծանոթացեք վերը նշված դոկումենտացիայի հետ, որպեսզի տեղադրել Լոկալ ԱՀԿ-ն Ձեր համակարգում',
        'Consultez la documentation pour installer et utiliser la version auto-hébergée du logiciel PBX'
    ],

    postman: ['', 'You can Free Download postman collection by clicking the link below',
        'Вы можете бесплатно скачать коллекцию postman, перейдя по ссылке ниже.',
        'Դուք կարող եք Անվճար ներբեռնել postman հավաքածուն՝ սեղմելով ստորև նշված հղումը',
        'Vous pouvez télécharger gratuitement la collection Postman en cliquant sur le lien ci-dessous'
    ],
    swagger: ['', 'Feel free to check out our swagger collection by clicking the link bellow',
        'Ознакомитесь с нашей коллекцией Swagger, перейдя по ссылке ниже.',
        'Ознакомитесь с нашей коллекцией Swagger, перейдя по ссылке ниже.',
        'N\'hésitez pas à consulter notre collection Swagger en cliquant sur le lien ci-dessous']
}

export const lang = {
    en: 1,
    ru: 2,
    hy: 3,
    fr: 4,
}
