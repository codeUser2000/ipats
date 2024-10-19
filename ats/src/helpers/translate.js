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
    {id:1,icon:home,link:'/',trans:['','Home','Главная',''],isParent:0},
    {id:2,icon:service,link:'/single_service/self_hosted',trans:['','Service','Услуга','Ծառայություններ'],isParent:1,child:
            [
                {id:1,icon:logo1,link:'/single_service/virtual',trans:['','Self-Hosted PBX','Автономная АТС','Վիրտուալ PBX'],isParent:0},
                {id:2,icon:logo2,link:'/single_service/local',trans:['','Cloud-based PBX','Облачная АТС','Լոկալ PBX'],isParent:0},
                {id:3,icon:logo3,link:'/single_service/call-center',trans:['','Call-center build','Построение колл-центра','Զանգերի կենտրոն'],isParent:0},
            ]},
    {id:4,icon:integration,link:'/crm',trans:['','Integrations','Интеграции','Ինտեգրումներ'],isParent:0},
    {id:3,icon:about,link:'/about',trans:['','About us','О нас','Մեր մասին'],isParent:0},
    {id:5,icon:developer,link:'/api_document',trans:['','Developers kit','API','API'],isParent:0},
    {id:7,icon:partner,link:window.innerWidth > 786?'#register':'/register',trans:['','Sign in','Войти','Մուտք գործել'],isParent:0},

]
export const menuPrice = {
    team:['','Our members', 'Наша команда', 'Մեր թիմը'],
    offer:['','Offer', 'Оферта', 'Առաջարկ'],
    money:['','֏', '֏', '֏'],
    title:['','Calculate your contribution/month', 'Рассчитайте свой вклад/месяц', 'Հաշվարկել Ձեր ներդրումը/ամսական'],
    all:['','15000', '15000', '15000'],
    service:['','Service name','Имя услуги','Ծառայության անվանումը'],
    sprice:['','Service price (days)','Стоимость услуги (день)','Ծառայության արժեքը (օր)'],
    count:['','Count','Подсчет','Քանակ'],
    sum:['','Amount','Сумма','Գումար'],
    allSum:['','Your monthly contribution will be','Ваш ежемесячный взнос составит','Ձեր ամսական ներդրումը կկազմի'],
    calc:['','Calculator','Калькулятор','Հաշվիչ'],
    test:['','Try free','Попробовать бесплатно','Փորձեք անվճար'],
    sell:['','Order service','Заказать услугу','Պատվիրեք ծառայություն'],
}
export const homeD = {
    solution:['','Use the features of the system for free 15 days, |check it out','Используйте возможности системы бесплатно в течение 15 дней, |проверьте сейчас','Օգտվել անվճար  համակարգի հնարավորություններից 15 օր շարունակ |փորձել անվճար'],
    operator:{
        title:['','Install your own self-hosted PBX','Установите автономную АТС','Տեղադրեք ձեր լոկալ PBX-ը'],
        desc:['',' A local PBX (Private Branch Exchange) is a private telephone network used within an organization. It allows internal communication and external communication through different communication channels, such as traditional phone lines, VoIP, or other methods.',
            'Локальная АТС (Private Branch Exchange) — это частная телефонная сеть, используемая в организации. Она обеспечивает внутреннюю и внешнюю связь через различные каналы связи, такие как традиционные телефонные линии, VoIP или другие методы.',
            'Լոկալ PBX-ը (Private Branch Exchange) մասնավոր հեռախոսային ցանց է, որն օգտագործվում է կազմակերպության ներսում: Այն թույլ է տալիս ներքին և արտաքին հաղորդակցություն տարբեր ուղիներով, ինչպիսիք են հեռախոսագծերը, VoIP կամ այլ մեթոդները:']
    },
    login:['','Visit you personal area','Посетите личный кабинет','Մուտք գործել անձնական հաշիվ'],
    register:['','Create your own Virtual PBX','Создайте свою собственную виртуальную АТС','Ստեղծեք ձեր սեփական վիրտուալ PBX-ը'],
    download:['','See more','Узнать больше','Տեսնել ավելին'],
    download_wrapper:['','Download mobile applications','Загрузите мобильные приложения','Ներբեռնեք բջջային հավելվածներ'],
    download_desc:['','For more convenience and control, download client applications for your mobile device','Для большего удобства и контроля скачайте клиентские приложения на мобильное устройство.','Ավելի հարմարության և վերահսկման համար ներբեռնեք հաճախորդի հավելվածները ձեր բջջային սարքի համար'],
    api_desc:['','A simple description of the methods for integrating our system into your CRM','Простое описание способов интеграции нашей системы в вашу CRM','Մեր համակարգը ձեր CRM-ում ինտեգրելու մեթոդների պարզ նկարագրություն'],
    api_title:['','API for developers','API для разработчиков','API ծրագրավորողների համար'],
    example:['','For example','Например','Օրինակ'],
    crm:['','Customer relationship management','Управление взаимоотношениями с клиентами','Հաճախորդների հետ փոխհարաբերությունների կառավարում'],
    api_item:['','You can get the key through Your personal page personal page. Available only to ATS partner and users.',
        'Вы можете получить ключ через Вашу персональную страницу. Доступно только пользователям и партнеров ATS.',
        'Բանալին կարող եք ստանալ Ձեր անձնական էջից: Հասանելի է միայն ATS գործընկերի և օգտվողների համար:'],
    activeCall:['','You can get the key through Your personal page personal page. Available only to ATS partner and users.',
        'Вы можете получить ключ через Вашу персональную страницу. Доступно только пользователям и партнеров ATS.',
        'Բանալին կարող եք ստանալ Ձեր անձնական էջից: Հասանելի է միայն ATS գործընկերի և օգտվողների համար:'],

}

export const buttons = {
    top:['','Get free access','Бесплатный доступ','Օգտվել անվճար'],
    sign:['','Sign in','Войти','Մուտք գործել'],
    reg:['','Register for free','Беспл․ регистрация','Գրանցվեք անվճար'],
    request:['','Request integration','Запросить интеграцию','Ինտեգրման հայտ'],
    forget:['','Forget password?','Забыли пароль?','Մոռացե՞լ եք գաղտնաբառը'],
    email:['','Your phone number','Ваш номер телефона','Հեռախոսահամար'],
    pass:['','Enter your password','Введите ваш пароль','Մուտքագրեք Ձեր գաղտնաբառը'],
    desc:['',"You don't have a personal account yet.",'У вас еще нет личного кабинета?','Դեռևս չունե՞ք անձնական հաշիվ'],
    res:['',"Reset password",'Сбросить пароль','Փոխել գաղտնաբառը'],

}

export const contactUs = {
    title:['','Contact us','Свяжитесь с нами','Կապվեք մեզ հետ'],
    desc:['','We’re here to help and answer any questions you might have. We look forward to hearing from you!',
        'Мы здесь, чтобы помочь и ответить на любые Ваши вопросы.',
        'Մենք այստեղ ենք՝ օգնելու և պատասխանելու Ձեր ցանկացած հարցի։'],
    btn:['','Submit','Отправить','Կապ հաստատել'],


}
export const log_reg = {
    login:['','Sign in to your personal area','Войти','Մուտք գործել'],
    reset:['','Reset your password','Сбросить пароль','Փոխել գաղտնաբառը'],
    sign:['','Use the 15-day free version','Воспользуйтесь 15-дневной бесплатной версией','Օգտվել 15օրյա անվճար տարբերակից'],
    request:['','If you already created a personal account?','Если вы уже создали личный кабинет?','Եթե ունեք անձնական հաշիվ'],
    desc:['','We will use your phone number and mail only for contact purposes',
        'Мы будем использовать ваш номер телефона и мейл только для связи',
        'Ձեր հեռախոսահամարը կօգտագործվի բացառապես կոնտակտային նպատակներով:'],
    descRes:['','We will use your phone number only for contact purposes',
        'Мы будем использовать ваш номер телефона только для связи',
        'Ձեր հեռախոսահամարը կօգտագործվի բացառապես կոնտակտային նպատակներով:'],
    logRet:['','Return to sign in page?','Вернуться на страницу входа?','Դեպի Մուտքի էջ'],
    regT:['','Confirmation of registration',
        'Подтверждение регистрации',
        'Գրանցման հաստատում'],
    check:['','Enter password','Введите пароль','Մուտքագրեք գաղտնաբառը'],
    regD:['','Please wait, you will receive a code via SMS.',
        'Пожалуйста, подождите, вы получите код по SMS',
        'Խնդրում ենք սպասել, դուք կստանաք կոդ SMS հաղորդագրության միջոցով:'],

}

export const input = {
    telegram:['','If you have telegram you will receive code for confirmation.If not, wait for SMS',
        'Если у вас есть Telegram, вы получите код для подтверждения.Если нет, ждите СМС',
        'Եթե ունեք Telegram, ապա կստանաք կոդ՝ հաստատման համար, Եթե ոչ` սպասեք SMS հաղորդագրության'],
    name:['','Your full name','Имя фамилия','Անուն Ազգանուն'],
    position:['','Your position','Ваша позиция','Անուն Ազգանուն'],
    company:['','Your company name','Имя компании','Կազմակերպության անվանում'],
    email:['','Your email','Электронная почта','էլ.փոստ'],
    phone:['','Your contact phone','Номер телефона','Կոնտակտային հեռախոսահամար'],
    message:['','Write a message to clarify your integration details','Напишите сообщение для уточнения деталей интеграции','Գրեք հաղորդագրություն՝ ձեր ինտեգրման մանրամասները պարզաբանելու համար'],
}

export const footer = {
    copyright:['',
        'The company "IT-SPARK" was founded in 2010 in Yerevan.Our first project was the development of Call Center software.',
        'Компания «ИТ-СПАРК» была основана в 2010 году в Ереване.Нашим первым проектом была разработка программного обеспечения для колл-центра. ',
        '«IT-SPARK» ընկերությունը հիմնադրվել է 2010 թվականին Երևանում: Մեր առաջին նախագիծը Call Center ծրագրային ապահովման մշակումն էր:'],
    learn:['','Learn More','Узнать больше','Իմացեք ավելին'],
    check:['','About us','О нас','Մեր մասին'],
    partner:['','Become a partner, send email to connect','Стать партнером, отправить электронное письмо','Դարձեք գործընկեր'],
    crm:['','Integrate you CRM system to collect information','Интегрируйте свою CRM-систему','Ինտեգրեք Ձեր CRM համակարգը'],
    reg:['','Register','Зарегистрироваться','Գրանցվեք համակարգում'],
    install:['','Install Local PBX version','Установить версию локальной АТС','Տեղադրեք Լոկալ PBX տարբերակը'],
    api:['','Use API to integrate our system','Используйте API для интеграции с нашей системой','Օգտագործեք API՝ մեր համակարգի հետ ինտեգրվելու համար'],

}

export const install = {
    postmanL:['','Download postman collection','Бесплатно скачать коллекцию postman','Անվճար ներբեռնել postman հավաքածուն'],
    swaggerL:['','View our swagger collection','Посмотрите нашу коллекцию swagger','Դիտեք մեր swagger հավաքածուն'],
    title:['','Refer to documentation','Обратитесь к документации','Ուսումնասիրեք դոկումենտացիան'],
    desc:['','Check out documentation to install and use self-hosted version of PBX software',
        'Ознакомьтесь с документацией по установке и использованию локальной версии программного обеспечения АТС.',
        'Ծանոթացեք վերը նշված դոկումենտացիայի հետ, որպեսզի տեղադրել Լոկալ ԱՀԿ-ն Ձեր համակարգում'],

    postman:['','You can Free Download postman collection by clicking the link bellow',
        'Вы можете бесплатно скачать коллекцию postman, перейдя по ссылке ниже.',
        'Դուք կարող եք Անվճար ներբեռնել postman հավաքածուն՝ սեղմելով ստորև նշված հղումը'],
    swagger:['','Feel free to check out our swagger collection by clicking the link bellow',
        'Ознакомитесь с нашей коллекцией Swagger, перейдя по ссылке ниже.',
        'Ծանոթացեք մեր Swagger հավաքածուին՝ սեղմելով ստորև նշված հղումը']
}

export const lang = {
    en:1,
    ru:2,
    hy:3,
}
