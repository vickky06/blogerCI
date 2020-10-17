const Page = require('./helper/page');//this is proxy
let page;


beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
});

afterEach(async () => {
    await page.close();
});

describe('when logged in', async () => {
    beforeEach(async () => {
        await page.login();
        await page.click('a.btn-floating');
    });

    test('can see blog created from', async () => {
        const label = await page.getContentsOf('form label');
        expect(label).toEqual('Blog Title');

    });
    
    describe('And using invalid Inputs', async () => {
        beforeEach(async () => {
            await page.click('form button');   ///click button submit without writing blog
        });
        test('form shows error message', async () => {
            const titleError = await page.getContentsOf('.title .red-text');
            const contentError = await page.getContentsOf('.content .red-text');
            // expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');

        })
    });

   
}) ////when some pre steps are required