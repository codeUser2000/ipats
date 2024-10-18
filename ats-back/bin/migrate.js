import {
    Admin,
    ApiDoc,
    ApiDocTranslate,
    ApiTitleTranslate,
    AppDownload,
    Clients,
    ContactUs,
    Counter,
    CrmIntegration,
    Home,
    Image,
    HomeTranslate,
    Member,
    MemberTranslate,
    NewService,
    NewServiceTranslate,
    Reviews,
    ServiceChild,
    Sliders,
    SliderTranslate,
    WhoUse,
    Price,
    CrmIntegrationTranslate,
    CrmIntegrator,
    Partners,
    PartnerChild,
    Menu,
    CrmIntegratorTranslate,
    Questions,
    QuestionsTranslate,
    PartnerChildTranslate,
    MenuTranslate,
    Soc,
    PlusesTranslate,
    Pluses, Needs, NeedsTranslate,BlockedIp
} from "../models/index.js";
import PriceTranslate from "../models/PriceTranslate.js";

async function main() {
    for (const Model of [Admin,
        Member,
        MemberTranslate,
        Home,Price,
        HomeTranslate,Pluses,
        WhoUse,PlusesTranslate,
        Needs,NeedsTranslate,
        ServiceChild,BlockedIp,
        ContactUs,PriceTranslate,
        Clients, Reviews,
        NewService, NewServiceTranslate,
        Sliders, SliderTranslate,
        AppDownload, Counter, ApiDoc,
        ApiDocTranslate, ApiTitleTranslate
        , CrmIntegration,
        CrmIntegrationTranslate,
        CrmIntegrator,Image,
        CrmIntegratorTranslate,
        Questions,
        QuestionsTranslate,
        Partners,
        PartnerChild,
        PartnerChildTranslate,
        Menu,
        MenuTranslate,Soc
    ]) {
        console.log(Model)
        await Model.sync({alter: true});
    }

    // for (const department of departmentData) {
    //     await Departments.create({title: department.title, description: department.description, status:1});
    // }
    // const jane = Admin.build({ login:'37444720101', password: 'Lavchi12345',path:'/images/user_employee.jpg'});
    // await jane.save();
    // const employer = Employees.build({ first_name: "First", last_name: "Last",phone: '+37495067515', status:1, user_id:jane.id,department_id:1,notes:'' });
    // await employer.save();
    //
    // const token = Tokens.build({
    //     user_id:jane.id
    // })
    //
    //
    //
    // await token.save()
    // const image = Image.build({ name:'image', user_id:jane.id, path:'/uploads/user_image/user.jpg'  });
    // await image.save()

    process.exit();
}

main();




