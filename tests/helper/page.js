const puppeteer = require('puppeteer');
const userFactory = require('../factories/userFactory');
const sessionFactory = require('../factories/sessionFactory');



class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: true,
            args:['--no-sandbox']
        });
        const page = await browser.newPage();
        const customPage = new CustomPage(page);
        return new Proxy(customPage, {
            get: function (target, property) {
                return customPage[property] || browser[property] || page[property];
            }
        })
    }
    constructor(page) {
        this.page = page
    }

    async login() {
        const user = await userFactory();
        const { session, sig } = sessionFactory(user);                 ///requires mongo object
        // await this.page.setExtraHTTPHeaders({'Cookie': 'SetCurrency=USD; lang=en_EN'})
        await this.page.setCookie({ name: "session", value: session });   ///sessionString = session
        await this.page.setCookie({ name: "session.sig", value: sig });
        await this.page.goto('http://localhost:3000/blogs', { waitUntil: 'networkidle0' });
        await this.page.waitFor("a[href='/auth/logout']");
    }

    async getContentsOf(selector) {
        return this.page.$eval(selector, el => el.innerHTML);
    }

    async get(path) {
        return this.page.evaluate((_path) => {
            return fetch(_path, {
                method: "GET",
                credentials: 'same-origin',
                headers: {
                    'Content-type': "application/json"
                }
            }).then(res => res.json());
        }, path);
    }
    async post(path, body) {
        return this.page.evaluate((_path, _body) => {
            return fetch('/api/blogs', {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Content-type': "application/json"
                }, body: JSON.stringify(_body)
            }).then(res => res.json());
        }, path, body);
    }



     execRequests(actions){
        return Promise.all(
            actions.map(({method,path,data})=>{
                return this[method](path,data);//this[method] will this.get or this.post  which are decalred above.
            })
           
        );
    }

}

module.exports = CustomPage;
// CustomPage.build();