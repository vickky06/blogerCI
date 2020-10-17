const Page = require('./helper/page');//this is proxy
let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
});


afterEach(async () => {
    await page.close();
});

test("clicking login starts google o auth", async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/https:\/\/accounts\.google\.com\//);

});

test("when signed in, check if logout button exist", async () => {
    await page.login();
    const text =  await page.getContentsOf("a[href='/auth/logout']");
    expect(text).toEqual('Logout');
    //refresh the page so to app rerender and we can see update login
});

test('Check Logo Action', async () => {
    // const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    const text = await page.getContentsOf('a.brand-logo')//   getContentsOfis a  wrapper function
    expect(text).toEqual('Blogster');

});










//LINE 1
// const puppeteer = require('puppeteer');
// const sessionFactory = require('./factories/sessionFactory');
// const userFactory = require('./factories/userFactory');

//LINE 12
   // console.warn("we are in before each");
    // browser = await puppeteer.launch({ headless: false });
    // // console.warn('browser created');
    // page = await browser.newPage();
    // console.warn('page created');


//LINE 49
 // const user = await userFactory();
    // const {session,sig} = sessionFactory(user);                 ///requires mongo object
    // await page.setCookie({name:"session",value:session});   ///sessionString = session
    // await page.setCookie({name:"session.sig",value:sig});
    // await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    // await page.waitFor("a[href='/auth/logout']");



// const browser = await puppeteer.launch({ headless:false});
        // const page = await browser.newPage();
        // await page.goto('http://localhost:3000/', {waitUntil: 'networkidle0'});








    //generate a fake session from userid(abstracted manually)
/** const id = '5f58a40e400ace5a38a48e63';
 * {"_id":{"$oid":"5f58a40e400ace5a38a48e63"},"googleId":"112808982995614571181","displayName":"Vivek Singh","__v":0}
 */

    // const KeyGrip = require('keyGrip');
    // const keys = require('../config/keys');
    // const Buffer = require(`safe-Buffer`).Buffer;
    // const sessionObject = {
    //     passport: {
    //         user: id
    //     }                                                                                ///MOVED TO SESSION FACORY 
    // };
    // const sessionString = Buffer.from(
    //     JSON.stringify(
    //         sessionObject)
    // ).toString('base64');
    // const keyGrip = new KeyGrip([keys.cookieKey]);
    // const sig = keyGrip.sign("session="+sessionString);
    //we have generated signatur and session string
    // console.log(sig, sessionString);