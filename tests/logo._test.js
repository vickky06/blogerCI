const Page = require('./helper/page');//this is proxy
let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
});


afterEach(async () => {
    await page.close();
});

test('Check Logo Action', async () => {
    // const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    const text = await page.getContentsOf('a.brand-logo')//   getContentsOfis a  wrapper function
    expect(text).toEqual('Blogster');

});